#!/usr/bin/env bash
# Build de la web de Happy Pollo → ../restaurante-hp/web/ (la carga el EXE "Happy Pollo Caja").
# OJO: el build vivo del 16-jul se compiló SIN estas variables y quedó como panel DEWAN
# (tabla pedidos_delivery). Usar SIEMPRE este script para HP.
set -e
cd "$(dirname "$0")"
export HP_WEB_BUILD=true
export VITE_MODO_HP=true
export VITE_PEDIDOS_TABLE=pedidos_hp
export VITE_MARCA="Happy Pollo"
export VITE_N8N_WEBHOOK_BASE=https://n8n.dewansas.com/webhook
# Aviso de tiempo de HP: webhook hp-timer-restaurante en la instancia de Super Happy (text/plain, no-cors)
export VITE_N8N_TIMER_URL="${VITE_N8N_TIMER_URL:-https://superhappy-n8n.bqspdc.easypanel.host/webhook/hp-timer-restaurante}"
npx vite build
B=$(grep -o -E 'assets/index-[A-Za-z0-9_-]+\.js' ../restaurante-hp/web/index.html | head -1)
for k in pedidos_hp hp-timer-restaurante "Happy Pollo"; do
  grep -q -- "$k" "../restaurante-hp/web/$B" && echo "  ok  $k" || { echo "  FALTA $k en el bundle"; exit 1; }
done
echo "build HP OK -> restaurante-hp/web/$B"
