import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section id="kontak" className={styles.contact}>
      <div className="container">
        <div className={styles.grid}>
          {/* Contact Info */}
          <div className={`${styles.info} reveal`}>
            <span className="section-kicker">Lokasi &amp; Kontak</span>
            <h2 className="section-title">
              Temui
              <br />
              Kami
            </h2>

            <div className={styles.detail}>
              <div className={styles.label}>Alamat</div>
              <div className={styles.value}>
                RT 05 RW 03, Kelurahan Mulyorejo
                <br />
                Kota Malang, Jawa Timur
              </div>
            </div>

            <div className={styles.detail}>
              <div className={styles.label}>Instagram</div>
              <div className={styles.value}>@zerofive</div>
            </div>

            <div className={styles.detail}>
              <div className={styles.label}>WhatsApp</div>
              <div className={styles.value}>+62 XXX-XXXX-XXXX</div>
            </div>

            <div className={styles.social}>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <i className="fab fa-instagram" />
              </a>
              <a href="#" className={styles.socialLink} aria-label="WhatsApp">
                <i className="fab fa-whatsapp" />
              </a>
              <a href="#" className={styles.socialLink} aria-label="TikTok">
                <i className="fab fa-tiktok" />
              </a>
            </div>
          </div>

          {/* Map */}
          <div className={`${styles.mapWrap} reveal reveal-delay-1`}>
            <iframe
              src="https://www.google.com/maps?q=Mulyorejo+Malang&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi ZeroFive"
            />
            <div className={styles.mapOverlay} />
            <div className={styles.mapPin}>
              <i className="fas fa-map-marker-alt" />
              <span>Mulyorejo, Malang</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
