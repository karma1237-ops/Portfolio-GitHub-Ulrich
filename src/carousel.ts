import { $, $$, esc, reduceMotion } from './dom';
import type { Project } from './data';
import { openLightbox } from './modals';

const BAR = (url: string): string =>
  `<div class="bar"><i></i><i></i><i></i><span>${esc(url)}</span></div>`;

function projectHtml(p: Project): string {
  const tour = `<div class="slide"><div class="frame">${BAR(p.tourUrl)}
      <video muted loop playsinline preload="none" poster="public/media/${p.id}-poster.jpg" aria-label="Visite animée de ${esc(p.name)}">
        <source src="public/media/${p.id}.mp4" type="video/mp4">
        <img src="public/media/${p.id}.gif" alt="Visite animée de ${esc(p.name)}">
      </video><span class="live-tag">▶ Visite animée</span></div>
      <p class="cap">Visite de l'application</p></div>`;
  const shots = p.shots.map((s) => `<div class="slide"><div class="frame">${BAR(s.url)}
      <img loading="lazy" src="public/projets/${s.img}.jpg" alt="${esc(p.name)} – ${esc(s.caption)}"></div>
      <p class="cap">${esc(s.caption)}</p></div>`).join('');
  const count = p.shots.length + 1;
  return `
<article class="proj rv" id="p-${p.id}">
  <div class="info">
    <span class="state ${p.live ? 'live' : ''}"><i></i>${esc(p.status)}</span>
    <h3 style="font-size:clamp(28px,3vw,38px)">${esc(p.name)}</h3>
    <p class="lede">${esc(p.description)}</p>
    <div class="tagline">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
    <ul class="feat">${p.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
    <div class="cta">
      ${p.liveUrl ? `<a class="btn p" href="${esc(p.liveUrl)}" target="_blank" rel="noopener">Voir le site →</a>` : ''}
      <a class="btn o" href="${esc(p.codeUrl)}" target="_blank" rel="noopener">Code sur GitHub</a>
    </div>
  </div>
  <div class="car" data-car>
    <div class="track" tabindex="0" aria-label="Vues de ${esc(p.name)}">${tour}${shots}</div>
    <div class="ctrl"><button data-prev aria-label="Vue précédente">←</button>
      <div class="dots">${Array.from({ length: count }, (_, i) => `<button aria-label="Vue ${i + 1}" data-i="${i}"></button>`).join('')}</div>
      <button data-next aria-label="Vue suivante">→</button></div>
  </div>
</article>`;
}

/** Carrousel 3D façon « coverflow » sur un défileur natif (scroll-snap). */
class Carousel {
  private cur = 0;
  private timer: number | undefined;
  private readonly track: HTMLElement;
  private readonly slides: HTMLElement[];
  private readonly dots: HTMLButtonElement[];
  private readonly video: HTMLVideoElement | null;

  constructor(private readonly root: HTMLElement) {
    this.track = $('.track', root);
    this.slides = $$('.slide', root);
    this.dots = $$<HTMLButtonElement>('.dots button', root);
    this.video = root.querySelector('video');
    this.bind();
    this.paint();
  }

  private go(i: number, user = true): void {
    const n = this.slides.length;
    this.cur = ((i % n) + n) % n;
    const s = this.slides[this.cur];
    this.track.scrollTo({ left: s.offsetLeft - (this.track.clientWidth - s.offsetWidth) / 2, behavior: reduceMotion ? 'auto' : 'smooth' });
    if (user) this.stop();
  }

  private readonly paint = (): void => {
    const mid = this.track.scrollLeft + this.track.clientWidth / 2;
    let best = 0;
    let bestD = Infinity;
    this.slides.forEach((s, i) => {
      const o = (s.offsetLeft + s.offsetWidth / 2 - mid) / s.offsetWidth;
      const a = Math.min(Math.abs(o), 1.4);
      if (Math.abs(o) < bestD) { bestD = Math.abs(o); best = i; }
      const frame = s.firstElementChild as HTMLElement;
      frame.style.transform = reduceMotion ? '' : `rotateY(${-o * 38}deg) translateZ(${-a * 160}px) scale(${1 - a * 0.08})`;
      s.style.opacity = String(1 - a * 0.45);
    });
    this.cur = best;
    this.dots.forEach((d, i) => d.classList.toggle('on', i === best));
    // la visite animée ne joue que lorsqu'elle est au centre
    if (this.video) {
      if (best === 0 && this.visible) void this.video.play().catch(() => undefined);
      else this.video.pause();
    }
  };

  private visible = false;

  /** Avance automatique : on laisse la vidéo se terminer avant de passer à la suite. */
  private start(): void {
    if (reduceMotion || this.timer !== undefined) return;
    this.timer = window.setInterval(() => {
      if (this.cur === 0 && this.video && !this.video.paused && this.video.currentTime < this.video.duration - 0.5) return;
      this.go(this.cur + 1, false);
    }, 4200);
  }

  private stop(): void {
    window.clearInterval(this.timer);
    this.timer = undefined;
  }

  private bind(): void {
    this.track.addEventListener('scroll', () => requestAnimationFrame(this.paint), { passive: true });
    $('[data-prev]', this.root).addEventListener('click', () => this.go(this.cur - 1));
    $('[data-next]', this.root).addEventListener('click', () => this.go(this.cur + 1));
    this.dots.forEach((d) => d.addEventListener('click', () => this.go(Number(d.dataset.i))));
    this.track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); this.go(this.cur + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); this.go(this.cur - 1); }
    });
    this.root.addEventListener('mouseenter', () => this.stop());
    this.root.addEventListener('mouseleave', () => this.start());
    this.root.addEventListener('touchstart', () => this.stop(), { passive: true });
    const io = new IntersectionObserver(([e]) => {
      this.visible = e.isIntersecting;
      if (this.visible) { this.video?.setAttribute('preload', 'auto'); this.start(); } else this.stop();
      this.paint();
    }, { threshold: 0.35 });
    io.observe(this.root);
    this.slides.forEach((s) => {
      const media = s.querySelector<HTMLImageElement | HTMLVideoElement>('video, img');
      const frame = s.querySelector('.frame');
      if (media && frame) frame.addEventListener('click', () => openLightbox(media));
    });
    new ResizeObserver(this.paint).observe(this.track);
  }
}

export function renderProjects(projects: Project[]): void {
  $('#projList').innerHTML = projects.map(projectHtml).join('');
  $$('[data-car]').forEach((el) => new Carousel(el));
}
