import { useEffect, useRef, useState } from 'react';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'exit' | 'done'
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const DURATION = 1800;

    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const rawT = Math.min(elapsed / DURATION, 1);
      const pct = Math.floor((1 - Math.pow(1 - rawT, 3)) * 100);
      setProgress(pct);

      if (rawT < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setProgress(100);
        setTimeout(() => setPhase('exit'), 400);
        setTimeout(() => {
          setPhase('done');
          onComplete?.();
        }, 1100);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete]);

  if (phase === 'done') return null;

  const statusLabel =
    progress < 30
      ? 'Memuat assets...'
      : progress < 60
      ? 'Menyiapkan konten...'
      : progress < 90
      ? 'Menginisialisasi...'
      : 'Selesai! Klik untuk masuk';

  const handleScreenClick = () => {
    if (phase === 'loading') {
      setProgress(100);
      setPhase('exit');
      setTimeout(() => {
        setPhase('done');
        onComplete?.();
      }, 700);
    }
  };

  return (
    <div
      className={`${styles.loader} ${phase === 'exit' ? styles.exit : ''}`}
      onClick={handleScreenClick}
      role="button"
      tabIndex={0}
      title="Klik untuk langsung masuk ke website"
    >
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.lines} aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={styles.line} style={{ '--i': i }} />
        ))}
      </div>
      <div className={styles.center}>
        <div className={styles.logoWrap}>
          <div className={styles.logoRing}>
            <div className={styles.logoSpinner} />
            <span className={styles.logoInner}>05</span>
          </div>
        </div>
        <div className={styles.identity}>
          <span className={styles.kicker}>Karang Taruna</span>
          <h1 className={styles.title}>
            Zero<span className={styles.titleAccent}>Five</span>
          </h1>
          <span className={styles.subtitle}>
            RT 05 &middot; RW 03 &middot; Mulyorejo &middot; Malang
          </span>
        </div>
        <div className={styles.progressWrap}>
          <div className={styles.progressTrack}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
            <div className={styles.progressGlow} style={{ left: `${progress}%` }} />
          </div>
          <div className={styles.progressLabels}>
            <span className={styles.progressStatus}>{statusLabel}</span>
            <span className={styles.progressPct}>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}