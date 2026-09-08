// ==============================================================================
// 💡 PANDUAN PENGGUNA:
// Untuk mengganti NAMA EVENT, TANGGAL, BULAN, dan FOTO DOKUMENTASI:
// 👉 Buka file: src/data/events.js
// Semua teks dan foto event dikumpulkan di file tersebut agar rapi dan mudah diganti!
// ==============================================================================

import { useState, useRef, useEffect } from 'react';
import { events } from '../data/events';
import styles from './Events.module.css';

/**
 * Komponen pembungkus foto dokumentasi dengan:
 * 1. Efek Skeleton Shimmer saat foto sedang di-download / dirender
 * 2. Transisi fade-in halus saat foto selesai dimuat
 * 3. Tampilan fallback informatif jika file foto belum ada / gagal dimuat
 */
function EventPhoto({ photo, ratio = 'portrait', label = null }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef(null);

  const src = typeof photo === 'string' ? photo : photo?.src;
  const alt = typeof photo === 'string' ? 'Dokumentasi kegiatan' : photo?.alt || 'Dokumentasi kegiatan';

  // Cek apakah gambar sudah ada di cache browser saat pertama mount
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    setIsError(false);
  };

  const handleError = () => {
    setIsError(true);
    setIsLoaded(true);
  };

  const isWide = ratio === 'wide';

  return (
    <div className={isWide ? styles.photoItemWide : styles.photoItemPortrait}>
      {/* 1. Efek Shimmer Loading (tampil saat foto sedang dimuat) */}
      {!isLoaded && !isError && (
        <div className={styles.skeleton} aria-hidden="true">
          <div className={styles.skeletonIcon}>
            <i className="fas fa-image" />
          </div>
          <span className={styles.skeletonText}>Memuat foto...</span>
          <div className={styles.skeletonShine} />
        </div>
      )}

      {/* 2. Fallback Card (jika foto lokal belum ada / error) */}
      {isError ? (
        <div className={styles.photoFallback}>
          <i className="fas fa-camera-retro" />
          <span className={styles.photoFallbackTitle}>Dokumentasi Foto</span>
          <span className={styles.photoFallbackHint}>
            Siap diganti di folder:
            <br />
            <code>public/images/events/</code>
          </span>
        </div>
      ) : (
        /* 3. Gambar asli dengan transisi halus saat selesai load */
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={isLoaded ? styles.imgLoaded : styles.imgLoading}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      )}

      {/* 4. Label Badge (misal: 'Foto Bersama') */}
      {label && isLoaded && !isError && (
        <div className={styles.photoLabel}>
          <i className="fas fa-users" />
          <span>{label}</span>
        </div>
      )}
    </div>
  );
}

export default function Events() {
  const [expandedId, setExpandedId] = useState(null);
  const cardRefs = useRef({});

  // Preload foto event pertama di background untuk respon instan
  useEffect(() => {
    if (events[0]?.photos) {
      events[0].photos.forEach((photo) => {
        const src = typeof photo === 'string' ? photo : photo?.src;
        if (src) {
          const img = new Image();
          img.src = src;
        }
      });
    }
  }, []);

  // Preload foto saat kursor hover di header event (agar saat diklik foto sudah siap)
  const handleHoverEvent = (event) => {
    if (!event?.photos) return;
    event.photos.forEach((photo) => {
      const src = typeof photo === 'string' ? photo : photo?.src;
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  };

  // Toggle buka / tutup accordion dengan perlindungan posisi scroll
  const toggle = (id) => {
    setExpandedId((prev) => {
      const isClosing = prev === id;
      // Jika sedang menutup dan posisi card berada di atas layar akibat scroll,
      // jaga agar header tetap terlihat di layar tanpa menghilang
      if (isClosing && cardRefs.current[id]) {
        const cardEl = cardRefs.current[id];
        const rect = cardEl.getBoundingClientRect();
        if (rect.top < 80) {
          cardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      return isClosing ? null : id;
    });
  };

  return (
    <section id="event" className={styles.events}>
      <div className="container">
        <div className="activities-header reveal">
          <div>
            <span className="section-kicker">Rekam Jejak</span>
            <h2 className="section-title">
              Event yang Telah
              <br />
              Diselesaikan
            </h2>
          </div>
          <p>
            Dokumentasi kegiatan ZeroFive yang telah berhasil kami laksanakan bersama. Setiap event
            adalah cerita kebersamaan yang membanggakan.
          </p>
        </div>

        {/* List event diberi kelas reveal agar animasi masuk tetap rapi,
            sementara masing-masing card tidak memakai reveal agar transisi klik tidak bentrok */}
        <div className={`${styles.list} reveal`}>
          {events.map((event) => {
            const isExpanded = expandedId === event.id;
            const photo1 = event.photos?.[0];
            const photo2 = event.photos?.[1];
            const photoGroup = event.photos?.[2];

            return (
              <article
                key={event.id}
                ref={(el) => {
                  cardRefs.current[event.id] = el;
                }}
                className={`${styles.card} ${isExpanded ? styles.expanded : ''}`}
                onMouseEnter={() => handleHoverEvent(event)}
              >
                <div
                  className={styles.cardHeader}
                  onClick={() => toggle(event.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggle(event.id);
                    }
                  }}
                >
                  {/* Tanggal kegiatan */}
                  <div className={styles.date}>
                    {event.date}
                    <span className={styles.month}>{event.month}</span>
                  </div>

                  {/* Nama kegiatan */}
                  <div className={styles.info}>
                    <h3>{event.title}</h3>
                  </div>

                  {/* Icon panah yang berputar saat dibuka */}
                  <div
                    className={styles.toggle}
                    aria-label={isExpanded ? 'Tutup dokumentasi foto' : 'Lihat dokumentasi foto'}
                  >
                    <i className="fas fa-chevron-down" />
                  </div>
                </div>

                {/* Kontainer foto yang muncul saat diklik */}
                <div className={styles.cardBody}>
                  <div className={styles.cardBodyInner}>
                    <div className={styles.cardContent}>
                      <div className={styles.photosGrid}>
                        {/* 2 foto 3:4 di atas berdampingan */}
                        <div className={styles.topPhotos}>
                          <EventPhoto key={photo1?.src || `${event.id}-p1`} photo={photo1} ratio="portrait" />
                          <EventPhoto key={photo2?.src || `${event.id}-p2`} photo={photo2} ratio="portrait" />
                        </div>

                        {/* 1 foto panjang di bawah untuk Foto Bersama */}
                        <EventPhoto
                          key={photoGroup?.src || `${event.id}-p3`}
                          photo={photoGroup}
                          ratio="wide"
                          label="Foto Bersama"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
