import { $, $$ } from './dom';
import { CV } from './data';

const lb = (): HTMLElement => $('#lb');

/** Ouvre une capture ou une vidéo en grand. */
export function openLightbox(media: HTMLImageElement | HTMLVideoElement): void {
  const body = $('#lbBody');
  body.replaceChildren();
  if (media instanceof HTMLVideoElement) {
    const v = document.createElement('video');
    v.src = media.currentSrc || media.src;
    Object.assign(v, { muted: true, loop: true, autoplay: true, playsInline: true, controls: true });
    body.append(v);
    void v.play().catch(() => undefined);
  } else {
    const img = document.createElement('img');
    img.src = media.src;
    img.alt = media.alt;
    body.append(img);
  }
  lb().classList.add('on');
  $<HTMLButtonElement>('.close', lb()).focus();
}

function closeAll(): void {
  lb().classList.remove('on');
  $('#lbBody').replaceChildren();
  $('#cvModal').classList.remove('on');
}

/** Boutons « Voir mon CV » (aperçu Google Drive intégré) et « Télécharger ». */
export function initModals(): void {
  $$<HTMLAnchorElement>('[data-cv-download]').forEach((a) => {
    a.href = CV.downloadUrl;
    a.target = '_blank';
    a.rel = 'noopener';
  });
  const cvModal = $('#cvModal');
  const frame = $<HTMLIFrameElement>('#cvFrame');
  $$('[data-cv-open]').forEach((b) => b.addEventListener('click', () => {
    if (!frame.src) frame.src = CV.previewUrl;
    cvModal.classList.add('on');
    $<HTMLButtonElement>('.close-cv', cvModal).focus();
  }));
  $('.close-cv', cvModal).addEventListener('click', closeAll);
  cvModal.addEventListener('click', (e) => { if (e.target === cvModal) closeAll(); });
  lb().addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    if (t === lb() || t.classList.contains('close')) closeAll();
  });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });
}
