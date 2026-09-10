import { useEffect, useState } from 'react';
import './App.css';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Activities from './components/Activities';
import Featured from './components/Featured';
import Gallery from './components/Gallery';
import FotoRandom from './components/FotoRandom';
import Events from './components/Events';
import Values from './components/Values';
import Members from './components/Members';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loaded, setLoaded] = useState(false);

  // Reveal animations via IntersectionObserver
  useEffect(() => {
    if (!loaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    // Re-observe after DOM settles
    const timeout = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [loaded]);

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Activities />
        <Featured />
        <Gallery />
        <FotoRandom />
        <Members />
        <Events />
        <Values />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;

