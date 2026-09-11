import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section id="media-sosial" className={styles.contact}>
      {/* Anchor alias untuk backward compatibility */}
      <span id="kontak" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
      <div className="container">
        <div className={styles.grid}>
          {/* Media Sosial Info */}
          <div className={`${styles.info} reveal`}>
            <span className="section-kicker">Media Sosial</span>
            <h2 className="section-title">
              Media
              <br />
              Sosial
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
              <div className={styles.value}>
                <a
                  href="https://www.instagram.com/karangtaruna05mulyorejo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  @karangtaruna05mulyorejo
                </a>
              </div>
            </div>

            <div className={styles.detail}>
              <div className={styles.label}>TikTok</div>
              <div className={styles.value}>
                <a
                  href="https://www.tiktok.com/@karangtaruna05mulyorejo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  @karangtaruna05mulyorejo
                </a>
              </div>
            </div>

            <div className={styles.detail}>
              <div className={styles.label}>YouTube</div>
              <div className={styles.value}>
                <a
                  href="https://www.youtube.com/@zerofivve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  @zerofivve
                </a>
              </div>
            </div>

            <div className={styles.social}>
              <a
                href="https://www.instagram.com/karangtaruna05mulyorejo"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                href="https://www.tiktok.com/@karangtaruna05mulyorejo"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="TikTok"
              >
                <i className="fab fa-tiktok" />
              </a>
              <a
                href="https://www.youtube.com/@zerofivve"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="YouTube"
              >
                <i className="fab fa-youtube" />
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
