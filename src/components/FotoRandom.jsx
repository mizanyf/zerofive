import styles from './FotoRandom.module.css';
import { ourStoryTop, ourStoryBottom } from '../data/ourStory';

export default function FotoRandom() {
  return (
    <section id="our-story" className={styles.section}>
      <div className="container">
        <div className={`${styles.header} reveal`}>
          <div>
            <span className="section-kicker">Dokumentasi</span>
            <h2 className="section-title">Our Story</h2>
          </div>
          <p>
            Setiap foto adalah jejak perjalanan, tawa, dan memori kebersamaan warga ZeroFive yang tak lekang oleh waktu.
          </p>
        </div>
      </div>

      {/* Marquee Container dengan Edge Fade Mask */}
      <div className={styles.marqueeContainer}>
        {/* BARIS ATAS: 10 FOTO - Animasi bergerak ke KIRI */}
        <div className={`${styles.marqueeRow} ${styles.rowTop}`}>
          <div className={styles.track}>
            {ourStoryTop.concat(ourStoryTop).map((photo, idx) => (
              <div key={`top-${idx}`} className={styles.card}>
                <img
                  src={photo.src}
                  alt={photo.alt || 'Our Story ZeroFive'}
                  loading="lazy"
                  decoding="async"
                  className={styles.img}
                />
              </div>
            ))}
          </div>
        </div>

        {/* BARIS BAWAH: 10 FOTO - Animasi bergerak ke KANAN */}
        <div className={`${styles.marqueeRow} ${styles.rowBottom}`}>
          <div className={styles.track}>
            {ourStoryBottom.concat(ourStoryBottom).map((photo, idx) => (
              <div key={`bot-${idx}`} className={styles.card}>
                <img
                  src={photo.src}
                  alt={photo.alt || 'Our Story ZeroFive'}
                  loading="lazy"
                  decoding="async"
                  className={styles.img}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
