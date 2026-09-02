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
npx vite build
# Verificación: el bundle debe traer la tabla y las rutas del sistema
B=$(grep -o -E 'assets/index-[A-Za-z0-9_-]+\.js' ../restaurante-sistema/web/index.html | head -1)
for k in pedidos_sistema sistema-timer sistema-salio sistema-rechazo "Panel de Pedidos"; do
  grep -q -- "$k" "../restaurante-sistema/web/$B" && echo "  ok  $k" || { echo "  FALTA $k en el bundle"; exit 1; }
done
echo "build sistema OK -> restaurante-sistema/web/$B"
