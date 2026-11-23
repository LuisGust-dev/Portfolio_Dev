import { useEffect, useState } from 'react';
import { profile } from '../data.js';

const LINKS = [
  ['#experiencia', 'Experiência'],
  ['#projeto', 'Projeto'],
  ['#habilidades', 'Habilidades'],
  ['#contato', 'Contato'],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav__pill">
        <a href="#topo" className="nav__brand" aria-label="Início">
          <span className="nav__mark">LG</span>
          <span className="nav__name">{profile.name}</span>
        </a>

        <nav className={`nav__links ${open ? 'is-open' : ''}`} aria-label="Seções">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <a className="btn btn--glow btn--sm nav__cta" href={profile.whatsapp} target="_blank" rel="noreferrer">
          Contratar
        </a>

        <button
          className="nav__menu"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 8h16M4 16h16'}
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
