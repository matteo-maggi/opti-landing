// Configurazione centralizzata di endpoint e ID dei servizi esterni.
// Nessuna chiave privata va qui: la access key di Web3Forms è pensata per
// essere pubblica lato client (come un ID form), ma resta comunque isolata
// in questo file per poterla ruotare/aggiornare in un punto solo.
window.OPTI_CONFIG = {
  // https://web3forms.com — access key del form di OPTI.
  web3formsAccessKey: "0fa604b5-db8b-4851-91df-a6aa1ef08eaa",

  // Dominio registrato su Plausible/Umami. Lascia vuoto per non caricare l'analytics.
  analyticsDomain: ""
};
