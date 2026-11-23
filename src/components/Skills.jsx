import { skills, languages } from '../data.js';
import { Scramble, Tilt } from '../fx.jsx';

const ALL = skills.flatMap((g) => g.items);

export default function Skills() {
  return (
    <section className="section" id="habilidades" aria-labelledby="skills-title">
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...ALL, ...ALL].map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
      </div>

      <div className="wrap">
        <header className="section__head" data-reveal>
          <p className="kicker">Stack</p>
          <Scramble as="h2" text="Habilidades" className="section__title" />
          <p className="section__lead">As ferramentas que uso no dia a dia, do banco de dados até a tela.</p>
        </header>

        <div className="skills">
          {skills.map((g, i) => (
            <Tilt className="skill" key={g.group} data-reveal style={{ '--d': `${i * 80}ms` }}>
              <p className="skill__count">{String(g.items.length).padStart(2, '0')} tecnologias</p>
              <h3>{g.group}</h3>
              <ul>
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Tilt>
          ))}

          {languages.map((l) => (
            <Tilt className="skill skill--wide" key={l.name} data-reveal>
              <p className="skill__count">Idioma</p>
              <h3>{l.name}</h3>
              <div className="lang">
                <span className="lang__meter" role="img" aria-label={`Nível ${l.level} de ${l.max}`}>
                  {Array.from({ length: l.max }, (_, i) => (
                    <i key={i} className={i < l.level ? 'on' : ''} />
                  ))}
                </span>
                <p>{l.label}</p>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
