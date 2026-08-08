import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

function calcularDistancia(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Caché a nivel de módulo. Antes CADA tarjeta lanzaba su consulta: abrir el
// filtro "Todos" con 100 pedidos disparaba 100 consultas de golpe y la app se
// quedaba trabada varios segundos. Ahora la consulta se hace una vez por local
// (o por sucursal) y las demás tarjetas la reusan.
const cachePorLocal = new Map();   // restaurante -> sucursales[]
const cachePorId = new Map();      // sucursal_id -> sucursal
const enVuelo = new Map();         // clave -> Promise

function unaVez(clave, fn) {
  if (enVuelo.has(clave)) return enVuelo.get(clave);
  const p = fn().finally(() => enVuelo.delete(clave));
  enVuelo.set(clave, p);
  return p;
}

const TERMINALES = new Set(['entregado', 'cancelado']);

export function useSucursales(pedido) {
  const [sucursales, setSucursales] = useState([]);
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(null);

  // Los pedidos ya terminados no necesitan elegir sucursal: no se consulta nada
  // (el retiro que se muestra sale de lo que quedó guardado en el pedido).
  const cerrado = TERMINALES.has(pedido?.estado_pedido);

  useEffect(() => {
    if (!pedido?.restaurante || cerrado) {
      setSucursales([]);
      setSucursalSeleccionada(null);
      return undefined;
    }

    let vivo = true;

    // Si el pedido ya tiene sucursal_id, traerla y usarla
    if (pedido.sucursal_id) {
      const cacheada = cachePorId.get(pedido.sucursal_id);
      if (cacheada) {
        setSucursales([cacheada]);
        setSucursalSeleccionada(cacheada);
        return undefined;
      }
      unaVez(`id:${pedido.sucursal_id}`, () =>
        supabase
          .from('restaurantes_sucursales')
          .select('*')
          .eq('id', pedido.sucursal_id)
          .single()
          .then(({ data }) => {
            if (data) cachePorId.set(pedido.sucursal_id, data);
            return data;
          })
      ).then((data) => {
        if (!vivo || !data) return;
        setSucursales([data]);
        setSucursalSeleccionada(data);
      }).catch(() => {});
      return () => { vivo = false; };
    }

    const fetchSucursales = async () => {
      const data = await unaVez(`local:${pedido.restaurante}`, async () => {
        if (cachePorLocal.has(pedido.restaurante)) return cachePorLocal.get(pedido.restaurante);
        const { data: filas } = await supabase
          .from('restaurantes_sucursales')
          .select('*')
          .eq('restaurante_nombre', pedido.restaurante)
          .eq('activo', true);
        // Copia por tarjeta: abajo se ordena por distancia AL CLIENTE de este
        // pedido, así que no se puede compartir el mismo array mutado.
        cachePorLocal.set(pedido.restaurante, filas || []);
        return filas || [];
      }).then((filas) => (filas || []).map((s) => ({ ...s })));

      if (!vivo) return;

      if (!data || data.length === 0) {
        setSucursales([]);
        setSucursalSeleccionada(null);
        return;
      }

      if (data.length === 1) {
        setSucursales([]);
        setSucursalSeleccionada(data[0]);
        return;
      }

      const latCliente = parseFloat(pedido.ubicacion_lat);
      const lngCliente = parseFloat(pedido.ubicacion_lng);
      if (latCliente && lngCliente) {
        data.forEach((s) => {
          const latSuc = parseFloat(s.latitud);
          const lngSuc = parseFloat(s.longitud);
          if (latSuc && lngSuc) {
            s._distancia = calcularDistancia(latCliente, lngCliente, latSuc, lngSuc);
          }
        });
        data.sort((a, b) => (a._distancia || 999) - (b._distancia || 999));
      }

      setSucursales(data);
      if (data[0]?._distancia != null) {
        setSucursalSeleccionada(data[0]);
      }
    };

    fetchSucursales().catch(() => {});
    return () => { vivo = false; };
  }, [pedido?.restaurante, pedido?.sucursal_id, cerrado]);

  const requiereSucursal = sucursales.length > 1 && !sucursalSeleccionada;

  return { sucursales, sucursalSeleccionada, setSucursalSeleccionada, requiereSucursal };
}
