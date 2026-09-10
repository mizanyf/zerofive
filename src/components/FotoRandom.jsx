import { useEffect, useRef, useMemo } from 'react';
import styles from './FotoRandom.module.css';
import { ourStoryTop, ourStoryBottom } from '../data/ourStory';

function MarqueeRow({ items, direction = 'left', speed = 38 }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const dragLastXRef = useRef(0);
  const dragLastTimeRef = useRef(0);
  const singleSetWidthRef = useRef(0);

  // 4 set duplikasi untuk infinite loop yang mulus di segala ukuran monitor (hingga 4K)
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

    // Animasi requestAnimationFrame yang mulus dengan momentum & GPU acceleration
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
            // Meluncur dengan inersia / momentum alami
            posRef.current += velocityRef.current * dt;
            // Gesekan deselerasi halus
            velocityRef.current *= Math.pow(0.92, dt * 60);
          } else {
            velocityRef.current = 0;
            // Auto scroll normal saat mouse tidak hover
            if (!isHoveredRef.current) {
              posRef.current += baseVelocity * dt;
            }
          }
        }

        // Loop tanpa jeda (wrap-around seamlessly)
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

    // Wheel event listener (untuk geser touchpad horizontal / shift+scroll yang super responsif)
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

    // Hitung kecepatan geser dengan filter smoothing
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
      // Batasi kecepatan momentum maksimal agar meluncur halus
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
        {quadrupledItems.map((photo, idx) => (
          <div key={`${photo.id}-${idx}`} className={styles.card}>
            <img
              src={photo.src}
              alt={photo.alt || 'Our Story ZeroFive'}
              loading="lazy"
              decoding="async"
              draggable="false"
              className={styles.img}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FotoRandom() {
  return (
    <section id="our-story" className={styles.section}>
      <div className="container">
        <div className={`${styles.header} reveal`}>
          <div>
            <span className="section-kicker">Dokumentasi</span>
            <h2 className="section-title">Our Story</h2>
          </div>
          <p>
            Setiap foto adalah jejak perjalanan, tawa, dan memori kebersamaan warga ZeroFive yang tak lekang oleh waktu.
          </p>
        </div>
      </div>

      {/* Marquee Container dengan Edge Fade Gradient */}
      <div className={styles.marqueeContainer}>
        {/* BARIS ATAS: 10 FOTO (our.webp - our9.webp) - Bergerak ke KIRI */}
        <MarqueeRow items={ourStoryTop} direction="left" speed={38} />

        {/* BARIS BAWAH: 10 FOTO (our10.webp - our19.webp) - Bergerak ke KANAN */}
        <MarqueeRow items={ourStoryBottom} direction="right" speed={38} />
      </div>
    </section>
  );
}
