import { useEffect, useRef, useMemo, useState } from 'react';
import styles from './Members.module.css';
import { femaleMembers, maleMembers } from '../data/members';

function MemberCard({ member }) {
  const [imgError, setImgError] = useState(false);
  const initial = member.name ? member.name.charAt(0).toUpperCase() : '?';
  const isFemale = member.gender === 'female';

  return (
    <div
      className={`${styles.card} ${
        isFemale ? styles.femaleCard : styles.maleCard
      }`}
    >
      <div className={styles.photoWrap}>
        {member.photo && !imgError ? (
          <img
            src={member.photo}
            alt={member.name}
            className={styles.photo}
            loading="lazy"
            decoding="async"
            draggable="false"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className={`${styles.avatarFallback} ${
              isFemale ? styles.femaleFallback : styles.maleFallback
            }`}
          >
            <span className={styles.avatarInitial}>{initial}</span>
            <svg
              className={styles.avatarSilhouette}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
              <path
                d="M4 20c0-4 3.582-7 8-7s8 3 8 7"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
        <div className={styles.shine} />
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{member.name}</span>
      </div>
    </div>
  );
}

function MarqueeRow({ items, direction = 'left', speed = 36 }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const dragLastXRef = useRef(0);
  const dragLastTimeRef = useRef(0);
  const singleSetWidthRef = useRef(0);

  // 4 set duplikasi untuk infinite loop mulus tanpa jeda di resolusi apa pun
  const quadrupledItems = useMemo(
    () => [...items, ...items, ...items, ...items],
    [items]
  );

  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current) {
        const totalWidth = trackRef.current.scrollWidth;
        const w = totalWidth / 4;
        singleSetWidthRef.current = w;
        if (posRef.current === 0 && w > 0) {
          posRef.current = -w;
          trackRef.current.style.transform = `translate3d(${-w}px, 0, 0)`;
        }
      }
    };

    updateWidth();

    const ro = new ResizeObserver(updateWidth);
    if (trackRef.current) {
      ro.observe(trackRef.current);
    }
    window.addEventListener('resize', updateWidth);

    // Animasi requestAnimationFrame dengan momentum & GPU acceleration
    let lastTimestamp = performance.now();
    let rafId;
    const baseVelocity = direction === 'left' ? -speed : speed;

    const animate = (timestamp) => {
      const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.05);
      lastTimestamp = timestamp;

      const W = singleSetWidthRef.current;
      if (W > 0) {
        if (!isDraggingRef.current) {
          if (Math.abs(velocityRef.current) > 1) {
            // Meluncur dengan inersia alami
            posRef.current += velocityRef.current * dt;
            // Gesekan deselerasi halus
            velocityRef.current *= Math.pow(0.92, dt * 60);
          } else {
            velocityRef.current = 0;
            // Auto scroll normal jika kursor tidak hover
            if (!isHoveredRef.current) {
              posRef.current += baseVelocity * dt;
            }
          }
        }

        // Seamless wrap-around tanpa jeda
        while (posRef.current <= -2 * W) {
          posRef.current += W;
        }
        while (posRef.current > -W) {
          posRef.current -= W;
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    // Listener event wheel (untuk geser touchpad / shift + scroll)
    const container = containerRef.current;
    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        posRef.current -= e.deltaX;
        velocityRef.current = -e.deltaX * 12;
      }
    };

    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('resize', updateWidth);
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [direction, speed]);

  const onPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    isDraggingRef.current = true;
    dragLastXRef.current = e.clientX;
    dragLastTimeRef.current = performance.now();
    velocityRef.current = 0;

    if (containerRef.current) {
      containerRef.current.classList.add(styles.isDragging);
    }

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const onPointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = Math.max((now - dragLastTimeRef.current) / 1000, 0.001);
    const deltaX = e.clientX - dragLastXRef.current;
    dragLastXRef.current = e.clientX;
    dragLastTimeRef.current = now;

    posRef.current += deltaX;

    // Filter perataan kecepatan (smoothing)
    const instantV = deltaX / dt;
    velocityRef.current = velocityRef.current * 0.3 + instantV * 0.7;
  };

  const onPointerUp = (e) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      if (containerRef.current) {
        containerRef.current.classList.remove(styles.isDragging);
      }
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      const maxV = 2200;
      velocityRef.current = Math.max(-maxV, Math.min(maxV, velocityRef.current));
    }
  };

  const onPointerCancel = () => {
    isDraggingRef.current = false;
    velocityRef.current = 0;
    if (containerRef.current) {
      containerRef.current.classList.remove(styles.isDragging);
    }
  };

  const onPointerEnter = (e) => {
    if (e.pointerType === 'mouse') {
      isHoveredRef.current = true;
    }
  };

  const onPointerLeave = (e) => {
    if (e.pointerType === 'mouse') {
      isHoveredRef.current = false;
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.marqueeRow}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div ref={trackRef} className={styles.track}>
        {quadrupledItems.map((member, idx) => (
          <MemberCard
            key={`${member.id}-${idx}`}
            member={member}
          />
        ))}
      </div>
    </div>
  );
}

export default function Members() {
  return (
    <section id="anggota" className={styles.section}>
      <div className="container">
        <div className={`${styles.header} reveal`}>
          <div>
            <span className="section-kicker">Muda-Mudi</span>
            <h2 className="section-title">Anggota Kami</h2>
          </div>
          <p>
            Pemuda dan pemudi kreatif yang menjadi motor penggerak kebersamaan, karya, dan setiap kegiatan kami.
          </p>
        </div>
      </div>

      {/* Marquee Container 2 Baris Interaktif */}
      <div className={styles.marqueeContainer}>
        {/* BARIS ATAS: 8 ANGGOTA CEWEK - Bergerak ke KIRI */}
        <MarqueeRow items={femaleMembers} direction="left" speed={36} />

        {/* BARIS BAWAH: 8 ANGGOTA LAKI-LAKI - Bergerak ke KANAN */}
        <MarqueeRow items={maleMembers} direction="right" speed={36} />
      </div>
    </section>
  );
}
