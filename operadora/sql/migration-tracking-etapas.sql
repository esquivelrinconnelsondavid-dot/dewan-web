-- Migración: Tracking de etapas del cliente en la mini-app
-- Ejecutar en Supabase SQL Editor
--
-- Añade dos columnas a links_sesion para saber en qué paso del flujo
-- está cada cliente que recibió un link por WhatsApp.
--
-- Valores posibles de etapa_actual:
--   abrio           - Cliente abrió el link (tocó el link de WhatsApp)
--   eligio_gps      - Aceptó compartir GPS
--   eligio_sin_gps  - Tocó "Continuar sin ubicación"
--   agrego_carrito  - Agregó al menos un producto al carrito
--   abrio_carrito   - Abrió la vista del carrito con items
--   confirmo        - Tocó "Confirmar pedido" (se abrió WhatsApp)

ALTER TABLE links_sesion
  ADD COLUMN IF NOT EXISTS etapa_actual TEXT,
  ADD COLUMN IF NOT EXISTS etapa_at TIMESTAMPTZ;

-- Índice para consultar por etapa (útil para dashboard operadora)
CREATE INDEX IF NOT EXISTS idx_links_etapa
  ON links_sesion (etapa_actual, etapa_at DESC);

-- Habilitar Realtime para que el embudo del panel operadora se
-- actualice en vivo a medida que los clientes avanzan.
-- Si ya está añadida, este comando falla: es seguro ignorar el error.
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE links_sesion;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
END $$;
