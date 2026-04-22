-- ============================================================
-- Bucket público "restaurantes" para logos / fotos de portada
-- Ejecutar UNA sola vez en Supabase SQL Editor
-- ============================================================

-- 1. Crear bucket público (si ya existe, no falla)
INSERT INTO storage.buckets (id, name, public)
VALUES ('restaurantes', 'restaurantes', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Asegurar que logo_url existe en la tabla restaurantes
ALTER TABLE restaurantes
  ADD COLUMN IF NOT EXISTS logo_url TEXT;

-- 3. Policies del bucket
--    Lectura pública (cualquiera puede ver los logos)
DROP POLICY IF EXISTS "restaurantes_logos_read_public" ON storage.objects;
CREATE POLICY "restaurantes_logos_read_public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'restaurantes');

--    Escritura con anon key (el uploader corre en el browser con anon key).
--    Restringimos al bucket 'restaurantes' y a la carpeta 'logos/'.
DROP POLICY IF EXISTS "restaurantes_logos_insert_anon" ON storage.objects;
CREATE POLICY "restaurantes_logos_insert_anon"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'restaurantes'
    AND (storage.foldername(name))[1] = 'logos'
  );

DROP POLICY IF EXISTS "restaurantes_logos_update_anon" ON storage.objects;
CREATE POLICY "restaurantes_logos_update_anon"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'restaurantes'
    AND (storage.foldername(name))[1] = 'logos'
  );

DROP POLICY IF EXISTS "restaurantes_logos_delete_anon" ON storage.objects;
CREATE POLICY "restaurantes_logos_delete_anon"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'restaurantes'
    AND (storage.foldername(name))[1] = 'logos'
  );

-- 4. Permitir UPDATE de logo_url en la tabla restaurantes con anon
--    (si tu RLS ya permite UPDATE con anon, esto es redundante — omitir)
DROP POLICY IF EXISTS "restaurantes_update_logo_url_anon" ON restaurantes;
CREATE POLICY "restaurantes_update_logo_url_anon"
  ON restaurantes FOR UPDATE
  USING (true)
  WITH CHECK (true);
