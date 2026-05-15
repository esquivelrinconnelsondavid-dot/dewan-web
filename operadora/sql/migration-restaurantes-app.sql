-- Migración: App de Restaurantes (recepción directa de pedidos)
-- Ejecutar en Supabase SQL Editor.
--
-- Esta migración introduce el modelo necesario para que cada restaurante
-- reciba los pedidos directamente en su propio dispositivo (tablet/celular),
-- elimine a la operadora humana como intermediaria y acepte el pedido
-- indicando el tiempo de preparación.
--
-- Crea:
--   1) Tabla `restaurantes` (catálogo formal, antes era TEXT libre).
--   2) Tabla `restaurante_dispositivos` (sesiones de tablets vinculadas).
--   3) Columnas nuevas en `pedidos_delivery` para el flujo de aceptación.
--   4) Realtime para las nuevas tablas.
--   5) Índices de consulta.
--   6) RLS + funciones RPC `verificar_codigo_restaurante` y
--      `restaurante_por_token` para login del dispositivo sin exponer
--      la tabla `restaurantes` al público.
--
-- IDEMPOTENTE: se puede correr varias veces sin romper. Usa IF NOT EXISTS,
-- CREATE OR REPLACE FUNCTION y maneja duplicate_object en ALTER PUBLICATION.


-- =========================================================================
-- 1. Tabla `restaurantes`
-- =========================================================================
-- Catálogo formal de restaurantes. El `nombre` debe coincidir con el valor
-- que hoy usan los pedidos en `pedidos_delivery.restaurante` (TEXT libre)
-- para poder hacer matching mientras migramos.
CREATE TABLE IF NOT EXISTS restaurantes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  codigo_acceso TEXT UNIQUE NOT NULL,
  telefono TEXT,
  activo BOOLEAN DEFAULT true,
  timeout_segundos INTEGER DEFAULT 90,
  fecha_creacion TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT restaurantes_codigo_acceso_formato
    CHECK (codigo_acceso ~ '^[0-9]{6}$')
);

-- Índice único case-insensitive sobre el nombre, para evitar duplicados
-- tipo "Sushi Place" vs "sushi place".
CREATE UNIQUE INDEX IF NOT EXISTS idx_restaurantes_nombre_lower
  ON restaurantes (lower(nombre));


-- =========================================================================
-- 2. Tabla `restaurante_dispositivos`
-- =========================================================================
-- Cada fila representa una sesión de un dispositivo (tablet/celular) que
-- el restaurante mantiene activo. El `token` se guarda en localStorage
-- para no volver a pedir el código de acceso en cada apertura.
CREATE TABLE IF NOT EXISTS restaurante_dispositivos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurante_id UUID NOT NULL REFERENCES restaurantes(id) ON DELETE CASCADE,
  nombre_dispositivo TEXT,
  token TEXT UNIQUE NOT NULL,
  user_agent TEXT,
  ultimo_visto TIMESTAMPTZ DEFAULT NOW(),
  creado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_restaurante_dispositivos_restaurante
  ON restaurante_dispositivos (restaurante_id);


-- =========================================================================
-- 3. Columnas nuevas en `pedidos_delivery` (aditivas)
-- =========================================================================
-- Permite trackear el flujo: pedido recibido -> restaurante acepta/rechaza
-- -> si no responde dentro del timeout, se escala a la operadora humana.
ALTER TABLE pedidos_delivery
  ADD COLUMN IF NOT EXISTS restaurante_id UUID REFERENCES restaurantes(id),
  ADD COLUMN IF NOT EXISTS restaurante_aceptado BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS restaurante_aceptado_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS restaurante_rechazado BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS restaurante_rechazado_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS restaurante_motivo_rechazo TEXT,
  ADD COLUMN IF NOT EXISTS escalado_operadora BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS escalado_operadora_at TIMESTAMPTZ;


-- =========================================================================
-- 4. Realtime
-- =========================================================================
-- Añade las tablas a la publicación supabase_realtime para que la app de
-- los restaurantes y el panel operadora reciban cambios en vivo.
-- Si la tabla ya estaba en la publicación, se ignora el error.
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE restaurantes;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;

  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE restaurante_dispositivos;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;

  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE pedidos_delivery;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
END $$;


-- =========================================================================
-- 5. Índices útiles
-- =========================================================================
-- Consultas típicas: "pedidos activos de un restaurante, más recientes
-- primero". Filtra por intencion = 'pedido_comida' (parcial) porque la
-- tabla recibe otros tipos de mensajes.
CREATE INDEX IF NOT EXISTS idx_pedidos_restaurante_estado
  ON pedidos_delivery (restaurante_id, estado_pedido, fecha_creacion DESC)
  WHERE intencion = 'pedido_comida';

-- Nota: no creamos índice explícito en restaurantes(codigo_acceso) porque
-- el UNIQUE constraint ya genera uno automáticamente.


-- =========================================================================
-- 6. RLS y funciones RPC
-- =========================================================================
-- Activamos RLS en las tablas nuevas. NO tocamos RLS de pedidos_delivery
-- (ya está manejado por la app de operadora existente).
ALTER TABLE restaurantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurante_dispositivos ENABLE ROW LEVEL SECURITY;

-- No definimos policies de SELECT/INSERT/UPDATE/DELETE directas: queremos
-- que el acceso desde anon pase SIEMPRE por las funciones RPC siguientes,
-- que validan el código de acceso o el token antes de devolver datos.
-- Default-deny: sin policies, RLS bloquea todo acceso desde anon.


-- -------------------------------------------------------------------------
-- RPC: verificar_codigo_restaurante
-- -------------------------------------------------------------------------
-- Valida el código de 6 dígitos que ingresa el restaurante en la pantalla
-- de login. Si el código existe y el restaurante está activo, crea un
-- nuevo registro en `restaurante_dispositivos` con un token aleatorio
-- (que el cliente guardará en localStorage) y retorna los datos básicos.
--
-- Si el código es inválido o el restaurante está desactivado, retorna
-- una fila vacía (NULL en todos los campos).
--
-- SECURITY DEFINER: corre con los permisos del owner, saltando RLS.
CREATE OR REPLACE FUNCTION verificar_codigo_restaurante(
  codigo TEXT,
  dispositivo_nombre TEXT DEFAULT NULL
)
RETURNS TABLE (
  restaurante_id UUID,
  nombre TEXT,
  token TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_restaurante RECORD;
  v_token TEXT;
BEGIN
  -- Buscar restaurante por código y que esté activo.
  SELECT r.id, r.nombre
    INTO v_restaurante
    FROM restaurantes r
   WHERE r.codigo_acceso = codigo
     AND r.activo = true
   LIMIT 1;

  IF NOT FOUND THEN
    -- Código inválido o restaurante desactivado: no devolvemos nada.
    RETURN;
  END IF;

  -- Generar token aleatorio (64 chars hex = 32 bytes).
  v_token := encode(gen_random_bytes(32), 'hex');

  -- Registrar el dispositivo.
  INSERT INTO restaurante_dispositivos (
    restaurante_id,
    nombre_dispositivo,
    token
  ) VALUES (
    v_restaurante.id,
    dispositivo_nombre,
    v_token
  );

  -- Retornar datos al cliente.
  restaurante_id := v_restaurante.id;
  nombre := v_restaurante.nombre;
  token := v_token;
  RETURN NEXT;
END;
$$;


-- -------------------------------------------------------------------------
-- RPC: restaurante_por_token
-- -------------------------------------------------------------------------
-- Resuelve la sesión a partir del token guardado en localStorage del
-- dispositivo. Actualiza `ultimo_visto` para saber qué tablets siguen
-- activas. Retorna NULL si el token no existe o el restaurante no está
-- activo.
CREATE OR REPLACE FUNCTION restaurante_por_token(p_token TEXT)
RETURNS TABLE (
  restaurante_id UUID,
  nombre TEXT,
  timeout_segundos INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Actualizar ultimo_visto del dispositivo que usa este token.
  UPDATE restaurante_dispositivos
     SET ultimo_visto = NOW()
   WHERE token = p_token;

  -- Devolver el restaurante asociado, si está activo.
  RETURN QUERY
    SELECT r.id, r.nombre, r.timeout_segundos
      FROM restaurante_dispositivos d
      JOIN restaurantes r ON r.id = d.restaurante_id
     WHERE d.token = p_token
       AND r.activo = true
     LIMIT 1;
END;
$$;


-- -------------------------------------------------------------------------
-- Permisos de ejecución
-- -------------------------------------------------------------------------
-- Ambas funciones deben ser invocables desde la app pública (anon) y
-- desde usuarios autenticados.
GRANT EXECUTE ON FUNCTION verificar_codigo_restaurante(TEXT, TEXT)
  TO anon, authenticated;

GRANT EXECUTE ON FUNCTION restaurante_por_token(TEXT)
  TO anon, authenticated;
