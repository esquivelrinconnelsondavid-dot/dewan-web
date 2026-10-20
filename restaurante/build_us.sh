#!/usr/bin/env bash
# Build de la web del PANEL DE EE.UU. → ../restaurante-us/web/  (14-oct-2026)
# Se sirve en https://dewansas.com/restaurante-us/web/. Mismo panel del SISTEMA en modo EE.UU.:
# locales en locales_us (ingreso us_login / us_sesion), pedidos en pedidos_us, hora de Nueva York,
# y al aceptar avisa a n8n `us-evento` (pide el repartidor de DoorDash). Ver SQL 036.
# TODAS las variables van aquí para que NUNCA se compile "a secas".
set -e
cd "$(dirname "$0")"
export US_WEB_BUILD=true
export VITE_US=true
export VITE_MODO_SISTEMA=true
export VITE_MODO_HP=true
export VITE_PEDIDOS_TABLE=pedidos_us
export VITE_MARCA="Panel de Pedidos"
export VITE_TZ=America/New_York
export VITE_N8N_WEBHOOK_BASE=https://n8n.dewansas.com/webhook
export VITE_N8N_TIMER_PATH=us-evento
export VITE_N8N_SALIO_PATH=us-evento
export VITE_N8N_RECHAZO_PATH=us-evento
unset VITE_N8N_TIMER_URL
npx vite build
B=$(grep -o -E 'assets/index-[A-Za-z0-9_-]+\.js' ../restaurante-us/web/index.html | head -1)
# [19-oct-2026] SQL 051: el Panel EE.UU. lee y cambia los pedidos por us_panel_pedidos / us_panel_accion.
for k in pedidos_us us-evento us_login us_sesion locales_us America/New_York us_panel_pedidos us_panel_accion; do
  grep -q -- "$k" "../restaurante-us/web/$B" && echo "  ok  $k" || { echo "  FALTA $k en el bundle"; exit 1; }
done
echo "build EE.UU. OK -> restaurante-us/web/$B"
