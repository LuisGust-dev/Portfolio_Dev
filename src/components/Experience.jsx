import { useEffect, useRef } from 'react';
import { experiences } from '../data.js';
import { Scramble, Tilt } from '../fx.jsx';

export default function Experience() {
  const lineRef = useRef(null);
  const listRef = useRef(null);

  // linha de luz que "acende" conforme a rolagem
  useEffect(() => {
    const on = () => {
      const r = listRef.current.getBoundingClientRect();
      const p = (window.innerHeight * 0.6 - r.top) / r.height;
      lineRef.current.style.transform = `scaleY(${Math.max(0, Math.min(1, p))})`;
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <section className="section" id="experiencia" aria-labelledby="exp-title">
      <div className="wrap">
        <header className="section__head" data-reveal>
          <p className="kicker">Trajetória</p>
          <Scramble as="h2" text="Experiência" className="section__title" />
          <p className="section__lead">
            Do batalhão da Polícia Militar a sistemas municipais: sempre perto de quem usa o sistema todos os
            dias.
          </p>
        </header>

        <ol className="timeline" ref={listRef}>
          <span className="timeline__track" aria-hidden="true">
            <span ref={lineRef} className="timeline__fill" />
          </span>
          {experiences.map((e) => (
            <li className="timeline__item" key={e.company} data-reveal>
              <span className="timeline__node" aria-hidden="true" />
              <Tilt className="xp" max={4}>
                <div className="xp__top">
                  <div>
                    <h3>{e.role}</h3>
                    <p className="xp__company">{e.company}</p>
                  </div>
                  <p className="xp__when">
                    <time>{e.period}</time>
                    {e.mode && <span>{e.mode}</span>}
                  </p>
                </div>
                <ul className="xp__points">
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <ul className="chips" aria-label="Tecnologias usadas">
                  {e.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </Tilt>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
