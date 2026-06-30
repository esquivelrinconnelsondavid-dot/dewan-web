import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Capacitor } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';
import { supabase, MIN_NO_ACEPTA } from '../lib/supabase';
import { HOY_ISO, minutosDesde } from '../lib/time';
import { notify, startAlertLoop, stopAlertLoop, stopAllAlerts, resumeAudio } from '../lib/notifications';

const TERMINALES = new Set(['entregado', 'cancelado']);

// Merge en vez de reemplazo total al recargar (poll). Evita dos problemas:
// 1) Que un snapshot viejo del poll pise un pedido recién actualizado por realtime.
// 2) Que un pedido en curso creado antes de medianoche EC "desaparezca" al cruzar las 00:00
//    (HOY_ISO salta de día). Los activos que ya no caen en la ventana se conservan;
//    los terminales (entregado/cancelado) ausentes del snapshot sí se sueltan.
function fusionarPedidos(prev, frescos) {
  const idsFrescos = new Set(frescos.map((p) => p.id));
  const extra = prev.filter((p) => !idsFrescos.has(p.id) && !TERMINALES.has(p.estado_pedido));
  const todos = [...frescos, ...extra];
  todos.sort((a, b) => new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime());
  return todos;
}

export function useAdminData() {
  const [pedidos, setPedidos] = useState([]);
  const [restaurantes, setRestaurantes] = useState([]);
  const [motorizados, setMotorizados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [tick, setTick] = useState(0);

  const seenIds = useRef(new Set());
  const notifiedNoAcepta = useRef(new Set());

  // <2min = "fresco": disparar alarma aunque venga de cargar() inicial.
  const MS_FRESCO_ADMIN = 2 * 60 * 1000;
  const esPendienteFresco = (p) => {
    if (!p || p.estado_pedido !== 'pendiente_restaurante') return false;
    if (p.restaurante_aceptado || p.restaurante_rechazado) return false;
    const creado = p.fecha_creacion ? new Date(p.fecha_creacion).getTime() : 0;
    return creado > 0 && Date.now() - creado < MS_FRESCO_ADMIN;
  };

  const cargarPedidos = useCallback(async () => {
    // Margen de 12h hacia atrás: un pedido en curso creado antes de medianoche EC no debe
    // desaparecer al cambiar de día. El filtro "Activos" de la UI igual oculta lo viejo entregado.
    const desde = new Date(new Date(HOY_ISO()).getTime() - 12 * 60 * 60 * 1000).toISOString();
    const { data, error } = await supabase
      .from('pedidos_delivery')
      .select('*')
      .gte('fecha_creacion', desde)
      .order('fecha_creacion', { ascending: false });
    if (error) { console.error('[pedidos]', error); return false; }
    const frescos = data || [];
    setPedidos((prev) => fusionarPedidos(prev, frescos));
    frescos.forEach((p) => {
      if (seenIds.current.has(p.id)) return;
      seenIds.current.add(p.id);
      if (esPendienteFresco(p)) {
        const tipo = p.intencion === 'pedido_comida' ? 'Comida'
          : p.intencion === 'encomienda' ? 'Encomienda'
          : p.intencion === 'compras' ? 'Compras' : 'Pedido';
        notify(`Nuevo pedido (${tipo})`, `#${p.id} ${p.restaurante || p.cliente_nombre || ''}`);
        startAlertLoop(p.id, 'nuevo');
      }
    });
    return true;
  }, []);

  const cargarRestaurantes = useCallback(async () => {
    const { data, error } = await supabase
      .from('restaurantes')
      .select('*')
      .order('nombre');
    if (error) { console.error('[restaurantes]', error); return; }
    setRestaurantes(data || []);
  }, []);

  const cargarMotorizados = useCallback(async () => {
    const { data, error } = await supabase
      .from('motorizados')
      .select('*')
      .order('nombre');
    if (error) { console.error('[motorizados]', error); return; }
    setMotorizados(data || []);
  }, []);

  const cargarTodo = useCallback(async () => {
    await Promise.all([cargarPedidos(), cargarRestaurantes(), cargarMotorizados()]);
    setCargando(false);
  }, [cargarPedidos, cargarRestaurantes, cargarMotorizados]);

  useEffect(() => { cargarTodo(); }, [cargarTodo]);

  // Realtime + reconexión robusta + watchdog + resume nativo.
  // El operador alterna con WhatsApp a cada rato: el WebView se suspende y el socket de
  // Supabase queda ZOMBI (readyState 'open' pero TCP muerto). Recrear solo el canal NO
  // reabre ese socket half-open (isConnected() devuelve true y subscribe no reconecta) →
  // hay que tumbar el transporte completo (realtime.disconnect) y reconstruir TODO.
  useEffect(() => {
    let cancelado = false;
    let reconectando = false;
    let intentos = 0;
    let ultimaRecon = 0;
    const chRef = { p: null, r: null, m: null };
    const ultimoDato = { t: Date.now() };
    const marcar = () => { ultimoDato.t = Date.now(); };

    const soltarCanales = () => {
      [chRef.p, chRef.r, chRef.m].forEach((c) => { if (c) { try { supabase.removeChannel(c); } catch {} } });
      chRef.p = chRef.r = chRef.m = null;
    };

    const crearCanales = () => {
      if (cancelado) return;
      chRef.p = supabase
        .channel(`admin-pro-pedidos-${Date.now()}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'pedidos_delivery' }, (payload) => {
          marcar();
          const { eventType, new: nuevo, old: viejo } = payload;
          if (eventType === 'INSERT') {
            setPedidos((prev) => prev.find((p) => p.id === nuevo.id) ? prev : [nuevo, ...prev]);
            if (!seenIds.current.has(nuevo.id)) {
              seenIds.current.add(nuevo.id);
              const tipo = nuevo.intencion === 'pedido_comida' ? 'Comida'
                : nuevo.intencion === 'encomienda' ? 'Encomienda'
                : nuevo.intencion === 'compras' ? 'Compras' : 'Pedido';
              notify(`Nuevo pedido (${tipo})`, `#${nuevo.id} ${nuevo.restaurante || nuevo.cliente_nombre || ''}`);
              startAlertLoop(nuevo.id, 'nuevo');
            }
          }
          if (eventType === 'UPDATE') {
            // upsert: si el pedido no está en el estado (snapshot lo soltó), agregarlo en vez de perderlo.
            setPedidos((prev) => prev.find((p) => p.id === nuevo.id)
              ? prev.map((p) => (p.id === nuevo.id ? { ...p, ...nuevo } : p))
              : [nuevo, ...prev]);
            if (nuevo.restaurante_rechazado && !viejo?.restaurante_rechazado) {
              notify(`Restaurante RECHAZÓ #${nuevo.id}`, `${nuevo.restaurante || ''}: ${nuevo.restaurante_motivo_rechazo || 'sin motivo'}`);
              startAlertLoop(nuevo.id, 'rechazo');
            }
            // Si el pedido avanzó → parar alarma EN TODOS los dispositivos.
            // Incluye cuando la OPERADORA atiende: los silenciosos/cliente_paga NUNCA "aceptan"
            // por la app, solo se les pone el tiempo (operadora_atendido=true / estado 'preparando').
            // Sin esto, la alarma seguía sonando tras confirmar el tiempo en locales silenciosos.
            if (
              (nuevo.restaurante_aceptado && !viejo?.restaurante_aceptado) ||
              (nuevo.operadora_atendido && !viejo?.operadora_atendido) ||
              (viejo?.estado_pedido === 'pendiente_restaurante' && nuevo.estado_pedido && nuevo.estado_pedido !== 'pendiente_restaurante') ||
              nuevo.estado_pedido === 'entregado' ||
              nuevo.estado_pedido === 'cancelado' ||
              (nuevo.motorizado_id && !viejo?.motorizado_id)
            ) {
              stopAlertLoop(nuevo.id);
            }
          }
          if (eventType === 'DELETE') {
            setPedidos((prev) => prev.filter((p) => p.id !== viejo.id));
            stopAlertLoop(viejo.id);
          }
        })
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            intentos = 0;
            marcar();
            cargarPedidos();
          } else if (status === 'CHANNEL_ERROR' || status === 'CLOSED' || status === 'TIMED_OUT') {
            if (cancelado) return;
            intentos += 1;
            const delay = Math.min(30000, 1000 * Math.pow(2, intentos));
            console.warn('[admin-pro REALTIME]', status, '→ reconectar en', delay, 'ms');
            setTimeout(() => reconectar(`status:${status}`), delay);
          }
        });

      chRef.r = supabase
        .channel(`admin-pro-rest-${Date.now()}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'restaurantes' }, () => { marcar(); cargarRestaurantes(); })
        .subscribe();

      chRef.m = supabase
        .channel(`admin-pro-motos-${Date.now()}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'motorizados' }, () => { marcar(); cargarMotorizados(); })
        .subscribe();
    };

    // Reconexión TOTAL: tumba el socket zombi y reconstruye los 3 canales + recarga todo.
    // Es lo único que cura un half-open (recrear el canal por sí solo no reabre el WebSocket).
    const reconectar = (motivo) => {
      if (cancelado || reconectando) return;
      const ahora = Date.now();
      if (ahora - ultimaRecon < 1200) return; // debounce: resume dispara varios eventos juntos
      ultimaRecon = ahora;
      reconectando = true;
      console.warn('[admin-pro] reconectar:', motivo);
      soltarCanales();
      try { supabase.realtime.disconnect(); } catch {}
      intentos = 0;
      setTimeout(() => {
        reconectando = false;
        if (cancelado) return;
        crearCanales();  // subscribe() reabrirá el socket porque isConnected() ahora es false
        cargarTodo();    // recarga pedidos + restaurantes + motos
        resumeAudio();   // el AudioContext pudo quedar 'suspended' en background
        marcar();
      }, 350);
    };

    crearCanales();

    // Volver a primer plano: evento DOM (web) + evento NATIVO de Capacitor (fiable en Android,
    // donde visibilitychange a veces no dispara al volver de WhatsApp).
    const onVisible = () => { if (document.visibilityState === 'visible') reconectar('visibilitychange'); };
    document.addEventListener('visibilitychange', onVisible);
    const onRefrescar = () => reconectar('push');
    window.addEventListener('dewan:refrescar', onRefrescar);

    const appHandles = [];
    if (Capacitor.isNativePlatform()) {
      CapApp.addListener('appStateChange', ({ isActive }) => { if (isActive) reconectar('appStateChange'); })
        .then((h) => appHandles.push(h)).catch(() => {});
      CapApp.addListener('resume', () => reconectar('resume'))
        .then((h) => appHandles.push(h)).catch(() => {});
    }

    // Poll de respaldo + watchdog. Pedidos cada 10s; restaurantes/motos cada 30s (no se quedan
    // congelados si el realtime muere). Si el socket no está vivo o llevamos >45s sin datos
    // (incluido el poll), forzar reconexión total. setTick recalcula "no acepta".
    let ciclos = 0;
    const poll = setInterval(async () => {
      if (cancelado) return;
      ciclos += 1;
      setTick((t) => t + 1);
      const ok = await cargarPedidos();
      if (ok) marcar();
      if (ciclos % 3 === 0) { cargarRestaurantes(); cargarMotorizados(); }
      if (document.visibilityState === 'visible') {
        const rt = supabase.realtime;
        const vivo = rt && typeof rt.isConnected === 'function' ? rt.isConnected() : true;
        if (!vivo || Date.now() - ultimoDato.t > 45000) reconectar('watchdog');
      }
    }, 10000);

    return () => {
      cancelado = true;
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('dewan:refrescar', onRefrescar);
      appHandles.forEach((h) => { try { h.remove(); } catch {} });
      clearInterval(poll);
      soltarCanales();
      try { supabase.realtime.disconnect(); } catch {}
      stopAllAlerts();
    };
  }, [cargarPedidos, cargarRestaurantes, cargarMotorizados, cargarTodo]);

  // Locales gestionados por operadora (silencioso/cliente_paga): tienen restaurante_id
  // pero NUNCA aceptan por app → no deben disparar la alarma "no responde" ni contar como colgados.
  const gestionOperadora = useMemo(() => {
    const s = new Set();
    restaurantes.forEach((r) => {
      if (r.tipo_acuerdo === 'silencioso' || r.tipo_acuerdo === 'cliente_paga') s.add(r.id);
    });
    return s;
  }, [restaurantes]);

  useEffect(() => {
    pedidos.forEach((p) => {
      if (
        p.intencion === 'pedido_comida' &&
        p.estado_pedido === 'pendiente_restaurante' && // si ya avanzó (preparando/confirmado) NO es "no responde"
        !p.operadora_atendido &&                        // si la operadora ya le puso tiempo, deja de sonar
        p.restaurante_id &&
        !gestionOperadora.has(p.restaurante_id) &&
        !p.restaurante_aceptado &&
        !p.restaurante_rechazado &&
        minutosDesde(p.fecha_creacion) >= MIN_NO_ACEPTA &&
        !notifiedNoAcepta.current.has(p.id)
      ) {
        notifiedNoAcepta.current.add(p.id);
        notify(`Restaurante no responde`, `#${p.id} ${p.restaurante || ''} (${minutosDesde(p.fecha_creacion)}m)`);
        startAlertLoop(p.id, 'no_acepta');
      }
      // Si el pedido YA fue atendido (operadora puso tiempo / avanzó), apagar cualquier alarma viva.
      if (p.operadora_atendido || (p.estado_pedido && p.estado_pedido !== 'pendiente_restaurante')) {
        stopAlertLoop(p.id);
      }
    });
  }, [pedidos, tick, gestionOperadora]);

  const ahora = Date.now();
  const colgados = pedidos.filter((p) =>
    p.intencion === 'pedido_comida' &&
    p.estado_pedido === 'pendiente_restaurante' &&
    !p.operadora_atendido &&
    p.restaurante_id &&
    !gestionOperadora.has(p.restaurante_id) &&
    !p.restaurante_aceptado &&
    !p.restaurante_rechazado &&
    minutosDesde(p.fecha_creacion) >= MIN_NO_ACEPTA
  );
  const rechazados = pedidos.filter(
    (p) => p.restaurante_rechazado && p.estado_pedido !== 'cancelado' && p.estado_pedido !== 'entregado'
  );

  return {
    pedidos, restaurantes, motorizados, cargando,
    colgados, rechazados,
    recargar: cargarTodo,
    _tick: tick,
  };
}
