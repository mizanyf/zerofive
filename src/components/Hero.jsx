import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        bgRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="beranda" className={styles.hero}>
      {/* ==================================================================== */}
      {/* 🖼️ FOTO BACKGROUND HERO / BANNER UTAMA */}
      {/* 📁 Lokasi file: public/images/hero/ atau public/images/about/ */}
      {/* ⬇️ GANTI url di bawah ini dengan path foto Anda: */}
      {/* Contoh: backgroundImage: "url('/images/hero/foto-utama.jpg')" */}
      {/* ==================================================================== */}
      <div
        ref={bgRef}
        className={styles.bg}
        style={{ backgroundImage: "url('/images/about/fixawal.webp')" }}
      />
      <div className={styles.overlay} />

      <div className={`${styles.content} container`}>
        <div className={styles.kickerWrap}>
          <span className={styles.badgeKicker}>
            <i className="fas fa-users" /> Karang Taruna RT 05 RW 03
          </span>
        </div>

        <h1 className={styles.headline}>
          <span className={styles.headlineTop}>Bersama, Berkarya,</span>
          <span className={styles.headlineKeyword}>Berdampak.</span>
        </h1>

        <p className={styles.description}>
          Wadah Kolaborasi Muda-Mudi RT 05 RW 03 Mulyorejo
        </p>

        <div className={styles.cta}>
          <a href="#kegiatan" className="btn btn-primary">
            Lihat Kegiatan <i className="fas fa-arrow-right" />
          </a>
          <a href="#tentang" className={`btn ${styles.btnSecondaryGlass}`}>
            Tentang Kami
          </a>
        </div>
      </div>
    </section>
  );
}
