import { $ } from './dom';

type Theme = 'light' | 'dark';

const MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
const SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8"/></svg>';

function current(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === 'light' || set === 'dark') return set;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function paint(btn: HTMLButtonElement, theme: Theme): void {
  btn.innerHTML = theme === 'dark' ? SUN : MOON;
  btn.setAttribute('aria-label', theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre');
  btn.title = btn.getAttribute('aria-label') ?? '';
}

/** Bouton clair / sombre ; le choix est mémorisé dans le navigateur. */
export function initTheme(): void {
  const btn = $<HTMLButtonElement>('#themeBtn');
  paint(btn, current());
  btn.addEventListener('click', () => {
    const next: Theme = current() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch { /* stockage indisponible */ }
    paint(btn, next);
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => paint(btn, current()));
}
