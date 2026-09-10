import styles from './Footer.module.css';

const navItems = [
  { href: '#beranda', label: 'Beranda' },
  { href: '#tentang', label: 'Tentang' },
  { href: '#kegiatan', label: 'Kegiatan' },
  { href: '#galeri', label: 'Galeri' },
  { href: '#event', label: 'Event' },
  { href: '#media-sosial', label: 'Media Sosial' },
];

const communityItems = [
  { href: '#tentang', label: 'Tentang ZeroFive' },
  { href: '#kegiatan', label: 'Kegiatan Kami' },
  { href: '#galeri', label: 'Galeri Foto' },
  { href: '#event', label: 'Event Selesai' },
  { href: '#media-sosial', label: 'Media Sosial' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.main}>
          {/* Brand */}
          <div className={styles.brand}>
            <h3>
              ZERO
              <br />
              FIVE
            </h3>
            <p>
              Karang Taruna / Muda-Mudi RT 05 RW 03
              <br />
              Kelurahan Mulyorejo, Kota Malang, Jawa Timur
            </p>
            <div className={styles.social}>
              <a
                href="https://www.instagram.com/karangtaruna05mulyorejo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                href="https://www.tiktok.com/@karangtaruna05mulyorejo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <i className="fab fa-tiktok" />
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div className={styles.links}>
            <h4>Navigasi</h4>
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community links */}
          <div className={styles.links}>
            <h4>Komunitas</h4>
            <ul>
              {communityItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {year} ZeroFive. All rights reserved.</p>
          <p className={styles.tagline}>Bersama, Berkarya, Berdampak.</p>
        </div>
      </div>
    </footer>
  );
}
