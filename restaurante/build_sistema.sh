#!/usr/bin/env bash
# Build de la web del PANEL DEL SISTEMA (locales vendidos) → ../restaurante-sistema/web/
# Se sirve en https://dewansas.com/restaurante-sistema/web/ (el EXE "Panel de Pedidos" la carga).
# TODAS las variables van aquí para que NUNCA se compile "a secas" (así se rompió el de HP
# el 16-jul: quedó como build DEWAN leyendo pedidos_delivery).
set -e
cd "$(dirname "$0")"
export SISTEMA_WEB_BUILD=true
export VITE_MODO_SISTEMA=true
export VITE_MODO_HP=true
export VITE_PEDIDOS_TABLE=pedidos_sistema
export VITE_MARCA="Panel de Pedidos"
export VITE_N8N_WEBHOOK_BASE=https://n8n.dewansas.com/webhook
export VITE_N8N_TIMER_PATH=sistema-timer
export VITE_N8N_SALIO_PATH=sistema-salio
export VITE_N8N_RECHAZO_PATH=sistema-rechazo
unset VITE_N8N_TIMER_URL
# La URL y la llave de Supabase vienen de restaurante/.env, que NO está en git: en un worktree
# nuevo no existe y el bundle sale sin URL → "supabaseUrl is required" y el panel se queda en
# "Reintentar" para todos (pasó con d90cd2f, 2-oct). Sin eso, no se compila.
grep -q '^VITE_SUPABASE_URL=.' .env 2>/dev/null || [ -n "$VITE_SUPABASE_URL" ] || { echo "FALTA VITE_SUPABASE_URL: copiar restaurante/.env del checkout principal"; exit 1; }
npx vite build
# Verificación: el bundle debe traer Supabase, la tabla y las rutas del sistema
B=$(grep -o -E 'assets/index-[A-Za-z0-9_-]+\.js' ../restaurante-sistema/web/index.html | head -1)
for k in supabase.co pedidos_sistema sistema-timer sistema-salio sistema-rechazo "Panel de Pedidos"; do
  grep -q -- "$k" "../restaurante-sistema/web/$B" && echo "  ok  $k" || { echo "  FALTA $k en el bundle"; exit 1; }
done
echo "build sistema OK -> restaurante-sistema/web/$B"
