import { Capacitor } from '@capacitor/core';
import { supabase } from './supabase';

let inicializado = false;

// Registra el dispositivo para push FCM. Solo corre en Android nativo.
// Cuando la app está cerrada/en background, Android muestra la notificación
// del payload `notification` automáticamente (no necesita JS).
// Cuando está en foreground, el realtime de useAdminData ya notifica → acá
// dejamos el listener en silencio para no duplicar la alarma.
export async function registrarPush(adminUser) {
  if (!Capacitor.isNativePlatform()) return;
  if (inicializado) return;
  inicializado = true;

  let PushNotifications;
  try {
    ({ PushNotifications } = await import('@capacitor/push-notifications'));
  } catch (e) {
    console.warn('[push] plugin no disponible', e);
    inicializado = false;
    return;
  }

  try {
    let { receive } = await PushNotifications.checkPermissions();
    if (receive === 'prompt' || receive === 'prompt-with-rationale') {
      ({ receive } = await PushNotifications.requestPermissions());
    }
    if (receive !== 'granted') {
      console.warn('[push] permiso no concedido:', receive);
      inicializado = false; // permitir reintento en una sesión posterior
      return;
    }

    // Canal de alta prioridad para que suene/vibre con la app cerrada (Android 8+).
    try {
      await PushNotifications.createChannel({
        id: 'pedidos',
        name: 'Pedidos',
        description: 'Avisos de pedidos para el admin',
        importance: 5, // MAX
        sound: 'default',
        vibration: true,
        visibility: 1,
        lights: true,
      });
    } catch (e) { console.warn('[push] createChannel', e); }

    // Token FCM → guardar en Supabase vía RPC
    PushNotifications.addListener('registration', async (token) => {
      try {
        const { error } = await supabase.rpc('registrar_dispositivo_admin', {
          p_token: token.value,
          p_admin: adminUser || null,
          p_plataforma: 'android',
        });
        if (error) console.warn('[push] guardando token', error);
        else console.log('[push] token registrado');
      } catch (e) { console.warn('[push] guardando token', e); }
    });

    PushNotifications.addListener('registrationError', (err) => {
      console.warn('[push] registrationError', err);
    });

    // En foreground el realtime ya maneja la alarma; acá solo log para no duplicar.
    PushNotifications.addListener('pushNotificationReceived', (n) => {
      console.log('[push] recibido en foreground', n?.data?.evento, n?.data?.pedido_id);
    });

    // El usuario TOCO la notificacion y abrio la app: forzar refresco de datos.
    PushNotifications.addListener('pushNotificationActionPerformed', (a) => {
      console.log('[push] abierto desde notif', a?.notification?.data?.pedido_id);
      try { window.dispatchEvent(new Event('dewan:refrescar')); } catch {}
    });

    await PushNotifications.register();
  } catch (e) {
    console.warn('[push] init', e);
    inicializado = false;
  }
}
