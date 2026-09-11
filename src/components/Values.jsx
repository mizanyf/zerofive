import styles from './Values.module.css';

const values = [
  {
    num: '01 — Kebersamaan',
    title: 'Kebersamaan',
    desc: 'Karena lingkungan yang kuat dibangun bersama, dari dan untuk semua.',
  },
  {
    num: '02 — Kreativitas',
    title: 'Kreativitas',
    desc: 'Memberikan ruang bagi ide dan karya anak muda untuk tumbuh dan berkembang.',
  },
  {
    num: '03 — Kepedulian',
    title: 'Kepedulian',
    desc: 'Berperan aktif untuk lingkungan dan masyarakat di sekitar kami.',
  },
  {
    num: '04 — Kontribusi',
    title: 'Kontribusi',
    desc: 'Mengubah semangat menjadi aksi nyata yang berdampak bagi banyak orang.',
  },
];

export default function Values() {
  return (
    <section className={styles.values}>
      <div className="container">
        <div className={`activities-header reveal`} style={{ marginBottom: '4rem' }}>
          <div>
            <span className="section-kicker">Prinsip Kami</span>
            <h2 className="section-title">
              Apa Yang
              <br />
              Kami Bawa
            </h2>
          </div>
          <p>Empat nilai yang menggerakkan setiap langkah kami.</p>
        </div>

        <div className={styles.grid}>
          {values.map((v, i) => (
            <div key={i} className={`${styles.item} reveal reveal-delay-${i % 4}`}>
              <div className={styles.number}>{v.num}</div>
              <h3 className={styles.title}>{v.title}</h3>
              <p className={styles.desc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
