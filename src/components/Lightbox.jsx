import { useEffect } from 'react';
import styles from './Lightbox.module.css';

export default function Lightbox({ items, currentIdx, onClose, onNavigate }) {
  const item = items[currentIdx];

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(-1);
      if (e.key === 'ArrowRight') onNavigate(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onNavigate]);

  return (
    <div className={styles.lightbox} onClick={onClose} role="dialog" aria-modal="true">
      <button className={styles.close} aria-label="Tutup" onClick={onClose}>
        <i className="fas fa-times" />
      </button>
      <button
        className={`${styles.nav} ${styles.prev}`}
        aria-label="Sebelumnya"
        onClick={(e) => { e.stopPropagation(); onNavigate(-1); }}
      >
        <i className="fas fa-chevron-left" />
      </button>
      <button
        className={`${styles.nav} ${styles.next}`}
        aria-label="Selanjutnya"
        onClick={(e) => { e.stopPropagation(); onNavigate(1); }}
      >
        <i className="fas fa-chevron-right" />
      </button>

      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <img src={item.fullSrc || item.src} alt="" />
      </div>
    </div>
  );
}
