import { useEffect, useRef, useState, useMemo } from 'react';
import styles from './FotoRandom.module.css';
import { ourStoryTop, ourStoryBottom } from '../data/ourStory';

function MarqueeRow({ items, direction = 'left', speed = 38 }) {
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const singleSetWidthRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  // 4 set duplikasi untuk loop tanpa batas yang mulus di segala ukuran layar
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

    // Animasi requestAnimationFrame yang mulus & GPU accelerated
    let lastTimestamp = performance.now();
    let rafId;

    const animate = (timestamp) => {
      const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
      lastTimestamp = timestamp;

      const W = singleSetWidthRef.current;
      if (W > 0 && !isPausedRef.current && !isDraggingRef.current) {
        if (direction === 'left') {
          posRef.current -= speed * dt;
        } else {
          posRef.current += speed * dt;
        }

        // Wrap around mulus tanpa jeda
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

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, [direction, speed]);

  const onPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    isDraggingRef.current = true;
    isPausedRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = posRef.current;
    setIsDragging(true);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const onPointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    let newPos = dragStartPosRef.current + deltaX;

    const W = singleSetWidthRef.current;
    if (W > 0) {
      while (newPos <= -2 * W) {
        newPos += W;
        dragStartPosRef.current += W;
      }
      while (newPos > -W) {
        newPos -= W;
        dragStartPosRef.current -= W;
      }
    }

    posRef.current = newPos;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${newPos}px, 0, 0)`;
    }
  };

  const onPointerUp = (e) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      // Pada perangkat sentuh (HP), otomatis lanjutkan animasi setelah jari diangkat
      if (e.pointerType === 'touch') {
        isPausedRef.current = false;
      }
    }
  };

  const onPointerCancel = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
    isPausedRef.current = false;
  };

  const onPointerEnter = (e) => {
    if (e.pointerType === 'mouse') {
      isPausedRef.current = true;
    }
  };

  const onPointerLeave = (e) => {
    if (e.pointerType === 'mouse' && !isDraggingRef.current) {
      isPausedRef.current = false;
    }
  };

  return (
    <div
      className={`${styles.marqueeRow} ${isDragging ? styles.isDragging : ''}`}
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

      {/* Marquee Container dengan Edge Fade Mask */}
      <div className={styles.marqueeContainer}>
        {/* BARIS ATAS: 10 FOTO - Bergerak ke KIRI, bisa digeser mouse / jari */}
        <MarqueeRow items={ourStoryTop} direction="left" speed={38} />

        {/* BARIS BAWAH: 10 FOTO - Bergerak ke KANAN, bisa digeser mouse / jari */}
        <MarqueeRow items={ourStoryBottom} direction="right" speed={38} />
      </div>
    </section>
  );
}
