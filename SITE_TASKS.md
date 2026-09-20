# OPTI — Fix e adattamenti del sito (optiapp.it)

Prompt di partenza per Claude Code: "Leggi SITE_TASKS.md. Parti dalla Fase 0 (audit del repo) e mostrami un riepilogo di stack, form attuali e piano di lavoro prima di modificare qualsiasi cosa. Poi procedi per priorità, da P0."

## Contesto
Sito: optiapp.it, landing page in italiano per OPTI, un prodotto per tecnici commerciali che vendono macchinari e impianti industriali.
Obiettivo nelle prossime settimane: non vendere. Trasformare i contatti fatti in fiera (BIMU, Milano, 13-16 ottobre; A&T Vicenza, 27-29 ottobre) in call di 20 minuti e raccogliere iscritti alla waitlist.
Chi lo apre: un tecnico commerciale di un'azienda di macchinari, quasi sempre da smartphone, dopo aver scansionato un QR sul biglietto da visita. Il sito va pensato mobile-first.
Posizionamento: il prodotto è uno strumento per raccogliere le informazioni di un sopralluogo (cliente, stabilimento, progetto, foto, note, annotazioni, export PDF) e preparare la proposta senza tornare dal cliente. Il sito oggi enfatizza soprattutto AR e catalogo digitale: va riequilibrato (vedi P0-5).

## Regole di lavoro per Claude Code
- Fase 0, audit prima di modificare: individua stack, struttura dei file, hosting/deploy, come funzionano oggi i due form (probabilmente mostrano solo un messaggio di successo senza inviare nulla: verificalo) e riportami un riepilogo.
- Non inventare claim, numeri, clienti, testimonianze o dati legali. Dove trovi [DA CONFERMARE] lascia un TODO visibile nel codice e includilo nell'elenco finale.
- Se il sito è statico, resta statico: nessun framework o build step nuovo senza motivo.
- Nessuna chiave segreta nel repo. Endpoint e ID degli strumenti esterni in un unico file di configurazione.
- Un commit per blocco di lavoro, con messaggio chiaro.
- Tutti i testi visibili in italiano.
- A fine lavoro, fornisci l'elenco di ciò che devo fare io a mano (DNS, account, dati legali, ecc.).

## Decisioni del proprietario (prima di P0)

| Decisione | Default proposto |
|---|---|
| Nome del prodotto: OPTI o OptiLay | OPTI (come sito e dominio); allineare biglietto, LinkedIn, deck |
| Claim "in un'ora" nel titolo | Rimuoverlo finché non è misurato; usare "senza tornare dal cliente" |
| "OPTI è già in uso su tre funzioni concrete" | Sostituire con formulazione onesta: "prototipo in validazione" |
| Nome e foto del fondatore sul sito | Sì, sezione "Chi c'è dietro" |
| Dati identificativi del titolare (nome/ragione sociale, sede, P.IVA o CF) | Da fornire per il footer e l'informativa |
| Funzioni da mostrare come "disponibili" | Solo quelle davvero funzionanti oggi; le altre come "in arrivo" |

## Strumenti consigliati (uno per categoria, non tutti)

| Funzione | Default | Alternative |
|---|---|---|
| Form → email | Formspree o Web3Forms (se l'hosting non offre form propri) | Netlify Forms / equivalente, se già in uso |
| Waitlist / newsletter | MailerLite o Brevo (fornitori europei) | stesso backend dei form con campo form_type |
| Prenotazione call | Cal.com | Calendly |
| Analytics | Plausible o Umami (senza cookie) | — |
| Anti-spam | Honeypot + Cloudflare Turnstile (opzionale) | hCaptcha |

Prima di scegliere: verificare i limiti del piano gratuito e dove vengono ospitati i dati (UE/USA), perché va scritto nell'informativa privacy.

## P0 — Da completare prima di far stampare i biglietti

### P0-1. Form funzionanti
Sostituire l'invio simulato con invio reale su entrambi i form (#richiedi-demo e #waitlist).
- Demo → notifica email al mio indirizzo + archivio dei contatti (foglio Google o dashboard dello strumento).
- Waitlist → lista separata nello strumento newsletter, oppure stesso backend con form_type=waitlist.
- Campi nascosti su entrambi: form_type (demo | waitlist), src, utm_source, utm_medium, utm_campaign, page_url.
- Anti-spam con honeypot.
- Stati UI reali: caricamento (pulsante disabilitato), successo, errore con messaggio e alternativa ("scrivimi a nome@optiapp.it"). Non mostrare mai "Richiesta inviata" se l'invio è fallito.
- Validazione lato client con messaggi in italiano; type="email", autocomplete corretti.

Fatto quando: invio reale da mobile, ricevo la notifica, il contatto compare nello strumento con tutti i campi nascosti compilati.

### P0-2. Tracciamento della sorgente (QR per fiera)
- All'arrivo sul sito leggere ?src= e salvarlo (sessionStorage), poi passarlo ai form. Valori attesi: bimu, at-vicenza, linkedin, biglietto. Se assente: direct.
- Creare uno script (es. scripts/generate-qr) che genera un QR in SVG (vettoriale, per la stampa) per ciascun valore, puntando a https://optiapp.it/?src=<valore>#richiedi-demo.
- QR con correzione errori livello M o Q, zona di rispetto attorno di almeno 4 moduli, scuro su chiaro.

Fatto quando: i QR generati aprono il form e il valore src arriva nei dati inviati. (Da testare a mano con due telefoni diversi sulla stampa di prova.)

### P0-3. Prenotazione call dopo l'invio
- Dopo l'invio del form demo, mostrare una pagina o sezione di ringraziamento (/grazie o stato in pagina) con il calendario Cal.com incorporato o linkato, evento "Chiacchierata 20 min".
- Precompilare nome ed email se lo strumento lo consente.
- Togliere "Ti contattiamo entro 48 ore" a meno che sia una promessa che rispetterò.

### P0-4. Privacy, consenso e dati legali
(Claude Code prepara pagine e link; i testi legali vanno verificati da un consulente o generati con uno strumento apposito.)
- Creare /privacy con informativa: titolare, dati raccolti, finalità, base giuridica, conservazione, fornitori coinvolti (form, newsletter, analytics, calendario), diritti dell'interessato, contatto.
- Sotto ogni form: riga informativa con link alla privacy. Nel form waitlist, checkbox di consenso non preselezionata per ricevere aggiornamenti.
- Footer con: nome/ragione sociale, sede, P.IVA o CF, email, link privacy.
- Verificare quali cookie o richieste a terze parti generano il sito e gli embed (calendario, video, font). Se possibile eliminarli: font self-hosted, analytics senza cookie. Se restano cookie non tecnici serve il banner.

### P0-5. Riposizionamento del messaggio
Applicare il copy della sezione "Copy proposto" più sotto:
- Nuovo titolo, sottotitolo e pulsanti.
- Riscrivere le tre card di "Il problema" sul lavoro del tecnico commerciale (sopralluogo, dati sparsi, ritorni dal cliente).
- Riordinare "Cosa fa": prima il flusso di sopralluogo, poi i moduli (catalogo, ingombri su planimetria, AR) con etichetta disponibile / in arrivo.
- Rimuovere o riformulare i claim non dimostrabili (vedi "Decisioni").
- Cambiare il pulsante principale da "Richiedi una demo" a un invito all'ascolto.

### P0-6. Mobile-first
- Provare a 360, 390 e 430 px di larghezza: il titolo e il pulsante principale devono essere visibili senza scorrere.
- Target touch di almeno 44 px, nessuno scroll orizzontale, form comodo da compilare in piedi in fiera.
- Video in hero: muted, playsinline, preload="metadata", immagine poster; comprimere il file (obiettivo indicativo sotto i pochi MB); rinominare AR to Technical Drawing.mp4 senza spazi (es. ar-to-technical-drawing.mp4) e aggiornare i riferimenti; rispettare prefers-reduced-motion.

### P0-7. Email col dominio (a mano, poi verifica)
- Creare nome@optiapp.it e configurare SPF, DKIM e DMARC.
- Verificare che le notifiche dei form non finiscano in spam.
- Usare questo indirizzo su sito, biglietto e LinkedIn.

## P1 — Entro BIMU (13 ottobre)
- Sezione "Chi c'è dietro": foto, nome, due righe di background, link LinkedIn, email diretta.
- Form demo semplificato (massimo 5-6 campi): nome e cognome, azienda, email di lavoro, ruolo (commerciale tecnico / ufficio tecnico / titolare-direzione / altro), cosa vendete, e un campo facoltativo "Come prepari oggi la proposta dopo un sopralluogo?".
- Analytics con eventi: click sulle CTA (demo, waitlist, prenotazione), invio form per tipo, con src come proprietà. Obiettivo: vedere quanti contatti arrivano per fiera.
- SEO e condivisione: <html lang="it">, title e description, canonical, Open Graph e Twitter card con immagine 1200×630 (anteprima quando il link viene condiviso su LinkedIn o WhatsApp), favicon e apple-touch-icon, robots.txt, sitemap.xml.
- Accessibilità: <label> associati agli input (non solo placeholder), contrasto AA, focus visibile, alt sulle immagini, un solo h1 e gerarchia dei titoli corretta, skip link.
- Performance: immagini ottimizzate (webp, dimensioni giuste), niente JS superfluo, font con font-display: swap. Punto di riferimento: Lighthouse mobile alto su performance, accessibilità, best practices e SEO.
- Pagine 404 e /grazie.
- Navigazione: aggiornare le voci del menu ai nuovi titoli di sezione, ancore funzionanti, il pulsante principale del menu coerente con la CTA dell'hero.

## P2 — Dopo le prime fiere
- Versione della pagina o sezione dedicata per settore (es. macchine utensili), se le interviste mostrano segmenti diversi.
- FAQ costruita sulle domande reali ricevute.
- Sezione "cosa ho imparato dalle interviste" o citazioni (solo con consenso esplicito).
- Esportazione dei contatti e collegamento leggero a un CRM, se il volume lo giustifica.
- Test A/B sul titolo.

## Copy proposto (bozza da rivedere)

Menu: Il problema · Come funziona · [Parliamo]

### Hero
- Etichetta: Per chi vende macchinari e impianti industriali
- Titolo: Dal sopralluogo alla proposta, senza tornare dal cliente.
- Sottotitolo: OPTI raccoglie in un unico progetto foto, note, annotazioni e requisiti dello stabilimento, così prepari la proposta tecnica con tutto quello che ti serve.
- Pulsante primario: Raccontami come lavori (20 min) → #richiedi-demo
- Pulsante secondario: Seguine lo sviluppo → #waitlist
- Microtesto: Non è una vendita: sto costruendo OPTI insieme a chi fa questo lavoro.

### Il problema (ipotesi da validare in fiera: dopo le interviste, sostituire con le parole reali dei tecnici)
- Le informazioni sono ovunque. Foto in galleria, misure su carta, requisiti su WhatsApp o a memoria.
- Manca sempre un dato. Una quota, un accesso, un vincolo: e si torna dal cliente.
- La proposta riparte da zero in ufficio. Ricostruire il sopralluogo richiede ore e si perde contesto.

### Cosa fa OPTI (mostrare solo ciò che oggi funziona: [DA CONFERMARE])
- Un progetto per ogni cliente e stabilimento. Foto, note e file nello stesso posto.
- Annota sul posto. Ingombri, accessi e note direttamente su foto e planimetria.
- Esporta quando serve. Un PDF ordinato per l'ufficio tecnico o per il cliente.

### Moduli (secondari, con etichetta disponibile / in arrivo)
- Catalogo digitale delle macchine: modello 3D, schemi 2D, foto, video e configurazioni.
- Proiezione AR del macchinario nello spazio reale.

### Chi c'è dietro
Sono [Nome], [una riga di background credibile]. Sto costruendo OPTI parlando con chi vende macchinari ogni giorno. + foto + LinkedIn + email.

### Testo sotto i form
- Demo: Uso i tuoi dati solo per ricontattarti su OPTI. [Informativa privacy]
- Waitlist (checkbox non preselezionata): Acconsento a ricevere aggiornamenti su OPTI. Puoi cancellarti quando vuoi. [Informativa privacy]

### Footer
OPTI · [Nome/ragione sociale] · [P.IVA/CF] · [Sede] · [email] · Privacy · Prototipo in validazione, 2026

## Checklist di verifica finale
- [ ] Invio reale di entrambi i form da smartphone, con notifica ricevuta e contatto archiviato
- [ ] src corretto per ogni QR (bimu, at-vicenza, linkedin, biglietto)
- [ ] QR stampato di prova scansionato con almeno due telefoni
- [ ] Prenotazione della call funzionante dopo l'invio
- [ ] Pagina privacy, consenso nei form e dati del titolare nel footer
- [ ] Nessun [DA CONFERMARE] o TODO rimasto nei testi visibili
- [ ] Nome del prodotto coerente ovunque
- [ ] Anteprima del link controllata su WhatsApp e LinkedIn
- [ ] Lighthouse mobile e prova su due dispositivi diversi
- [ ] Email del dominio attiva e notifiche non finite in spam
