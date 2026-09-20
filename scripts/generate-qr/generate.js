// Genera un QR in SVG (vettoriale, adatto alla stampa) per ciascuna sorgente
// tracciata in P0-2, puntando a https://optiapp.it/?src=<valore>#richiedi-demo.
//
// Uso: npm run generate
// Output: qr-codes/<valore>.svg (nella root del repo)

const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const BASE_URL = 'https://optiapp.it/';
const SOURCES = ['bimu', 'at-vicenza', 'linkedin', 'biglietto'];
const OUTPUT_DIR = path.join(__dirname, '..', '..', 'qr-codes');

const QR_OPTIONS = {
  type: 'svg',
  errorCorrectionLevel: 'M',
  margin: 4, // zona di rispetto: 4 moduli, come richiesto per la stampa
  color: {
    dark: '#1a2030', // navy-900, scuro su chiaro per massima leggibilità
    light: '#ffffff'
  }
};

async function main(){
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for(const src of SOURCES){
    const url = `${BASE_URL}?src=${src}#richiedi-demo`;
    const outPath = path.join(OUTPUT_DIR, `${src}.svg`);
    const svg = await QRCode.toString(url, QR_OPTIONS);
    fs.writeFileSync(outPath, svg);
    console.log(`OK  ${src.padEnd(12)} -> ${url}  (${path.relative(process.cwd(), outPath)})`);
  }
}

main().catch(function(err){
  console.error('Errore nella generazione dei QR:', err);
  process.exit(1);
});
