import styles from './Gallery.module.css';
import { galleryItems } from '../data/gallery';

export default function Gallery() {
  return (
    <section id="galeri" className={styles.gallery}>
      <div className="container">
        <div className={`${styles.header} reveal`}>
          <div>
            <span className="section-kicker">Dokumentasi</span>
            <h2 className="section-title">
              Cerita Kami
              <br />
              Dalam Foto
            </h2>
          </div>
          <p>Setiap foto adalah jejak kebersamaan, inspirasi, dan semangat muda yang tak pernah padam.</p>
        </div>

        <div className={styles.grid}>
          {galleryItems.map((item, idx) => (
            <div
              key={item.id}
              className={`${styles.item} reveal reveal-delay-${idx % 3}`}
            >
              <img src={item.src} alt={item.title || 'Dokumentasi ZeroFive'} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
