import { useEffect, useRef } from 'react';
import styles from './About.module.css';

const stats = [
  { target: 5, label: 'RT 05', symbol: null },
  { target: 3, label: 'RW 03', symbol: null },
  { target: null, label: 'Semangat Berkarya', symbol: '∞' },
  { target: 100, label: 'Untuk Lingkungan', symbol: null, suffix: '%' },
];

function useCounterAnimation(containerRef) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            const suffix = el.dataset.suffix || '';
            if (isNaN(target)) return;
            observer.unobserve(el);

            const duration = 1800;
            const startTime = performance.now();
            const update = (now) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const value = Math.floor(target * eased);
              el.textContent = value + suffix;
              if (progress < 1) requestAnimationFrame(update);
              else el.textContent = target + suffix;
            };
            requestAnimationFrame(update);
          }
        });
      },
      { threshold: 0.5 }
    );

    const container = containerRef.current;
    if (container) {
      container.querySelectorAll('[data-target]').forEach((el) => observer.observe(el));
    }
    return () => observer.disconnect();
  }, [containerRef]);
}

export default function About() {
  const statsRef = useRef(null);
  useCounterAnimation(statsRef);

  return (
    <section id="tentang" className={styles.about}>
      <div className="container">
        <div className={styles.grid}>
          <div className={`${styles.text} reveal`}>
            <span className="section-kicker">Tentang Kami</span>
            <h2 className="section-title">
              Tentang
              <br />
              ZeroFive
            </h2>
            <p>
              ZeroFive adalah wadah bagi muda-mudi RT 05 RW 03 Kelurahan Mulyorejo untuk berkumpul,
              berkarya, berkontribusi, dan membangun lingkungan bersama.
            </p>
            <p>
              Kami percaya bahwa lingkungan yang kuat tumbuh dari kebersamaan. Setiap kegiatan,
              setiap pertemuan, dan setiap aksi kecil menjadi bagian dari cerita besar yang kami
              tulis bersama.
            </p>
            <p>
              Dari gotong royong hingga event kreatif, dari olahraga hingga kegiatan sosial —
              semuanya dijalankan dengan semangat muda yang ingin berdampak nyata.
            </p>
          </div>

          <div className={`${styles.imageWrap} reveal reveal-delay-1`}>
            {/* ================================================================ */}
            {/* 🖼️ FOTO PROFIL / TENTANG KAMI */}
            {/* 📁 Lokasi file: public/images/about/ */}
            {/* ⬇️ GANTI 'src' di bawah ini dengan foto Anda: */}
            {/* Contoh: src="/images/about/tentang-zerofive.jpg" */}
            {/* ================================================================ */}
            <img
              src="/images/about/tosa.webp"
              alt="Komunitas ZeroFive"
              loading="lazy"
            />
            <div className={styles.badge}>
              <i className="fas fa-users" />
              Muda-Mudi RT 05 RW 03
            </div>
          </div>
        </div>

        <div className={`${styles.statsGrid} reveal`} ref={statsRef}>
          {stats.map((stat, i) => (
            <div className={styles.statItem} key={i}>
              <div
                className={styles.statNumber}
                data-target={stat.target ?? undefined}
                data-suffix={stat.suffix ?? undefined}
              >
                {stat.symbol ?? 0}
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
