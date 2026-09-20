// Analytics senza cookie, acceso da config.js. Se il provider non è
// configurato, optiTrack() esiste ma non fa nulla: il resto del sito non
// deve sapere se l'analytics è attivo.
//
// Per escludere le proprie visite: aprire il sito una volta con
// https://optiapp.it/?notrack=1 sul telefono e sul computer che usi di
// solito. Il flag resta in localStorage su quel browser.
(function(){
  var cfg = (window.OPTI_CONFIG && window.OPTI_CONFIG.analytics) || {};

  function noop(){}
  window.optiTrack = noop;

  var excluded = false;
  try {
    if(new URLSearchParams(window.location.search).get('notrack') === '1'){
      localStorage.setItem('opti_notrack', '1');
    }
    excluded = localStorage.getItem('opti_notrack') === '1';
  } catch(e) { /* storage bloccato: tracciamo normalmente */ }

  if(excluded || !cfg.provider){ return; }

  var script = document.createElement('script');
  script.defer = true;

  if(cfg.provider === 'plausible'){
    script.src = cfg.scriptUrl || 'https://plausible.io/js/script.js';
    script.setAttribute('data-domain', cfg.domain || window.location.hostname);
    window.plausible = window.plausible || function(){
      (window.plausible.q = window.plausible.q || []).push(arguments);
    };
    window.optiTrack = function(name, props){ window.plausible(name, { props: props || {} }); };
  } else if(cfg.provider === 'umami'){
    script.src = cfg.scriptUrl;
    script.setAttribute('data-website-id', cfg.websiteId || '');
    window.optiTrack = function(name, props){
      if(window.umami){ window.umami.track(name, props || {}); }
    };
  } else {
    return;
  }

  document.head.appendChild(script);
})();
