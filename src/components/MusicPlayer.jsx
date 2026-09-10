import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './MusicPlayer.module.css';

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const userPausedRef = useRef(false);
  const fadeIntervalRef = useRef(null);
  const volumeRef = useRef(volume);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  // Format detik ke format mm:ss
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds === 0) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Smooth fade-in volume
  const fadeInAudio = useCallback((targetVolume = 0.7) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    audio.volume = 0;
    const step = targetVolume / 15;

    fadeIntervalRef.current = setInterval(() => {
      if (audio.volume + step >= targetVolume) {
        audio.volume = targetVolume;
        clearInterval(fadeIntervalRef.current);
      } else {
        audio.volume += step;
      }
    }, 60);
  }, []);

  // Mencoba memutar audio secara otomatis
  const startPlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || userPausedRef.current) return;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          fadeInAudio(volumeRef.current);
        })
        .catch(() => {
          // Jika diblokir oleh browser sebelum interaksi pengguna
          setIsPlaying(false);
        });
    }
  }, [fadeInAudio]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volumeRef.current;

    let isCleanedUp = false;
    const events = ['pointerdown', 'mousedown', 'touchstart', 'touchend', 'click', 'keydown'];

    const cleanup = () => {
      if (isCleanedUp) return;
      isCleanedUp = true;
      events.forEach((evt) => {
        window.removeEventListener(evt, handleGesture, { capture: true });
        document.removeEventListener(evt, handleGesture, { capture: true });
      });
    };

    const handleGesture = () => {
      if (userPausedRef.current || !audio) return;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            fadeInAudio(volumeRef.current);
            cleanup(); // HANYA hapus listener jika pemutaran audio SUDAH BERHASIL!
          })
          .catch(() => {
            // Jika browser masih memblokir, biarkan listener tetap aktif untuk klik berikutnya!
          });
      }
    };

    // 1. Coba putar langsung saat mount (berhasil jika browser mengizinkan atau ada MEI)
    startPlayback();

    // 2. Coba putar lagi saat data lagu siap
    audio.addEventListener('canplay', startPlayback, { once: true });

    // 3. Pasang capture listener pada gestur pengguna pertama (klik, sentuh, tombol)
    events.forEach((evt) => {
      window.addEventListener(evt, handleGesture, { capture: true, passive: true });
      document.addEventListener(evt, handleGesture, { capture: true, passive: true });
    });

    return () => {
      cleanup();
      audio.removeEventListener('canplay', startPlayback);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [fadeInAudio, startPlayback]);

  // Update time and duration
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration);
  };

  // Toggle play/pause manual
  const togglePlay = (e) => {
    e?.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      userPausedRef.current = true;
      audio.pause();
      setIsPlaying(false);
    } else {
      userPausedRef.current = false;
      audio.play().then(() => {
        setIsPlaying(true);
      });
    }
  };

  // Seek bar scrubber
  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Rewind / Forward 10 detik
  const skipTime = (seconds, e) => {
    e?.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.currentTime + seconds, duration));
  };

  // Toggle Mute
  const toggleMute = (e) => {
    e?.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  // Handle Volume change
  const handleVolumeChange = (e) => {
    e?.stopPropagation();
    const newVol = parseFloat(e.target.value);
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = newVol;
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      audio.muted = false;
      setIsMuted(false);
    }
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <aside
      className={`${styles.container} ${isExpanded ? styles.expanded : ''}`}
      aria-label="Pemutar Musik"
    >
      <audio
        ref={audioRef}
        src="/music/ribuan-memori.mp3"
        preload="auto"
        loop
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Mode Terbuka (Expanded Card) */}
      {isExpanded ? (
        <div className={styles.playerCard}>
          {/* Card Header (Close button only) */}
          <div className={styles.cardHeader}>
            <button
              className={styles.closeBtn}
              onClick={() => setIsExpanded(false)}
              aria-label="Tutup pemutar musik"
              title="Tutup pemutar musik"
            >
              <i className="fas fa-chevron-down" />
            </button>
          </div>

          {/* Album & Vinyl Visual */}
          <div className={styles.vinylVisualWrap}>
            <div className={styles.albumCover}>
              <div className={styles.albumInner}>
                <span className={styles.albumKicker}>ZEROFIVE</span>
                <h4>RIBUAN MEMORI</h4>
                <p>Lomba Sihir</p>
              </div>
            </div>
            <div
              className={`${styles.vinylDisc} ${isPlaying ? styles.spinning : styles.paused}`}
            >
              <div className={styles.vinylGrooves}>
                <div className={styles.vinylCenter}>
                  <div className={styles.vinylHole} />
                </div>
              </div>
            </div>
          </div>

          {/* Song Info */}
          <div className={styles.songMeta}>
            <div className={styles.songTitleRow}>
              <div>
                <h3 className={styles.songTitle}>Ribuan Memori</h3>
                <p className={styles.songArtist}>Lomba Sihir</p>
              </div>
              <div
                className={`${styles.equalizer} ${isPlaying ? styles.eqActive : ''}`}
                aria-hidden="true"
              >
                <span className={styles.eqBar} />
                <span className={styles.eqBar} />
                <span className={styles.eqBar} />
                <span className={styles.eqBar} />
              </div>
            </div>
          </div>

          {/* Scrubber / Progress */}
          <div className={styles.progressContainer}>
            <div className={styles.timeLabels}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className={styles.progressTrackWrap}>
              <input
                type="range"
                min="0"
                max="100"
                value={progressPercent || 0}
                onChange={handleSeek}
                className={styles.rangeInput}
                aria-label="Progres Lagu"
              />
              <div
                className={styles.progressFill}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Controls Bar */}
          <div className={styles.controlsBar}>
            <button
              className={styles.secBtn}
              onClick={(e) => skipTime(-10, e)}
              title="Mundur 10 detik"
              aria-label="Mundur 10 detik"
            >
              <i className="fas fa-rotate-left" />
              <span className={styles.skipSec}>10</span>
            </button>

            <button
              className={styles.mainPlayBtn}
              onClick={togglePlay}
              aria-label={isPlaying ? 'Jeda Lagu' : 'Putar Lagu'}
              title={isPlaying ? 'Jeda Lagu' : 'Putar Lagu'}
            >
              <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`} />
            </button>

            <button
              className={styles.secBtn}
              onClick={(e) => skipTime(10, e)}
              title="Maju 10 detik"
              aria-label="Maju 10 detik"
            >
              <i className="fas fa-rotate-right" />
              <span className={styles.skipSec}>10</span>
            </button>
          </div>

          {/* Volume Row */}
          <div className={styles.volumeRow}>
            <button
              className={styles.volumeIconBtn}
              onClick={toggleMute}
              aria-label={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
              title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
            >
              <i
                className={`fas ${
                  isMuted || volume === 0
                    ? 'fa-volume-xmark'
                    : volume < 0.5
                    ? 'fa-volume-low'
                    : 'fa-volume-high'
                }`}
              />
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className={styles.volumeSlider}
              aria-label="Volume Musik"
            />
          </div>
        </div>
      ) : (
        /* Mode Kompak (Floating Pill) */
        <div
          className={styles.pill}
          onClick={() => setIsExpanded(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsExpanded(true);
            }
          }}
          aria-label="Buka kontrol musik"
          title="Klik untuk membuka pemutar musik"
        >
          {/* Mini Vinyl Record */}
          <div
            className={`${styles.miniDisc} ${isPlaying ? styles.spinning : styles.paused}`}
          >
            <div className={styles.miniDiscHole} />
          </div>

          {/* Equalizer Animasi */}
          <div
            className={`${styles.equalizer} ${isPlaying ? styles.eqActive : ''}`}
            aria-hidden="true"
          >
            <span className={styles.eqBar} />
            <span className={styles.eqBar} />
            <span className={styles.eqBar} />
            <span className={styles.eqBar} />
          </div>

          {/* Text Title */}
          <div className={styles.pillText}>
            <span className={styles.pillTitle}>Ribuan Memori</span>
            <span className={styles.pillArtist}>Lomba Sihir</span>
          </div>

          {/* Play / Pause Toggle Button */}
          <button
            className={styles.pillPlayBtn}
            onClick={togglePlay}
            aria-label={isPlaying ? 'Jeda Lagu' : 'Putar Lagu'}
            title={isPlaying ? 'Jeda Lagu' : 'Putar Lagu'}
          >
            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`} />
          </button>

          {/* Chevron Expand Indicator */}
          <button
            className={styles.pillExpandBtn}
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(true);
            }}
            aria-label="Buka detail lagu"
            title="Buka detail lagu"
          >
            <i className="fas fa-chevron-up" />
          </button>
        </div>
      )}
    </aside>
  );
}
