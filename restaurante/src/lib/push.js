import { Capacitor } from '@capacitor/core';
import { supabase } from './supabase';

// El token FCM es del DISPOSITIVO y NO cambia al cerrar sesión. Por eso, cuando
// en el mismo teléfono se cambia de restaurante (logout → login en otro local),
// hay que RE-ASOCIAR ese token al nuevo restaurante. Antes un guard `inicializado`
// solo registraba una vez y dejaba el token apuntando al primer restaurante,
// así que los pedidos del segundo local nunca hacían match en fcm_pendientes().
let listenersListos = false; // los listeners/registro nativo se montan una sola vez
let tokenActual = null;      // último token FCM conocido del dispositivo
let restauranteRef = null;   // restaurante ACTUAL (se actualiza en cada llamada)

// Guarda/actualiza en Supabase la asociación token → restaurante actual.
async function guardarAsociacion() {
  if (!tokenActual || !restauranteRef) return;
  try {
    const { error } = await supabase.rpc('registrar_push_restaurante', {
      p_token: tokenActual,
      p_restaurante_id: restauranteRef?.restaurante_id || null,
      p_restaurante_nombre: restauranteRef?.nombre || null,
      p_plataforma: 'android',
    });
    if (error) console.warn('[push] guardando token', error);
    else console.log('[push] token asociado a', restauranteRef?.nombre);
  } catch (e) { console.warn('[push] guardando token', e); }
}

// Registra el dispositivo para push FCM. Solo corre en Android nativo.
// Cuando la app está cerrada/en background, Android muestra la notificación
// del payload `notification` automáticamente (no necesita JS).
// Cuando está en foreground, el realtime de usePedidosRestaurante ya alarma → acá
// dejamos el listener en silencio para no duplicar el aviso.
// Se puede llamar varias veces: la primera monta los listeners; las siguientes
// (cambio de restaurante) solo re-asocian el token al nuevo restaurante.
export async function registrarPushRestaurante(restaurante) {
  if (!Capacitor.isNativePlatform()) return;
  if (restaurante) restauranteRef = restaurante;

  // Si ya está todo montado y solo cambió el restaurante: re-asociar y salir.
  if (listenersListos) {
    await guardarAsociacion();
    return;
  }
  listenersListos = true;

  let PushNotifications;
  try {
    ({ PushNotifications } = await import('@capacitor/push-notifications'));
  } catch (e) {
    console.warn('[push] plugin no disponible', e);
    listenersListos = false;
    return;
  }

  try {
    let { receive } = await PushNotifications.checkPermissions();
    if (receive === 'prompt' || receive === 'prompt-with-rationale') {
      ({ receive } = await PushNotifications.requestPermissions());
    }
    if (receive !== 'granted') {
      console.warn('[push] permiso no concedido:', receive);
      listenersListos = false; // permitir reintento en una sesión posterior
      return;
    }

    // Canal de alta prioridad para que suene/vibre con la app cerrada (Android 8+).
    try {
      await PushNotifications.createChannel({
        id: 'pedidos',
        name: 'Pedidos',
        description: 'Avisos de pedidos para el restaurante',
        importance: 5, // MAX
        sound: 'default',
        vibration: true,
        visibility: 1,
        lights: true,
      });
    } catch (e) { console.warn('[push] createChannel', e); }

    // Token FCM → guardar/actualizar en Supabase. Usamos restauranteRef (no una
    // copia capturada) para que siempre asocie al restaurante ACTUAL.
    PushNotifications.addListener('registration', async (token) => {
      tokenActual = token.value;
      await guardarAsociacion();
    });

    PushNotifications.addListener('registrationError', (err) => {
      console.warn('[push] registrationError', err);
    });

    // En foreground el realtime ya maneja la alarma; acá solo log para no duplicar.
    PushNotifications.addListener('pushNotificationReceived', (n) => {
      console.log('[push] recibido en foreground', n?.data?.evento, n?.data?.pedido_id);
    });

    // Al TOCAR la notificacion (cold start / background) el WebSocket de realtime
    // suele estar muerto. Avisamos para forzar reconexion (y, si estuvo oculto
    // mucho, usePedidosRestaurante recarga el WebView para evitar pantalla negra).
    PushNotifications.addListener('pushNotificationActionPerformed', () => {
      try { window.dispatchEvent(new CustomEvent('dewan:abrir-desde-push')); } catch (e) {}
    });

    await PushNotifications.register();
  } catch (e) {
    console.warn('[push] init', e);
    listenersListos = false;
  }
}

// Al cerrar sesión: olvidar el restaurante actual para no re-asociar por error.
// (El próximo login vuelve a asociar el token al restaurante correcto.)
export function olvidarRestaurantePush() {
  restauranteRef = null;
}
