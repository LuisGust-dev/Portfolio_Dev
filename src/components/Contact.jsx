import { useState } from 'react';
import { profile } from '../data.js';
import { Scramble, Tilt } from '../fx.jsx';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (e) {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  const items = [
    { label: 'WhatsApp', value: profile.phoneDisplay, href: profile.whatsapp, ext: true },
    { label: 'LinkedIn', value: profile.linkedinLabel, href: profile.linkedin, ext: true },
    { label: 'GitHub', value: profile.githubLabel, href: profile.github, ext: true },
  ];

  return (
    <footer className="section contact" id="contato" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="contact__hero" data-reveal>
          <p className="kicker">Contato</p>
          <Scramble as="h2" text="Vamos construir algo juntos?" className="contact__title" />
          <p className="section__lead">
            Tem uma vaga ou um sistema para tirar do papel? Respondo rápido pelo WhatsApp e pelo e-mail.
          </p>
          <div className="hero__cta">
            <a className="btn btn--glow btn--lg" href={profile.whatsapp} target="_blank" rel="noreferrer">
              Conversar no WhatsApp
            </a>
            <button className="btn btn--line btn--lg" onClick={copyEmail}>
              {copied ? 'E-mail copiado' : 'Copiar e-mail'}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? 'E-mail copiado para a área de transferência' : ''}
            </span>
          </div>
        </div>

        <div className="contact__grid">
          <Tilt as="a" className="contact__item" href={`mailto:${profile.email}`} max={5} data-reveal>
            <span className="contact__label">E-mail</span>
            <span className="contact__value">{profile.email}</span>
          </Tilt>
          {items.map((it) => (
            <Tilt
              as="a"
              key={it.label}
              className="contact__item"
              href={it.href}
              target="_blank"
              rel="noreferrer"
              max={5}
              data-reveal
            >
              <span className="contact__label">{it.label}</span>
              <span className="contact__value">{it.value}</span>
            </Tilt>
          ))}
        </div>

        <div className="contact__bottom">
          <p>
            © {new Date().getFullYear()} {profile.name}. Feito com React e Three.js.
          </p>
          <a href="#topo">Voltar ao topo</a>
        </div>
      </div>
    </footer>
  );
}
