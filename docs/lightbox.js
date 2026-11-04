// Opens a framed screenshot (.shot) full size in a dialog. Esc, the close button or a click
// anywhere closes it. No library: the native <dialog> handles focus and Esc.
(function () {
  let dialog;

  function build() {
    dialog = document.createElement('dialog');
    dialog.className = 'lightbox';
    dialog.innerHTML =
      '<figure><img alt=""><figcaption></figcaption></figure>' +
      '<button type="button" class="lightbox-close" aria-label="Close">×</button>';
    dialog.addEventListener('click', () => dialog.close());
    document.body.appendChild(dialog);
  }

  document.addEventListener('click', (event) => {
    const shot = event.target.closest('.shot');
    if (!shot) return;
    const img = shot.querySelector('img');
    if (!img) return;
    if (!dialog) build();
    const big = dialog.querySelector('img');
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    const caption = shot.closest('figure').querySelector('figcaption');
    dialog.querySelector('figcaption').innerHTML = caption ? caption.innerHTML : '';
    dialog.showModal();
  });
})();
