import { useEffect, useState } from 'react';
import { prefersReduced } from '../fx.jsx';

const STEPS = ['Carregando módulos', 'Conectando API', 'Renderizando interface'];

export default function Loader() {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(prefersReduced());

  useEffect(() => {
    if (gone) return undefined;
    const start = performance.now();
    const DUR = 1100;
    let raf;
    const step = (now) => {
      const p = Math.min(1, (now - start) / DUR);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(step);
      else setTimeout(() => setGone(true), 250);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [gone]);

  if (gone) return null;
  const label = STEPS[Math.min(STEPS.length - 1, Math.floor((pct / 100) * STEPS.length))];

  return (
    <div className={`loader ${pct >= 100 ? 'is-done' : ''}`} aria-hidden="true">
      <div className="loader__box">
        <span className="loader__logo">LG</span>
        <div className="loader__bar">
          <i style={{ transform: `scaleX(${pct / 100})` }} />
        </div>
        <p className="loader__text">
          <span>{label}</span>
          <span>{pct}%</span>
        </p>
      </div>
    </div>
  );
}
