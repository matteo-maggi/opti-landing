#!/usr/bin/env bash
# Riscarica i font self-hosted in assets/fonts/ e rigenera assets/fonts.css.
# Da rieseguire solo se cambiano famiglie o pesi usati in styles.css.
# I font sono serviti dal nostro dominio: nessuna richiesta a Google dal browser.
set -euo pipefail
cd "$(dirname "$0")/.."

FAMILIES="family=Space+Grotesk:wght@500;600&family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;500"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36"

curl -sf -A "$UA" "https://fonts.googleapis.com/css2?${FAMILIES}&display=swap" -o /tmp/opti-gf.css

python3 - <<'PY'
import re, io, os, urllib.request
css = io.open('/tmp/opti-gf.css', encoding='utf-8').read()
blocks = re.findall(r"/\* ([a-z-]+) \*/\s*(@font-face \{.*?\})", css, re.S)
out = ["""/* Font self-hosted: nessuna richiesta a fonts.googleapis.com / fonts.gstatic.com.
   Solo il subset "latin" e i pesi realmente usati dal sito.
   Rigenerabile con scripts/fetch-fonts.sh */\n"""]
os.makedirs('assets/fonts', exist_ok=True)
for subset, block in blocks:
    if subset != 'latin':
        continue
    fam = re.search(r"font-family: '([^']+)'", block).group(1)
    wt = re.search(r"font-weight: (\d+)", block).group(1)
    url = re.search(r"url\((https://[^)]+)\)", block).group(1)
    name = "%s-%s.woff2" % (fam.lower().replace(' ', '-'), wt)
    data = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})).read()
    io.open('assets/fonts/' + name, 'wb').write(data)
    out.append(block.replace(url, 'fonts/' + name))
    print("%-28s %5d KB" % (name, len(data)//1024))
io.open('assets/fonts.css', 'w', encoding='utf-8').write("\n".join(out) + "\n")
PY
