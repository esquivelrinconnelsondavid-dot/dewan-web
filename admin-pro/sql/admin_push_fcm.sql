-- ============================================================
-- DEWAN Admin Pro — Push FCM en background
-- Proyecto Supabase: wfpdtjmmrhhfuxayvpzu (Riobamba)
-- Aplicar en: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1) Tabla de dispositivos del admin (tokens FCM)
CREATE TABLE IF NOT EXISTS admin_dispositivos (
  token       TEXT PRIMARY KEY,
  admin_user  TEXT,
  plataforma  TEXT DEFAULT 'android',
  creado_en   TIMESTAMPTZ DEFAULT now(),
  ultima_vez  TIMESTAMPTZ DEFAULT now()
);

-- RLS ON, sin políticas para anon: la app escribe vía RPC SECURITY DEFINER,
-- y n8n lee con la service_role key (bypassa RLS).
ALTER TABLE admin_dispositivos ENABLE ROW LEVEL SECURITY;

-- 2) Log de pushes enviados (evita re-notificar cada 30s)
CREATE TABLE IF NOT EXISTS admin_push_log (
  pedido_id   BIGINT NOT NULL,
  evento      TEXT   NOT NULL,           -- 'nuevo' | 'rechazo' | 'colgado'
  enviado_en  TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (pedido_id, evento)
);

-- 3) RPC: registrar/actualizar token desde la app (rol anon)
CREATE OR REPLACE FUNCTION registrar_dispositivo_admin(
  p_token      TEXT,
  p_admin      TEXT DEFAULT NULL,
  p_plataforma TEXT DEFAULT 'android'
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO admin_dispositivos (token, admin_user, plataforma, ultima_vez)
  VALUES (p_token, p_admin, COALESCE(p_plataforma, 'android'), now())
  ON CONFLICT (token) DO UPDATE
    SET admin_user = COALESCE(EXCLUDED.admin_user, admin_dispositivos.admin_user),
        plataforma = COALESCE(EXCLUDED.plataforma, admin_dispositivos.plataforma),
        ultima_vez = now();
END;
$$;

GRANT EXECUTE ON FUNCTION registrar_dispositivo_admin(TEXT, TEXT, TEXT) TO anon, authenticated;

-- 4) RPC: devuelve los pushes pendientes (eventos no notificados aún)
--    La llama el workflow n8n cada 30-60s.
CREATE OR REPLACE FUNCTION admin_pushes_pendientes(p_min_no_acepta INT DEFAULT 5)
RETURNS TABLE (pedido_id BIGINT, evento TEXT, titulo TEXT, cuerpo TEXT)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  WITH base AS (
    SELECT p.id, p.estado_pedido, p.restaurante, p.cliente_nombre,
           p.restaurante_aceptado, p.restaurante_rechazado, p.restaurante_motivo_rechazo,
           p.fecha_creacion
    FROM pedidos_delivery p
    WHERE p.fecha_creacion >= now() - interval '6 hours'
  ),
  eventos AS (
    -- nuevo: pedido entró y está pendiente del restaurante
    SELECT id AS pedido_id, 'nuevo'::text AS evento,
           'Nuevo pedido'::text AS titulo,
           ('#' || id || ' ' || COALESCE(restaurante, cliente_nombre, ''))::text AS cuerpo
    FROM base
    WHERE estado_pedido = 'pendiente_restaurante'

    UNION ALL
    -- rechazo: el restaurante rechazó
    SELECT id, 'rechazo',
           'Restaurante RECHAZÓ #' || id,
           COALESCE(restaurante, '') || ': ' || COALESCE(restaurante_motivo_rechazo, 'sin motivo')
    FROM base
    WHERE restaurante_rechazado = true
      AND estado_pedido NOT IN ('cancelado', 'entregado')

    UNION ALL
    -- colgado: >N min sin aceptar ni rechazar
    SELECT id, 'colgado',
           'Restaurante no responde',
           '#' || id || ' ' || COALESCE(restaurante, '') ||
           ' (' || floor(extract(epoch from (now() - fecha_creacion)) / 60)::int || ' min)'
    FROM base
    WHERE estado_pedido = 'pendiente_restaurante'
      AND restaurante_aceptado IS NOT TRUE
      AND restaurante_rechazado IS NOT TRUE
      AND fecha_creacion <= now() - (p_min_no_acepta || ' minutes')::interval
  )
  SELECT e.pedido_id, e.evento, e.titulo, e.cuerpo
  FROM eventos e
  LEFT JOIN admin_push_log l
    ON l.pedido_id = e.pedido_id AND l.evento = e.evento
  WHERE l.pedido_id IS NULL
  ORDER BY e.pedido_id;
$$;

GRANT EXECUTE ON FUNCTION admin_pushes_pendientes(INT) TO anon, authenticated, service_role;

-- 5) RPC: marcar un evento como ya notificado
CREATE OR REPLACE FUNCTION admin_marcar_push(p_pedido_id BIGINT, p_evento TEXT)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  INSERT INTO admin_push_log (pedido_id, evento)
  VALUES (p_pedido_id, p_evento)
  ON CONFLICT DO NOTHING;
$$;

GRANT EXECUTE ON FUNCTION admin_marcar_push(BIGINT, TEXT) TO anon, authenticated, service_role;

-- Limpieza opcional del log viejo (correr de vez en cuando, o cron):
-- DELETE FROM admin_push_log WHERE enviado_en < now() - interval '7 days';
