#!/usr/bin/env bash
# Rigenera assets/og-image.jpg (1200x630), l'anteprima che compare quando il
# link viene condiviso su WhatsApp o LinkedIn.
# Il testo sta in scripts/generate-og/template.html: cambiato il copy, rilancia
# questo script e aggiorna og:image / twitter:image se cambia il nome del file.
set -euo pipefail
cd "$(dirname "$0")/../.."

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT=8791
# Il nome ha una versione: cambiarlo obbliga WhatsApp/LinkedIn a riscaricare
# l'anteprima invece di servire quella vecchia dalla cache.
OUT="assets/og-image-v3.jpg"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"; kill %1 2>/dev/null || true' EXIT

python3 -m http.server "$PORT" >/dev/null 2>&1 &
sleep 1

# Render a 2x e riduzione a 1200x630: WhatsApp e LinkedIn ricomprimono
# l'anteprima in un riquadro piccolo, e un render 1:1 ne esce sgranato.
"$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1200,630 --force-device-scale-factor=2 --virtual-time-budget=5000 \
  --screenshot="$TMP/og@2x.png" \
  "http://localhost:$PORT/scripts/generate-og/template.html" >/dev/null 2>&1

sips -z 630 1200 "$TMP/og@2x.png" --out "$TMP/og.png" >/dev/null
sips -s format jpeg -s formatOptions 88 "$TMP/og.png" --out "$OUT" >/dev/null
echo "$OUT: $(du -h "$OUT" | cut -f1)"
echo "ricorda: se cambi il nome del file, aggiorna og:image e twitter:image in index.html"
