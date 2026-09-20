// Configurazione centralizzata di endpoint e ID dei servizi esterni.
// Nessuna chiave privata va qui: la access key di Web3Forms è pensata per
// essere pubblica lato client (come un ID form), ma resta comunque isolata
// in questo file per poterla ruotare/aggiornare in un punto solo.
window.OPTI_CONFIG = {
  // https://web3forms.com — access key del form di OPTI.
  web3formsAccessKey: "0fa604b5-db8b-4851-91df-a6aa1ef08eaa",

  // Analytics senza cookie. Finché "provider" è vuoto non viene caricato
  // nulla e non parte nessuna richiesta a terze parti: il sito resta senza
  // banner cookie. Per attivarlo, scegli uno dei due e compila i campi.
  //
  //   Plausible: provider "plausible" + domain "optiapp.it"
  //              (scriptUrl solo se self-hosted)
  //   Umami:     provider "umami" + scriptUrl + websiteId
  //
  // Ricordati di aggiungere il fornitore scelto all'informativa privacy.
  analytics: {
    provider: "",   // "plausible" | "umami" | "" (disattivato)
    domain: "optiapp.it",
    scriptUrl: "",
    websiteId: ""
  }
};
