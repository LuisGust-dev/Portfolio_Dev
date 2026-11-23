import { useEffect, useRef, useState } from 'react';

export const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Chama cb uma vez quando el entra na tela (IntersectionObserver + verificação por rolagem). */
export function onVisible(el, cb, ratio = 0.85) {
  let done = false;
  const fire = () => {
    if (done) return;
    done = true;
    cleanup();
    cb();
  };
  const check = () => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * ratio && r.bottom > 0) fire();
  };
  let io;
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver((es) => es.some((e) => e.isIntersecting) && fire(), { threshold: 0.1 });
    io.observe(el);
  }
  window.addEventListener('scroll', check, { passive: true });
  const t = setTimeout(check, 50);
  function cleanup() {
    io && io.disconnect();
    window.removeEventListener('scroll', check);
    clearTimeout(t);
  }
  return cleanup;
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]#$%&*+=';

/** Texto que se "decodifica" quando entra na tela. */
export function Scramble({ text, as: Tag = 'span', className, delay = 0 }) {
  const ref = useRef(null);
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (prefersReduced()) return undefined;
    const el = ref.current;
    let raf;
    let started = false;
    setOut(text.replace(/\S/g, ' '));
    const run = () => {
      const start = performance.now() + delay;
      const dur = Math.min(1100, 380 + text.length * 32);
      const step = (now) => {
        const p = Math.max(0, Math.min(1, (now - start) / dur));
        const solved = Math.floor(p * text.length);
        let s = '';
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (i < solved || ch === ' ') s += ch;
          else if (p > 0) s += GLYPHS[(Math.random() * GLYPHS.length) | 0];
          else s += ' ';
        }
        setOut(s);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const stop = onVisible(el, run, 0.8);
    return () => {
      stop();
      cancelAnimationFrame(raf);
    };
  }, [text, delay]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </Tag>
  );
}

/** Painel de vidro que inclina em 3D e tem um brilho que segue o mouse. */
export function Tilt({ as: Tag = 'div', className = '', max = 7, children, ...rest }) {
  const ref = useRef(null);

  function onMove(e) {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);
    if (prefersReduced() || e.pointerType !== 'mouse') return;
    el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg)`;
  }
  function onLeave() {
    ref.current.style.transform = '';
  }

  return (
    <Tag ref={ref} className={`glass tilt ${className}`} onPointerMove={onMove} onPointerLeave={onLeave} {...rest}>
      {children}
    </Tag>
  );
}

/** Adiciona .is-in nos elementos [data-reveal] quando entram na tela. */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    if (prefersReduced()) {
      els.forEach((el) => el.classList.add('is-in'));
      return undefined;
    }
    const stops = [...els].map((el) => onVisible(el, () => el.classList.add('is-in'), 0.92));
    return () => stops.forEach((f) => f());
  }, []);
}
