import styles from './Featured.module.css';

export default function Featured() {
  return (
    <section className={styles.featured}>
      {/* ==================================================================== */}
      {/* 🖼️ FOTO BACKGROUND SECTION SOROTAN */}
      {/* 📁 Lokasi file: public/images/about/ */}
      {/* ⬇️ GANTI url di bawah ini jika ingin mengganti foto: */}
      {/* Contoh: backgroundImage: "url('/images/about/featured.jpg')" */}
      {/* ==================================================================== */}
      <div
        className={styles.bg}
        style={{
          backgroundImage: "url('/images/about/featured.jpg')",
        }}
      />
      <div className={styles.overlay} />
      <div className={`${styles.content} container`}>
        <span className="section-kicker reveal">Sorotan</span>
        <h2 className="reveal reveal-delay-1">
          Satu Kegiatan,
          <br />
          <span className={styles.keyword}>Banyak Cerita.</span>
        </h2>
        <p className="reveal reveal-delay-2">
          Setiap kegiatan menjadi ruang untuk bertemu, belajar, dan menciptakan pengalaman bersama. Inilah momen yang membentuk kami
        </p>
        <a href="#galeri" className="btn btn-primary reveal reveal-delay-3">
          Lihat Dokumentasi <i className="fas fa-arrow-right" />
        </a>
      </div>
    </section>
  );
}
