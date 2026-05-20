-- Migración: RPCs para el Panel Admin DEWAN
-- Ejecutar en Supabase SQL Editor.
--
-- Esta migración crea las funciones RPC SECURITY DEFINER que usa el panel
-- admin interno (`/admin/`) para gestionar restaurantes y sus códigos de
-- acceso. Las funciones validan un PIN admin antes de ejecutar cualquier
-- operación, evitando exponer las tablas con RLS default-deny.
--
-- Funciones creadas:
--   A) listar_restaurantes_admin(pin, busqueda)   → tabla de restaurantes
--   B) crear_restaurante_admin(pin, nombre, …)    → UUID del nuevo
--   C) asignar_codigo_admin(pin, restaurante, …)  → código asignado
--   D) toggle_restaurante_activo(pin, restaurante)→ nuevo valor activo
--   E) metricas_globales_admin(pin)               → KPIs del día
--
-- IDEMPOTENTE: usa CREATE OR REPLACE FUNCTION (no DROP) para no romper
-- si la firma cambia entre runs. Re-ejecutar es seguro.


-- =========================================================================
-- Constante: PIN admin
-- =========================================================================
-- IMPORTANTE: este PIN se hardcodea en cada función. En producción se debe
-- reemplazar por algo robusto (ej. variable de configuración, tabla cifrada
-- o, idealmente, un sistema de auth real con roles). Por ahora es un valor
-- compartido entre el equipo interno de DEWAN.
--
-- Valor actual: 'admin1234'  ← CAMBIAR EN PRODUCCIÓN.


-- =========================================================================
-- A. RPC: listar_restaurantes_admin
-- =========================================================================
-- Devuelve la lista completa (hasta 200) de restaurantes con su código de
-- acceso (LEFT JOIN porque pueden no tener uno todavía) y un conteo de
-- dispositivos online (ultimo_visto en los últimos 2 minutos).
--
-- Si el PIN es inválido, retorna 0 filas (no lanza error, para que el
-- cliente lo trate como "no autorizado").
CREATE OR REPLACE FUNCTION listar_restaurantes_admin(
  p_admin_pin TEXT,
  p_busqueda TEXT DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  nombre TEXT,
  categoria TEXT,
  telefono TEXT,
  activo BOOLEAN,
  codigo_acceso TEXT,
  timeout_segundos INTEGER,
  dispositivos_online INTEGER,
  ultimo_visto TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_admin_pin IS NULL OR p_admin_pin <> 'admin1234' THEN
    -- PIN inválido: no devolvemos nada.
    RETURN;
  END IF;

  RETURN QUERY
    SELECT
      r.id,
      r.nombre,
      r.categoria,
      r.telefono,
      r.activo,
      ra.codigo_acceso,
      ra.timeout_segundos,
      COALESCE((
        SELECT COUNT(*)::INTEGER
          FROM restaurante_dispositivos d
         WHERE d.restaurante_id = r.id
           AND d.ultimo_visto > NOW() - INTERVAL '2 minutes'
      ), 0) AS dispositivos_online,
      (
        SELECT MAX(d.ultimo_visto)
          FROM restaurante_dispositivos d
         WHERE d.restaurante_id = r.id
      ) AS ultimo_visto
      FROM restaurantes r
      LEFT JOIN restaurante_acceso ra ON ra.restaurante_id = r.id
     WHERE p_busqueda IS NULL
        OR r.nombre ILIKE '%' || p_busqueda || '%'
     ORDER BY r.nombre ASC
     LIMIT 200;
END;
$$;


-- =========================================================================
-- B. RPC: crear_restaurante_admin
-- =========================================================================
-- Inserta un restaurante nuevo. Retorna el UUID generado o NULL si el PIN
-- es inválido.
CREATE OR REPLACE FUNCTION crear_restaurante_admin(
  p_admin_pin TEXT,
  p_nombre TEXT,
  p_telefono TEXT DEFAULT NULL,
  p_categoria TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id UUID;
BEGIN
  IF p_admin_pin IS NULL OR p_admin_pin <> 'admin1234' THEN
    RETURN NULL;
  END IF;

  IF p_nombre IS NULL OR length(trim(p_nombre)) = 0 THEN
    RETURN NULL;
  END IF;

  INSERT INTO restaurantes (nombre, telefono, categoria, activo)
  VALUES (trim(p_nombre), p_telefono, p_categoria, true)
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;


-- =========================================================================
-- C. RPC: asignar_codigo_admin
-- =========================================================================
-- Asigna un código de acceso a un restaurante. Si `p_codigo` es NULL,
-- genera uno aleatorio de 6 dígitos (con retry contra colisiones, hasta
-- 5 veces). Si viene dado, valida formato exacto ^[0-9]{6}$.
--
-- Hace UPSERT en restaurante_acceso (un restaurante = un código). Si ya
-- existe, sobrescribe el código.
--
-- Retorna el código asignado, o NULL si el PIN es inválido / formato malo
-- / colisión persistente.
CREATE OR REPLACE FUNCTION asignar_codigo_admin(
  p_admin_pin TEXT,
  p_restaurante_id UUID,
  p_codigo TEXT DEFAULT NULL
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_codigo TEXT;
  v_intento INTEGER := 0;
  v_existe BOOLEAN;
BEGIN
  IF p_admin_pin IS NULL OR p_admin_pin <> 'admin1234' THEN
    RETURN NULL;
  END IF;

  IF p_restaurante_id IS NULL THEN
    RETURN NULL;
  END IF;

  IF p_codigo IS NOT NULL THEN
    -- Modo manual: validar formato.
    IF p_codigo !~ '^[0-9]{6}$' THEN
      RETURN NULL;
    END IF;
    v_codigo := p_codigo;
  ELSE
    -- Modo auto: generar con retry contra colisiones.
    LOOP
      v_intento := v_intento + 1;
      v_codigo := LPAD((random() * 1000000)::INTEGER::TEXT, 6, '0');

      SELECT EXISTS (
        SELECT 1 FROM restaurante_acceso
         WHERE codigo_acceso = v_codigo
           AND restaurante_id <> p_restaurante_id
      ) INTO v_existe;

      EXIT WHEN NOT v_existe;
      IF v_intento >= 5 THEN
        RETURN NULL;
      END IF;
    END LOOP;
  END IF;

  -- UPSERT: si el restaurante ya tiene fila, actualiza; si no, inserta.
  INSERT INTO restaurante_acceso (restaurante_id, codigo_acceso)
  VALUES (p_restaurante_id, v_codigo)
  ON CONFLICT (restaurante_id)
  DO UPDATE SET codigo_acceso = EXCLUDED.codigo_acceso;

  RETURN v_codigo;
END;
$$;


-- =========================================================================
-- D. RPC: toggle_restaurante_activo
-- =========================================================================
-- Invierte el flag `activo` del restaurante. Retorna el nuevo valor o NULL
-- si el PIN es inválido o el restaurante no existe.
CREATE OR REPLACE FUNCTION toggle_restaurante_activo(
  p_admin_pin TEXT,
  p_restaurante_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_nuevo BOOLEAN;
BEGIN
  IF p_admin_pin IS NULL OR p_admin_pin <> 'admin1234' THEN
    RETURN NULL;
  END IF;

  UPDATE restaurantes
     SET activo = NOT COALESCE(activo, false)
   WHERE id = p_restaurante_id
   RETURNING activo INTO v_nuevo;

  RETURN v_nuevo;
END;
$$;


-- =========================================================================
-- E. RPC: metricas_globales_admin
-- =========================================================================
-- KPIs del día para el panel admin:
--   - pedidos_hoy: total de pedidos de comida creados hoy.
--   - pedidos_escalados_hoy: cuántos llegaron a la operadora humana.
--   - ingresos_brutos_hoy: suma de monto_total (NULL → 0).
--   - restaurantes_activos: cantidad con activo = true.
--   - restaurantes_online: cantidad con al menos un dispositivo cuyo
--     ultimo_visto está en los últimos 2 minutos.
--
-- "Hoy" se calcula con fecha_creacion >= CURRENT_DATE.
CREATE OR REPLACE FUNCTION metricas_globales_admin(p_admin_pin TEXT)
RETURNS TABLE (
  pedidos_hoy INTEGER,
  pedidos_escalados_hoy INTEGER,
  ingresos_brutos_hoy NUMERIC,
  restaurantes_activos INTEGER,
  restaurantes_online INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_admin_pin IS NULL OR p_admin_pin <> 'admin1234' THEN
    RETURN;
  END IF;

  RETURN QUERY
    SELECT
      COALESCE((
        SELECT COUNT(*)::INTEGER
          FROM pedidos_delivery
         WHERE intencion = 'pedido_comida'
           AND fecha_creacion >= CURRENT_DATE
      ), 0) AS pedidos_hoy,
      COALESCE((
        SELECT COUNT(*)::INTEGER
          FROM pedidos_delivery
         WHERE intencion = 'pedido_comida'
           AND fecha_creacion >= CURRENT_DATE
           AND COALESCE(escalado_operadora, false) = true
      ), 0) AS pedidos_escalados_hoy,
      COALESCE((
        SELECT SUM(monto_total)
          FROM pedidos_delivery
         WHERE intencion = 'pedido_comida'
           AND fecha_creacion >= CURRENT_DATE
      ), 0)::NUMERIC AS ingresos_brutos_hoy,
      COALESCE((
        SELECT COUNT(*)::INTEGER
          FROM restaurantes
         WHERE activo = true
      ), 0) AS restaurantes_activos,
      COALESCE((
        SELECT COUNT(DISTINCT d.restaurante_id)::INTEGER
          FROM restaurante_dispositivos d
         WHERE d.ultimo_visto > NOW() - INTERVAL '2 minutes'
      ), 0) AS restaurantes_online;
END;
$$;


-- =========================================================================
-- F. Permisos de ejecución
-- =========================================================================
-- Todas las funciones admin son invocables por anon/authenticated. El
-- gating real lo hace el PIN dentro de cada función.
GRANT EXECUTE ON FUNCTION listar_restaurantes_admin(TEXT, TEXT)
  TO anon, authenticated;

GRANT EXECUTE ON FUNCTION crear_restaurante_admin(TEXT, TEXT, TEXT, TEXT)
  TO anon, authenticated;

GRANT EXECUTE ON FUNCTION asignar_codigo_admin(TEXT, UUID, TEXT)
  TO anon, authenticated;

GRANT EXECUTE ON FUNCTION toggle_restaurante_activo(TEXT, UUID)
  TO anon, authenticated;

GRANT EXECUTE ON FUNCTION metricas_globales_admin(TEXT)
  TO anon, authenticated;
