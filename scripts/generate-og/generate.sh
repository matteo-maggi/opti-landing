#!/usr/bin/env bash
# Rigenera assets/og-image.jpg (1200x630), l'anteprima che compare quando il
# link viene condiviso su WhatsApp o LinkedIn.
# Il testo sta in scripts/generate-og/template.html: cambiato il copy, rilancia
# questo script e aggiorna og:image / twitter:image se cambia il nome del file.
set -euo pipefail
cd "$(dirname "$0")/../.."

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT=8791
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"; kill %1 2>/dev/null || true' EXIT

python3 -m http.server "$PORT" >/dev/null 2>&1 &
sleep 1

"$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1200,630 --virtual-time-budget=5000 \
  --screenshot="$TMP/og.png" \
  "http://localhost:$PORT/scripts/generate-og/template.html" >/dev/null 2>&1

sips -s format jpeg -s formatOptions 82 "$TMP/og.png" --out assets/og-image.jpg >/dev/null
echo "assets/og-image.jpg: $(du -h assets/og-image.jpg | cut -f1)"
