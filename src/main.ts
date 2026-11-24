import { $, $$, esc, reduceMotion } from './dom';
import { EXPERTISE, PROJECTS, SKILLS } from './data';
import { renderProjects } from './carousel';
import { initModals } from './modals';
import { initScene } from './scene';
import { initTheme } from './theme';

function renderExpertise(): void {
  $('#expGrid').innerHTML = EXPERTISE.map(([ic, title, text]) =>
    `<div class="tilt rv"><div class="ic">${esc(ic)}</div><h3>${esc(title)}</h3><p>${esc(text)}</p></div>`).join('');
  if (reduceMotion || !matchMedia('(hover: hover)').matches) return;
  $$('.tilt, .tiltable').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(800px) rotateX(${-y * 12}deg) rotateY(${x * 14}deg) translateZ(6px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

function renderSkills(): void {
  const box = $('#skills');
  box.innerHTML = SKILLS.map(([name, pct]) =>
    `<div class="sk">${esc(name)}<em>${pct} %</em><span><i data-w="${pct}"></i></span></div>`).join('');
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    $$<HTMLElement>('i[data-w]', box).forEach((i) => { i.style.width = `${i.dataset.w}%`; });
    io.disconnect();
  }, { threshold: 0.2 });
  io.observe(box);
}

function animateReveal(): void {
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    io.unobserve(e.target);
  }), { threshold: 0.12 });
  $$('.rv').forEach((el) => io.observe(el));
}

function animateCounters(): void {
  $$('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const text = el.firstChild;
    if (!text) return;
    if (reduceMotion) { text.nodeValue = `${target}+`; return; }
    let k = 0;
    const step = (): void => {
      k++;
      text.nodeValue = `${Math.round(target * Math.min(k / 40, 1))}${k >= 40 ? '+' : ''}`;
      if (k < 40) requestAnimationFrame(step);
    };
    setTimeout(step, 500);
  });
}

function initContactForm(): void {
  $<HTMLFormElement>('#form').addEventListener('submit', (e) => {
    e.preventDefault();
    const v = (id: string): string => $<HTMLInputElement>(`#${id}`).value.trim();
    const body = `${v('f-msg')}\n\n${v('f-name')} – ${v('f-mail')}`;
    location.href = `mailto:ulrichdalkin@gmail.com?subject=${encodeURIComponent(v('f-subj'))}&body=${encodeURIComponent(body)}`;
    $('#f-out').textContent = "Votre messagerie va s'ouvrir avec le message prêt. Sinon, écrivez directement à ulrichdalkin@gmail.com.";
  });
}

function initNav(): void {
  const nav = $('#nav');
  const onScroll = (): void => { nav.classList.toggle('solid', scrollY > 40); };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

initTheme();
initNav();
initModals();
renderProjects(PROJECTS);
renderExpertise();
renderSkills();
animateReveal();
animateCounters();
initContactForm();
initScene($('#scene'), (id) => {
  $(`#p-${id}`).scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
});
