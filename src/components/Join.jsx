import styles from './Join.module.css';

export default function Join() {
  return (
    <section className={styles.join}>
      {/* ==================================================================== */}
      {/* 🖼️ FOTO BACKGROUND BANNER AJAKAN GABUNG */}
      {/* 📁 Lokasi file: public/images/hero/ atau public/images/about/ */}
      {/* ⬇️ GANTI url di bawah ini dengan foto Anda jika sudah ada: */}
      {/* Contoh: backgroundImage: "url('/images/hero/join-bg.jpg')" */}
      {/* ==================================================================== */}
      <div
        className={styles.bg}
        style={{
          backgroundImage: `url('https://picsum.photos/seed/zerofive-join-together/1920/1080')`,
        }}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <span className="section-kicker reveal" style={{ justifyContent: 'center' }}>
          Bergabung
        </span>
        <h2 className="reveal reveal-delay-1">
          Jadi Bagian Dari
          <br />
          Cerita Kami.
        </h2>
        <p className="reveal reveal-delay-2">
          Punya ide? Ingin ikut kegiatan? Atau sekadar ingin berkenalan dengan kami?
          Pintu kami selalu terbuka.
        </p>
        <div className={`${styles.cta} reveal reveal-delay-3`}>
          <a href="#media-sosial" className="btn btn-primary">
            Gabung Bersama Kami <i className="fas fa-arrow-right" />
          </a>
          <a href="#media-sosial" className="btn btn-secondary">
            Media Sosial Kami
          </a>
        </div>
      </div>
    </section>
  );
}
