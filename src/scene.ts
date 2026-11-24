import * as THREE from 'three';
import { reduceMotion } from './dom';

interface Card {
  group: THREE.Group;
  screen: THREE.Mesh;
  project: string;
  base: number;
  phase: number;
  scale: number;
}

/** Une vue de projet : la visite animée (vidéo) ou une capture. */
interface Screen { project: string; video?: string; image?: string }

const SCREENS: Screen[] = [
  { project: 'biblio', video: 'public/media/biblio.mp4' },
  { project: 'autoloc', video: 'public/media/autoloc.mp4' },
  { project: 'athletix', video: 'public/media/athletix.mp4' },
  { project: 'biblio', image: 'public/projets/biblio-2.jpg' },
  { project: 'autoloc', image: 'public/projets/autoloc-3.jpg' },
  { project: 'athletix', image: 'public/projets/athletix-1.jpg' },
];

function makeTexture(s: Screen, loader: THREE.TextureLoader): THREE.Texture {
  let tex: THREE.Texture;
  if (s.video) {
    const v = document.createElement('video');
    Object.assign(v, { src: s.video, muted: true, loop: true, playsInline: true, autoplay: true, crossOrigin: 'anonymous' });
    v.setAttribute('playsinline', '');
    void v.play().catch(() => undefined);
    tex = new THREE.VideoTexture(v);
  } else {
    tex = loader.load(s.image ?? '');
  }
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** Scène 3D du héros : un anneau d'écrans qui montrent les projets. */
export function initScene(host: HTMLElement, onPick: (project: string) => void): void {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    host.classList.add('noGL');
    return;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  host.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0, 12.5);
  const ring = new THREE.Group();
  scene.add(ring);

  const loader = new THREE.TextureLoader();
  const R = 3.7;
  const W = 3.5;
  const H = (W * 552) / 1280;
  const cards: Card[] = SCREENS.map((s, i) => {
    const group = new THREE.Group();
    const frame = new THREE.Mesh(
      new THREE.PlaneGeometry(W + 0.16, H + 0.42),
      new THREE.MeshBasicMaterial({ color: 0x0b0e0d, side: THREE.DoubleSide }),
    );
    frame.position.set(0, 0.13, -0.01);
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(W, H),
      new THREE.MeshBasicMaterial({ map: makeTexture(s, loader), side: THREE.DoubleSide }),
    );
    const lights = [0xff5f57, 0xfebc2e, 0x28c840].map((c, k) => {
      const d = new THREE.Mesh(new THREE.CircleGeometry(0.05, 16), new THREE.MeshBasicMaterial({ color: c }));
      d.position.set(-W / 2 + 0.15 + k * 0.15, H / 2 + 0.17, 0);
      return d;
    });
    group.add(frame, screen, ...lights);
    const a = (i / SCREENS.length) * Math.PI * 2;
    const base = i % 2 ? 0.55 : -0.55;
    group.position.set(Math.sin(a) * R, base, Math.cos(a) * R);
    group.lookAt(0, base, 0);
    group.rotateY(Math.PI);
    ring.add(group);
    return { group, screen, project: s.project, base, phase: i, scale: 1 };
  });

  // poussière d'étincelles (le phénix)
  const N = 700;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const r = 6 + Math.random() * 10;
    const t = Math.random() * Math.PI * 2;
    const p = Math.acos(2 * Math.random() - 1);
    pos.set([r * Math.sin(p) * Math.cos(t), r * Math.cos(p) * 0.6, r * Math.sin(p) * Math.sin(t)], i * 3);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffc857, size: 0.045, transparent: true, opacity: 0.8 }));
  scene.add(stars);
  const halo = new THREE.Mesh(new THREE.TorusGeometry(R + 0.2, 0.012, 8, 160), new THREE.MeshBasicMaterial({ color: 0xff6f59 }));
  halo.rotation.x = Math.PI / 2;
  halo.position.y = -1.5;
  scene.add(halo);

  const resize = (): void => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = w < 560 ? 15 : 12.5;
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(host);
  resize();

  const idle = reduceMotion ? 0 : 0.0025;
  let rotY = 0;
  let vel = idle;
  let dragging = false;
  let lastX = 0;
  let moved = 0;
  let hovered: Card | null = null;
  const pointer = new THREE.Vector2(0, 0);
  const ray = new THREE.Raycaster();
  const cv = renderer.domElement;

  const setPointer = (e: PointerEvent): void => {
    const r = cv.getBoundingClientRect();
    pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  };
  cv.addEventListener('pointerdown', (e) => { dragging = true; lastX = e.clientX; moved = 0; cv.setPointerCapture(e.pointerId); });
  cv.addEventListener('pointermove', (e) => {
    setPointer(e);
    if (!dragging) return;
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    moved += Math.abs(dx);
    rotY += dx * 0.006;
    vel = dx * 0.0008;
  });
  cv.addEventListener('pointerup', () => {
    dragging = false;
    if (moved < 6 && hovered) onPick(hovered.project);
  });
  cv.addEventListener('pointerleave', () => pointer.set(0, 0));

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(host);

  const clock = new THREE.Clock();
  const screens = cards.map((c) => c.screen);
  const loop = (): void => {
    requestAnimationFrame(loop);
    if (!visible) return;
    const t = clock.getElapsedTime();
    if (!dragging) { rotY += vel; vel += (idle - vel) * 0.02; }
    ring.rotation.y = rotY;
    ring.rotation.x += (pointer.y * 0.12 - ring.rotation.x) * 0.05;
    camera.position.x += (pointer.x * 0.8 - camera.position.x) * 0.05;
    camera.lookAt(0, 0, 0);
    stars.rotation.y = t * 0.02;

    ray.setFromCamera(pointer, camera);
    const hit = ray.intersectObjects(screens)[0];
    hovered = hit ? cards.find((c) => c.screen === hit.object) ?? null : null;
    for (const c of cards) {
      c.group.position.y = c.base + (reduceMotion ? 0 : Math.sin(t * 1.1 + c.phase) * 0.15);
      c.scale += ((c === hovered ? 1.12 : 1) - c.scale) * 0.15;
      c.group.scale.setScalar(c.scale);
    }
    cv.style.cursor = dragging ? 'grabbing' : hovered ? 'pointer' : 'grab';
    renderer.render(scene, camera);
  };
  loop();
}
