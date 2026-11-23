import { Suspense, lazy, useEffect, useState } from 'react';
const Scene = lazy(() => import('./components/Scene.jsx'));
import Loader from './components/Loader.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Experience from './components/Experience.jsx';
import Project from './components/Project.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import { useReveal } from './fx.jsx';

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return <div className="progress" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />;
}

function CursorGlow() {
  useEffect(() => {
    const el = document.querySelector('.cursor-glow');
    const on = (e) => {
      if (e.pointerType !== 'mouse') return;
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      el.style.opacity = '1';
    };
    window.addEventListener('pointermove', on, { passive: true });
    return () => window.removeEventListener('pointermove', on);
  }, []);
  return <div className="cursor-glow" aria-hidden="true" />;
}

export default function App() {
  useReveal();
  return (
    <>
      <Loader />
      <div className="backdrop" aria-hidden="true" />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <CursorGlow />
      <ScrollProgress />
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <Nav />
      <main id="conteudo">
        <Hero />
        <Experience />
        <Project />
        <Skills />
      </main>
      <Contact />
    </>
  );
}
