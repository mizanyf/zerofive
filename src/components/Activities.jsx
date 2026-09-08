import { activities } from '../data/activities';
import styles from './Activities.module.css';

export default function Activities() {
  return (
    <section id="kegiatan" className={styles.activities}>
      <div className="container">
        <div className={`activities-header reveal`}>
          <div>
            <span className="section-kicker">Aksi Nyata</span>
            <h2 className="section-title">
              Kegiatan
              <br />
              Kami
            </h2>
          </div>
          <p>
            Beragam kegiatan yang kami jalankan untuk membangun kebersamaan, kreativitas, dan
            kontribusi nyata bagi lingkungan.
          </p>
        </div>

        <div className={styles.grid}>
          {activities.map((act, i) => (
            <article
              key={act.id}
              className={`${styles.card} ${act.large ? styles.cardLarge : ''} reveal reveal-delay-${i % 4}`}
            >
              <img src={act.photo} alt={act.title} loading="lazy" />
              <div className={styles.overlay} />
              <div className={styles.content}>
                <span className={styles.category}>{act.category}</span>
                <h3 className={styles.title}>{act.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
