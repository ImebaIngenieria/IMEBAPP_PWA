const hint = document.getElementById('hint');
const installBox = document.getElementById('installBox');

const ua = navigator.userAgent || '';
const isIOS = /iPad|iPhone|iPod/.test(ua);
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

if (!isIOS || isStandalone) {
  installBox.style.display = 'none';
}

function openUrl(url){
  window.location.href = url;
}

function trySchemeThenStore(scheme, storeUrl){
  // Intento de abrir app (si está instalada). Si no, saltamos a App Store.
  const start = Date.now();
  openUrl(scheme);

  setTimeout(() => {
    // Si seguimos aquí rápidamente, asumimos que no abrió la app.
    if (Date.now() - start < 2000) openUrl(storeUrl);
  }, 1200);
}

document.querySelectorAll('.card').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;

    if (action === 'web') {
      hint.textContent = 'Abriendo…';
      openUrl(btn.dataset.url);
      return;
    }

    if (action === 'store') {
      hint.textContent = 'Abriendo App Store…';
      openUrl(btn.dataset.store);
      return;
    }

    if (action === 'native') {
      const scheme = btn.dataset.scheme;
      const store = btn.dataset.store;

      hint.textContent = 'Abriendo app…';
      trySchemeThenStore(scheme, store);
      return;
    }
  });
});

// Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}
