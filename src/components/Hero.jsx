import { useEffect, useState } from 'react';
import { profile } from '../data.js';
import { Tilt, prefersReduced } from '../fx.jsx';

// Resposta JSON "digitada" no terminal
const TOKENS = [
  ['{', 'p'], ['\n  ', ''],
  ['"nome"', 'k'], [': ', 'p'], ['"Luis Gustavo"', 's'], [',\n  ', 'p'],
  ['"cargo"', 'k'], [': ', 'p'], ['"Full Stack Developer"', 's'], [',\n  ', 'p'],
  ['"stack"', 'k'], [': ', 'p'], ['[', 'p'], ['"PHP"', 's'], [', ', 'p'], ['"Laravel"', 's'], [', ', 'p'], ['"MySQL"', 's'], ['],\n  ', 'p'],
  ['"foco"', 'k'], [': ', 'p'], ['"sistemas administrativos"', 's'], [',\n  ', 'p'],
  ['"regiao"', 'k'], [': ', 'p'], ['"Bahia, BR"', 's'], [',\n  ', 'p'],
  ['"disponivel"', 'k'], [': ', 'p'], ['true', 'b'], ['\n', ''],
  ['}', 'p'],
];
const TOTAL = TOKENS.reduce((n, [t]) => n + t.length, 0);

function Terminal() {
  const reduce = prefersReduced();
  const [n, setN] = useState(reduce ? TOTAL : 0);

  useEffect(() => {
    if (reduce) return undefined;
    let i = 0;
    let iv;
    const start = setTimeout(() => {
      iv = setInterval(() => {
        i += 2;
        setN(Math.min(TOTAL, i));
        if (i >= TOTAL) clearInterval(iv);
      }, 22);
    }, 1700);
    return () => {
      clearTimeout(start);
      clearInterval(iv);
    };
  }, [reduce]);

  let left = n;
  const done = n >= TOTAL;

  return (
    <Tilt className="term" max={6}>
      <div className="term__bar">
        <span className="term__dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="term__req">
          <b>GET</b> /api/devs/luis-gustavo
        </span>
        <span className={`term__status ${done ? 'is-ok' : ''}`}>{done ? '200 OK' : '...'}</span>
      </div>
      <pre className="term__body" aria-label="Resposta da API com o perfil de Luis Gustavo">
        <code aria-hidden="true">
          {TOKENS.map(([t, c], idx) => {
            if (left <= 0) return null;
            const part = t.slice(0, left);
            left -= t.length;
            return (
              <span key={idx} className={c ? `t-${c}` : undefined}>
                {part}
              </span>
            );
          })}
          <span className="term__caret" />
        </code>
      </pre>
      <div className="term__foot">
        <span>application/json</span>
        <span>{done ? '38 ms' : 'carregando'}</span>
      </div>
    </Tilt>
  );
}

function Rotator({ words }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (prefersReduced()) return undefined;
    const iv = setInterval(() => setI((x) => (x + 1) % words.length), 2600);
    return () => clearInterval(iv);
  }, [words.length]);
  return (
    <span className="rotator" aria-live="off">
      <span key={i} className="rotator__word">
        {words[i]}
      </span>
    </span>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="topo">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="status">
            <span className="status__dot" aria-hidden="true" />
            Disponível para novas oportunidades
          </p>

          <h1 className="hero__name">
            <span>Luis</span>
            <span className="grad">Gustavo</span>
          </h1>

          <p className="hero__role">
            Desenvolvedor Full Stack que constrói <Rotator words={profile.rotating} />
          </p>

          <p className="hero__summary">{profile.summary}</p>

          <div className="hero__cta">
            <a className="btn btn--glow" href={profile.whatsapp} target="_blank" rel="noreferrer">
              Conversar no WhatsApp
            </a>
            <a className="btn btn--line" href="#projeto">
              Ver projeto
            </a>
            {profile.cvUrl && (
              <a className="btn btn--line" href={profile.cvUrl} download>
                Baixar currículo
              </a>
            )}
          </div>

          <ul className="hero__stats">
            {profile.stats.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <Terminal />
      </div>

      <a href="#experiencia" className="scroll-hint" aria-label="Rolar para a experiência">
        <span />
      </a>
    </section>
  );
}
