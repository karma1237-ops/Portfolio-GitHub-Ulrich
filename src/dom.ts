export const reduceMotion: boolean = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function $<T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document): T {
  const el = root.querySelector<T>(sel);
  if (!el) throw new Error(`Élément introuvable : ${sel}`);
  return el;
}

export function $$<T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document): T[] {
  return [...root.querySelectorAll<T>(sel)];
}

const ENTITIES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s: string | number): string => String(s).replace(/[&<>"']/g, (c) => ENTITIES[c] ?? c);
