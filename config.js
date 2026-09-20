// Configurazione centralizzata di endpoint e ID dei servizi esterni.
// Nessuna chiave privata va qui: la access key di Web3Forms è pensata per
// essere pubblica lato client (come un ID form), ma resta comunque isolata
// in questo file per poterla ruotare/aggiornare in un punto solo.
window.OPTI_CONFIG = {
  // https://web3forms.com — richiedi la tua access key inserendo la tua email,
  // nessun account necessario. Sostituisci il placeholder sotto.
  web3formsAccessKey: "INSERISCI_QUI_ACCESS_KEY",

  // Link all'evento Cal.com "Chiacchierata 20 min" (es. https://cal.com/tuonome/20min).
  // Usato in P0-3 per la pagina/sezione di ringraziamento dopo l'invio del form demo.
  calComLink: "INSERISCI_QUI_LINK_CALCOM",

  // Dominio registrato su Plausible/Umami. Lascia vuoto per non caricare l'analytics.
  analyticsDomain: ""
};
