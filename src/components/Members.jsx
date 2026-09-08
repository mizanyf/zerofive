import { useRef, useEffect } from 'react';
import styles from './Members.module.css';

// ==============================================================================
// 📋 DAFTAR ANGGOTA MUDA-MUDI (src/components/Members.jsx)
// ==============================================================================
// 📌 CARA MENGGANTI NAMA & FOTO ANGGOTA:
// 1. Masukkan foto anggota ke folder:
//    👉 public/images/members/ (atau public/images/about/)
// 2. Ganti nilai 'name' dengan nama anggota, dan 'photo' dengan path foto:
//    Contoh: { id: 1, name: 'Budi Santoso', photo: '/images/members/budi.jpg' }
// 3. Jika belum punya foto anggota, biarkan bernilai `photo: null` (ikon otomatis muncul).
// ==============================================================================

const MEMBERS = [
  // ⬇️ GANTI NAMA & FOTO ANGGOTA DI BAWAH:
  { id: 1,  name: 'Anggota 1',  photo: null }, // Contoh: photo: '/images/members/1.jpg'
  { id: 2,  name: 'Anggota 2',  photo: null },
  { id: 3,  name: 'Anggota 3',  photo: null },
  { id: 4,  name: 'Anggota 4',  photo: null },
  { id: 5,  name: 'Anggota 5',  photo: null },
  { id: 6,  name: 'Anggota 6',  photo: null },
  { id: 7,  name: 'Anggota 7',  photo: null },
  { id: 8,  name: 'Anggota 8',  photo: null },
  { id: 9,  name: 'Anggota 9',  photo: null },
  { id: 10, name: 'Anggota 10', photo: null },
  { id: 11, name: 'Anggota 11', photo: null },
  { id: 12, name: 'Anggota 12', photo: null },
  { id: 13, name: 'Anggota 13', photo: null },
  { id: 14, name: 'Anggota 14', photo: null },
  { id: 15, name: 'Anggota 15', photo: null },
  { id: 16, name: 'Anggota 16', photo: null },
  { id: 17, name: 'Anggota 17', photo: null },
];

// Duplikat untuk seamless loop
const DOUBLED = [...MEMBERS, ...MEMBERS];

export default function Members() {
  const trackRef = useRef(null);
  const isPaused = useRef(false);

  // Manual drag override
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const onMouseDown = (e) => {
    isDragging.current = true;
    isPaused.current = true;
    startX.current = e.pageX;
    scrollStart.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = 'grabbing';
    trackRef.current.style.animationPlayState = 'paused';
  };
  const onMouseLeave = () => {
    isDragging.current = false;
    isPaused.current = false;
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grab';
      trackRef.current.style.animationPlayState = 'running';
    }
  };
  const onMouseUp = () => {
    isDragging.current = false;
    isPaused.current = false;
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grab';
      trackRef.current.style.animationPlayState = 'running';
    }
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const walk = (e.pageX - startX.current) * 1.4;
    trackRef.current.scrollLeft = scrollStart.current - walk;
  };

  // Reveal cards
  useEffect(() => {
    const cards = trackRef.current?.querySelectorAll(`.${styles.card}`);
    if (!cards) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add(styles.visible);
      }),
      { threshold: 0.1 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section id="anggota" className={styles.section}>
      <div className={styles.header}>
        <span className={`section-kicker reveal ${styles.kicker}`}>ZeroFive</span>
        <h2 className="reveal reveal-delay-1">Anggota Kami</h2>
        <p className={`reveal reveal-delay-2 ${styles.sub}`}>
          Mengenal lebih dekat muda-mudi yang menggerakkan ZeroFive.
        </p>
      </div>

      <div className={styles.wrapper}>
        <div
          ref={trackRef}
          className={styles.track}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        >
          {DOUBLED.map((m, i) => (
            <div
              key={`${m.id}-${i}`}
              className={styles.card}
              style={{ '--delay': `${(i % MEMBERS.length) * 0.06}s` }}
            >
              <div className={styles.photoWrap}>
                {m.photo ? (
                  <img src={m.photo} alt={m.name} className={styles.photo} draggable={false} />
                ) : (
                  <div className={styles.placeholder}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                )}
                <div className={styles.shine} />
              </div>
              <span className={styles.name}>{m.name}</span>
            </div>
          ))}
        </div>

        <div className={styles.fadeLeft}  aria-hidden="true" />
        <div className={styles.fadeRight} aria-hidden="true" />
      </div>
    </section>
  );
}
