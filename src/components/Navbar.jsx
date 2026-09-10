import { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '#beranda', label: 'Beranda' },
  { href: '#tentang', label: 'Tentang' },
  { href: '#kegiatan', label: 'Kegiatan' },
  { href: '#galeri', label: 'Galeri' },
  { href: '#event', label: 'Event' },
  { href: '#media-sosial', label: 'Media Sosial' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');
  const isClickingRef = useRef(false);
  const clickTimerRef = useRef(null);

  // Scroll & Active Section Spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      if (isClickingRef.current) return;

      const sectionIds = ['beranda', 'tentang', 'kegiatan', 'galeri', 'event', 'media-sosial'];

      // If near bottom of the page, highlight last section (media-sosial)
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (atBottom) {
        setActiveSection('media-sosial');
        return;
      }

      // Determine active section based on viewport top offset
      const triggerPoint = 140;
      let current = 'beranda';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerPoint) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleScroll);
    };
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    isClickingRef.current = true;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      isClickingRef.current = false;
    }, 850);
  };

  const handleLinkClick = (sectionId) => {
    handleNavClick(sectionId);
    setMobileOpen(false);
    document.body.style.overflow = '';
  };

  const toggleMobileMenu = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        {/* Logo */}
        <a
          href="#beranda"
          className={styles.logo}
          onClick={() => {
            handleNavClick('beranda');
            setMobileOpen(false);
          }}
        >
          <span className={styles.logoText}>
            Zero<span className={styles.logoAccent}>Five</span>
          </span>
        </a>

        <ul className={styles.links}>
          {navLinks.map((link) => {
            const sectionId = link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={activeSection === sectionId ? styles.active : ''}
                  onClick={() => handleNavClick(sectionId)}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          className={styles.menuToggle}
          aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={mobileOpen}
          onClick={toggleMobileMenu}
        >
          <i className={mobileOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
        <button
          className={styles.mobileClose}
          aria-label="Tutup menu"
          onClick={() => setMobileOpen(false)}
        >
          <i className="fas fa-times" />
        </button>
        {navLinks.map((link) => {
          const sectionId = link.href.slice(1);
          return (
            <a
              key={link.href}
              href={link.href}
              className={activeSection === sectionId ? styles.activeMobile : ''}
              onClick={() => handleLinkClick(sectionId)}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </>
  );
}
