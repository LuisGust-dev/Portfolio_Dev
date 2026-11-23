import { useState } from 'react';
import { project } from '../data.js';
import { Scramble } from '../fx.jsx';

function Mockup() {
  const [active, setActive] = useState(project.views[0].id);
  const view = project.views.find((v) => v.id === active);

  return (
    <figure className="mock">
      <div className="mock__frame">
        <div className="mock__bar" aria-hidden="true">
          <span className="term__dots"><i /><i /><i /></span>
          <p>estagfy.app/painel/{view.id}</p>
        </div>

        <div className="mock__app">
          <div className="mock__tabs" role="tablist" aria-label="Escolha um perfil para ver o painel">
            {project.views.map((v) => (
              <button
                key={v.id}
                role="tab"
                id={`tab-${v.id}`}
                aria-selected={active === v.id}
                aria-controls="mock-panel"
                className={active === v.id ? 'is-active' : ''}
                onClick={() => setActive(v.id)}
              >
                {v.label}
              </button>
            ))}
          </div>

          <div className="mock__panel" id="mock-panel" role="tabpanel" aria-labelledby={`tab-${view.id}`} key={view.id}>
            <p className="mock__heading">{view.title}</p>
            <ul className="mock__rows">
              {view.rows.map((r, i) => (
                <li key={r.a} style={{ animationDelay: `${i * 70}ms` }}>
                  <span>{r.a}</span>
                  <span className={`pill pill--${r.tone}`}>{r.b}</span>
                </li>
              ))}
            </ul>
            <p className="mock__note">
              <span className="status__dot" aria-hidden="true" />
              {view.note}
            </p>
          </div>
        </div>
      </div>
      <figcaption>Ilustração do painel: clique nos perfis para ver o que cada um acessa.</figcaption>
    </figure>
  );
}

export default function Project() {
  return (
    <section className="section" id="projeto" aria-labelledby="proj-title">
      <div className="wrap">
        <div className="project glow-border" data-reveal>
          <div className="project__copy">
            <p className="kicker">Projeto em destaque, {project.context}</p>
            <Scramble as="h2" text={project.name} className="project__name grad" />
            <p className="project__tagline">{project.tagline}</p>
            <p className="project__desc">{project.description}</p>

            <dl className="project__facts">
              <div>
                <dt>Perfis</dt>
                <dd>Aluno, empresa, coordenação e admin</dd>
              </div>
              <div>
                <dt>Módulos</dt>
                <dd>Vagas, candidaturas, notificações, chat, calendário e painel</dd>
              </div>
              <div>
                <dt>Deploy</dt>
                <dd>Railway</dd>
              </div>
            </dl>

            <ul className="chips" aria-label="Tecnologias do projeto">
              {project.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>

            <a className="btn btn--glow" href={project.link} target="_blank" rel="noreferrer">
              {project.linkLabel}
            </a>
          </div>
          <Mockup />
        </div>
      </div>
    </section>
  );
}
