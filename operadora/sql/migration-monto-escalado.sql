-- Migración: Montos/Comisiones + Escalado Automático por Timeout
-- Ejecutar en Supabase SQL Editor.
--
-- Esta migración agrega:
--
--   A) Columnas de monto y comisión en `pedidos_delivery` para poder
--      registrar lo que paga el cliente, la comisión que se queda DEWAN
--      y de qué bolsillo sale esa comisión (restaurante o cliente).
--
--   B) Función `escalar_pedidos_timeout()` que recorre los pedidos
--      pendientes de aceptación por el restaurante y los escala a la
--      operadora humana cuando se vence el `timeout_segundos` configurado
--      en `restaurante_acceso` (default 90s). Adicionalmente, escala
--      inmediatamente si el restaurante no tiene NINGÚN dispositivo
--      conectado en los últimos 2 minutos (offline).
--
--   C) Job de pg_cron que invoca la función cada minuto (mínima frecuencia
--      estable en Supabase: cron estándar es minuto, no soporta segundos
--      en plan free de forma confiable).
--
--   D) Función auxiliar `forzar_escalado_pedido(p_pedido_id)` para que el
--      panel admin (o un operador humano) pueda forzar manualmente el
--      escalado de un pedido específico, útil también para testing.
--
-- IDEMPOTENTE: se puede correr varias veces sin romper. Usa IF NOT EXISTS,
-- CREATE OR REPLACE FUNCTION, DO $$ ... EXCEPTION para constraints y
-- desprograma el job antes de re-programarlo.
--
-- NOTA SOBRE LA SEMÁNTICA DE COMISIÓN:
--   neto_restaurante = monto_total - monto_comision
--   `comision_la_paga` ('restaurante' | 'cliente') SOLO indica de cuál
--   bolsillo sale el 10% — impacta en cómo se presenta en reportes,
--   no en el cálculo del neto. El cálculo siempre es el mismo.


-- =========================================================================
-- A. Columnas de monto y comisión en `pedidos_delivery`
-- =========================================================================
-- Aditivas: no rompen pedidos viejos (quedan en NULL).
ALTER TABLE pedidos_delivery
  ADD COLUMN IF NOT EXISTS monto_total NUMERIC(10,2),
  ADD COLUMN IF NOT EXISTS monto_comision NUMERIC(10,2),
  ADD COLUMN IF NOT EXISTS comision_la_paga TEXT;

-- CHECK constraint sobre `comision_la_paga`. Envuelto en bloque DO para
-- ser idempotente: si ya existe, no falla.
DO $$
BEGIN
  ALTER TABLE pedidos_delivery
    ADD CONSTRAINT pedidos_delivery_comision_la_paga_check
    CHECK (comision_la_paga IS NULL OR comision_la_paga IN ('restaurante', 'cliente'));
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
  WHEN OTHERS THEN
    -- En algunas versiones de Postgres, ADD CONSTRAINT duplicado lanza
    -- otro SQLSTATE. Lo silenciamos para mantener idempotencia.
    NULL;
END $$;

COMMENT ON COLUMN pedidos_delivery.monto_total IS
  'Total que paga el cliente por el pedido (incluye o no la comisión según comision_la_paga).';
COMMENT ON COLUMN pedidos_delivery.monto_comision IS
  'Comisión que retiene DEWAN. neto_restaurante = monto_total - monto_comision.';
COMMENT ON COLUMN pedidos_delivery.comision_la_paga IS
  'De qué bolsillo sale la comisión: ''restaurante'' o ''cliente''. Solo afecta reportes, no el cálculo del neto.';


-- =========================================================================
-- B. Función `escalar_pedidos_timeout()`
-- =========================================================================
-- Recorre todos los pedidos `pendiente_restaurante` que aún no fueron
-- aceptados, rechazados ni escalados. Para cada uno calcula la edad en
-- segundos desde `fecha_creacion` y la compara contra el `timeout_segundos`
-- del restaurante asociado:
--
--   * Si `restaurante_id` existe → JOIN con restaurante_acceso por
--     restaurante_id. Si no hay registro o el campo es NULL, default 90.
--
--   * Si NO hay `restaurante_id` (pedidos legacy con solo el nombre TEXT)
--     → resolver el restaurante por nombre (case-insensitive) y de ahí
--     ir a restaurante_acceso. Si nada matchea, default 90.
--
-- Además, escala inmediatamente (sin esperar el timeout) si el restaurante
-- tiene `restaurante_id` y NINGÚN dispositivo con ultimo_visto en los
-- últimos 2 minutos → restaurante offline, no tiene sentido esperar.
--
-- Retorna la cantidad de pedidos escalados en esta corrida.
CREATE OR REPLACE FUNCTION escalar_pedidos_timeout()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_pedido RECORD;
  v_timeout INTEGER;
  v_edad_segundos NUMERIC;
  v_tiene_dispositivo_activo BOOLEAN;
  v_escalados INTEGER := 0;
BEGIN
  FOR v_pedido IN
    SELECT p.id,
           p.restaurante,
           p.restaurante_id,
           p.fecha_creacion,
           EXTRACT(EPOCH FROM (NOW() - p.fecha_creacion)) AS edad_segundos
      FROM pedidos_delivery p
     WHERE p.intencion = 'pedido_comida'
       AND p.estado_pedido = 'pendiente_restaurante'
       AND COALESCE(p.escalado_operadora, false) = false
       AND COALESCE(p.restaurante_aceptado, false) = false
       AND COALESCE(p.restaurante_rechazado, false) = false
  LOOP
    -- 1) Resolver el timeout aplicable para este pedido.
    v_timeout := NULL;

    IF v_pedido.restaurante_id IS NOT NULL THEN
      -- Restaurante formal: buscar en restaurante_acceso por id.
      SELECT ra.timeout_segundos
        INTO v_timeout
        FROM restaurante_acceso ra
       WHERE ra.restaurante_id = v_pedido.restaurante_id
       LIMIT 1;
    ELSE
      -- Pedido legacy: matchear por nombre (case-insensitive).
      SELECT ra.timeout_segundos
        INTO v_timeout
        FROM restaurantes r
        LEFT JOIN restaurante_acceso ra ON ra.restaurante_id = r.id
       WHERE lower(r.nombre) = lower(v_pedido.restaurante)
       LIMIT 1;
    END IF;

    -- Default si no hay registro de acceso o el campo está NULL.
    IF v_timeout IS NULL THEN
      v_timeout := 90;
    END IF;

    v_edad_segundos := v_pedido.edad_segundos;

    -- 2) Caso "restaurante offline": si tiene restaurante_id pero NINGÚN
    --    dispositivo con ultimo_visto reciente, escalar de inmediato sin
    --    esperar al timeout.
    v_tiene_dispositivo_activo := false;

    IF v_pedido.restaurante_id IS NOT NULL THEN
      SELECT EXISTS (
        SELECT 1
          FROM restaurante_dispositivos d
         WHERE d.restaurante_id = v_pedido.restaurante_id
           AND d.ultimo_visto > NOW() - INTERVAL '2 minutes'
      ) INTO v_tiene_dispositivo_activo;
    END IF;

    -- 3) Decidir si escalar:
    --    * Restaurante offline (con restaurante_id formal) → escalar ya.
    --    * O bien, edad supera el timeout → escalar.
    IF (v_pedido.restaurante_id IS NOT NULL AND v_tiene_dispositivo_activo = false)
       OR v_edad_segundos > v_timeout
    THEN
      UPDATE pedidos_delivery
         SET escalado_operadora = true,
             escalado_operadora_at = NOW()
       WHERE id = v_pedido.id
         AND COALESCE(escalado_operadora, false) = false;

      IF FOUND THEN
        v_escalados := v_escalados + 1;
      END IF;
    END IF;
  END LOOP;

  RETURN v_escalados;
END;
$$;

-- Permisos: la función debe poder ser invocada desde el job de pg_cron
-- (que corre con privilegios de service_role/superuser), y también desde
-- el panel admin (authenticated) o, eventualmente, anon (no recomendado
-- pero lo dejamos abierto para testing manual rápido).
GRANT EXECUTE ON FUNCTION escalar_pedidos_timeout() TO anon, authenticated, service_role;


-- =========================================================================
-- C. Job de pg_cron
-- =========================================================================
-- Habilitar la extensión pg_cron. En Supabase está disponible pero hay
-- que activarla la primera vez.
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Programar el job cada minuto. NOTA: pg_cron usa formato cron estándar
-- (granularidad mínima = 1 minuto). Para correr cada 30s harían falta
-- workarounds (dos jobs desfasados, o cron.schedule_in_database con
-- segundos en versiones nuevas). Para Supabase plan free, cada minuto
-- es la frecuencia mínima estable, y es suficiente: si un restaurante
-- tiene timeout de 90s, en el peor caso la operadora ve el escalado
-- ~30s tarde, lo cual es aceptable.
--
-- Idempotencia: desprogramamos primero el job si existe (ignorando error
-- si no existe), y luego lo re-programamos.
DO $$
BEGIN
  PERFORM cron.unschedule('escalar-pedidos-timeout');
EXCEPTION
  WHEN OTHERS THEN
    -- El job no existía, no pasa nada.
    NULL;
END $$;

SELECT cron.schedule(
  'escalar-pedidos-timeout',
  '* * * * *',  -- cada minuto (frecuencia mínima estable de pg_cron)
  $$SELECT escalar_pedidos_timeout()$$
);


-- =========================================================================
-- D. Función manual: `forzar_escalado_pedido(p_pedido_id BIGINT)`
-- =========================================================================
-- Escala manualmente un pedido específico, sin importar su edad ni el
-- estado del dispositivo del restaurante. Útil para:
--   * Testing de la migración.
--   * Permitir al panel admin (UI) forzar un escalado cuando el operador
--     ya sabe que el restaurante no va a aceptar (ej: llamó por teléfono).
--
-- Retorna true si el pedido fue escalado en esta llamada, false si no
-- existía o ya estaba escalado/aceptado/rechazado.
--
-- ASUMIMOS `pedidos_delivery.id` es BIGINT (en la UI se muestra como
-- entero formateado, ej: #{pedido.id}). Si en tu instalación es UUID,
-- cambia el tipo del parámetro y este comentario.
CREATE OR REPLACE FUNCTION forzar_escalado_pedido(p_pedido_id BIGINT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_actualizados INTEGER;
BEGIN
  UPDATE pedidos_delivery
     SET escalado_operadora = true,
         escalado_operadora_at = NOW()
   WHERE id = p_pedido_id
     AND COALESCE(escalado_operadora, false) = false
     AND COALESCE(restaurante_aceptado, false) = false
     AND COALESCE(restaurante_rechazado, false) = false;

  GET DIAGNOSTICS v_actualizados = ROW_COUNT;
  RETURN v_actualizados > 0;
END;
$$;

GRANT EXECUTE ON FUNCTION forzar_escalado_pedido(BIGINT) TO anon, authenticated;


-- =========================================================================
-- ## Cómo probar
-- =========================================================================
-- Los siguientes snippets son ejemplos manuales para validar la migración
-- en el SQL Editor de Supabase. NO se ejecutan automáticamente.
--
-- 1) Insertar un pedido fake "vencido" (creado hace 5 minutos), pendiente
--    de aceptación:
--
--      INSERT INTO pedidos_delivery (
--        restaurante,
--        cliente_nombre,
--        cliente_telefono,
--        direccion_retiro,
--        direccion_entrega,
--        detalle_pedido,
--        intencion,
--        estado_pedido,
--        fecha_creacion
--      ) VALUES (
--        'Sushi Place',
--        'Tester',
--        '+54911000000',
--        'Av. Falsa 123',
--        'Av. Falsa 456',
--        '1x test',
--        'pedido_comida',
--        'pendiente_restaurante',
--        NOW() - INTERVAL '5 minutes'
--      )
--      RETURNING id;
--
-- 2) Ejecutar la función de escalado y verificar que retorna >= 1:
--
--      SELECT escalar_pedidos_timeout();
--
-- 3) Verificar el pedido (reemplazar :id por el id devuelto en el paso 1):
--
--      SELECT id, escalado_operadora, escalado_operadora_at
--        FROM pedidos_delivery
--       WHERE id = :id;
--
-- 4) Ver el job programado en pg_cron:
--
--      SELECT *
--        FROM cron.job
--       WHERE jobname = 'escalar-pedidos-timeout';
--
-- 5) Ver el historial reciente de ejecuciones del job:
--
--      SELECT *
--        FROM cron.job_run_details
--       WHERE jobid = (SELECT jobid FROM cron.job WHERE jobname = 'escalar-pedidos-timeout')
--       ORDER BY start_time DESC
--       LIMIT 10;
--
-- 6) Probar el forzado manual (reemplazar :id):
--
--      SELECT forzar_escalado_pedido(:id);
