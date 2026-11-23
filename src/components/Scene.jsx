import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Rede de partículas 3D que muda de forma conforme a seção visível.
const SECTIONS = ['topo', 'experiencia', 'projeto', 'habilidades', 'contato'];

function buildShapes(N) {
  const sphere = new Float32Array(N * 3);
  const torus = new Float32Array(N * 3);
  const wave = new Float32Array(N * 3);
  const galaxy = new Float32Array(N * 3);
  const ring = new Float32Array(N * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const side = Math.ceil(Math.sqrt(N));

  for (let i = 0; i < N; i++) {
    const k = i * 3;
    // esfera (fibonacci)
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    sphere[k] = Math.cos(th) * r * 2.3;
    sphere[k + 1] = y * 2.3;
    sphere[k + 2] = Math.sin(th) * r * 2.3;

    // toro
    const u = (i / N) * Math.PI * 2 * 13;
    const v = (i / N) * Math.PI * 2;
    torus[k] = (2.2 + 0.75 * Math.cos(u)) * Math.cos(v);
    torus[k + 1] = 0.75 * Math.sin(u);
    torus[k + 2] = (2.2 + 0.75 * Math.cos(u)) * Math.sin(v);

    // plano em onda (animado no loop)
    const gx = (i % side) / (side - 1) - 0.5;
    const gz = Math.floor(i / side) / (side - 1) - 0.5;
    wave[k] = gx * 7;
    wave[k + 1] = 0;
    wave[k + 2] = gz * 7;

    // galáxia espiral
    const arm = i % 3;
    const t = Math.pow(Math.random(), 0.7);
    const ang = t * 6 + (arm * Math.PI * 2) / 3;
    const spread = 0.35 * (1 - t) + 0.08;
    galaxy[k] = Math.cos(ang) * t * 3.4 + (Math.random() - 0.5) * spread;
    galaxy[k + 1] = (Math.random() - 0.5) * 0.35;
    galaxy[k + 2] = Math.sin(ang) * t * 3.4 + (Math.random() - 0.5) * spread;

    // anel duplo
    const a = (i / N) * Math.PI * 2;
    const rr = i % 2 ? 2.9 : 2.2;
    ring[k] = Math.cos(a) * rr;
    ring[k + 1] = Math.sin(a * 5) * 0.25;
    ring[k + 2] = Math.sin(a) * rr;
  }
  return [sphere, torus, wave, galaxy, ring];
}

function dotTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.25, 'rgba(255,255,255,0.85)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function Scene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.innerWidth < 760;
    const N = mobile ? 260 : 480;
    const LINK = mobile ? 0.9 : 0.78;
    const MAX_LINES = N * 6;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (e) {
      return undefined; // sem WebGL: o fundo em CSS continua aparecendo
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    const group = new THREE.Group();
    scene.add(group);

    const shapes = buildShapes(N);
    const pos = new Float32Array(shapes[0]);
    // começa espalhado para a animação de entrada
    if (!reduce) for (let i = 0; i < pos.length; i++) pos[i] = (Math.random() - 0.5) * 18;

    const colors = new Float32Array(N * 3);
    const cA = new THREE.Color('#38e1ff');
    const cB = new THREE.Color('#8b5cff');
    const cC = new THREE.Color('#ff5cc8');
    for (let i = 0; i < N; i++) {
      const t = i / N;
      const col = t < 0.7 ? cA.clone().lerp(cB, t / 0.7) : cB.clone().lerp(cC, (t - 0.7) / 0.3);
      colors.set([col.r, col.g, col.b], i * 3);
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const pMat = new THREE.PointsMaterial({
      size: mobile ? 0.09 : 0.075,
      map: dotTexture(),
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(pGeo, pMat);
    group.add(points);

    const lPos = new Float32Array(MAX_LINES * 6);
    const lCol = new Float32Array(MAX_LINES * 6);
    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3));
    lGeo.setAttribute('color', new THREE.BufferAttribute(lCol, 3));
    const lMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lGeo, lMat);
    group.add(lines);

    // estado
    let target = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const offsets = mobile
      ? [[0, 1.2], [0, 0], [0, -0.4], [0, 0], [0, 0]]
      : [[2.6, 0], [-2.4, 0], [2.6, -0.6], [-2.2, 0], [0, 0]];
    const tilts = [0.25, 0.55, 0.42, 0.7, 0.2];

    function pickSection() {
      const mid = window.innerHeight * 0.45;
      let best = 0;
      SECTIONS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= mid) best = i;
      });
      target = best;
    }
    pickSection();

    const onScroll = () => pickSection();
    const onMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('resize', onResize);

    let frame = 0;
    let raf;
    const clock = new THREE.Clock();

    function updateLines() {
      let n = 0;
      const L2 = LINK * LINK;
      for (let i = 0; i < N && n < MAX_LINES; i++) {
        const ix = i * 3;
        const ax = pos[ix], ay = pos[ix + 1], az = pos[ix + 2];
        for (let j = i + 1; j < N; j++) {
          const jx = j * 3;
          const dx = ax - pos[jx], dy = ay - pos[jx + 1], dz = az - pos[jx + 2];
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < L2) {
            const f = 1 - d2 / L2;
            const o = n * 6;
            lPos[o] = ax; lPos[o + 1] = ay; lPos[o + 2] = az;
            lPos[o + 3] = pos[jx]; lPos[o + 4] = pos[jx + 1]; lPos[o + 5] = pos[jx + 2];
            lCol[o] = colors[ix] * f; lCol[o + 1] = colors[ix + 1] * f; lCol[o + 2] = colors[ix + 2] * f;
            lCol[o + 3] = colors[jx] * f; lCol[o + 4] = colors[jx + 1] * f; lCol[o + 5] = colors[jx + 2] * f;
            n++;
            if (n >= MAX_LINES) break;
          }
        }
      }
      lGeo.setDrawRange(0, n * 2);
      lGeo.attributes.position.needsUpdate = true;
      lGeo.attributes.color.needsUpdate = true;
    }

    function tick() {
      const t = clock.getElapsedTime();
      const shape = shapes[target];
      const ease = reduce ? 1 : 0.045;
      for (let i = 0; i < N; i++) {
        const k = i * 3;
        let tx = shape[k], ty = shape[k + 1], tz = shape[k + 2];
        if (target === 2) ty = Math.sin(tx * 0.9 + t * 1.4) * 0.45 + Math.cos(tz * 1.1 + t) * 0.35;
        pos[k] += (tx - pos[k]) * ease;
        pos[k + 1] += (ty - pos[k + 1]) * ease;
        pos[k + 2] += (tz - pos[k + 2]) * ease;
      }
      pGeo.attributes.position.needsUpdate = true;
      if (frame % 2 === 0) updateLines();

      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      const [ox, oy] = offsets[target];
      group.position.x += (ox - group.position.x) * 0.04;
      group.position.y += (oy - group.position.y) * 0.04;
      group.rotation.x += (tilts[target] + mouse.y * 0.3 - group.rotation.x) * 0.04;
      if (!reduce) group.rotation.y += 0.0022;
      group.rotation.z = mouse.x * -0.12;

      renderer.render(scene, camera);
      frame++;
      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResize);
      pGeo.dispose();
      lGeo.dispose();
      pMat.dispose();
      lMat.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="scene" ref={mountRef} aria-hidden="true" />;
}
