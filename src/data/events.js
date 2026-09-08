// ==============================================================================
// 📋 PUSAT DATA & DOKUMENTASI EVENT (src/data/events.js)
// ==============================================================================
// 📌 PANDUAN CARA MENGGANTI FOTO EVENT:
// 1. Siapkan 3 foto untuk setiap event:
//    - Foto 1 (Tegak / Portrait rasio 3:4) -> Tampil di Atas Kiri
//    - Foto 2 (Tegak / Portrait rasio 3:4) -> Tampil di Atas Kanan
//    - Foto 3 (Melebar / Landscape rasio 16:9) -> Tampil di Bawah (Foto Bersama)
// 2. Taruh file foto Anda di folder:
//    👉 public/images/events/
// 3. Ganti nilai 'src' di bawah menjadi nama file foto Anda, contoh:
//    src: '/images/events/lomba-ibu-1.jpg',
//
// 💡 TIPS UKURAN & PERFORMA:
// - Format terbaik: .jpg atau .webp
// - Ukuran file yang disarankan: 300 KB s/d 1.5 MB (agar loading cepat)
// ==============================================================================

export const events = [
  // ============================================================================
  // EVENT 1: Tanggal 2 Agustus 2026 - Lomba Ibu-ibu
  // ============================================================================
  {
    id: 1,
    date: '02',
    month: 'Agustus 2026',
    title: 'Lomba Ibu-ibu HUT RI ke-81',

    photos: [
      {
        // 📸 FOTO 1 (Atas Kiri - Rasio Portrait 3:4)
        // ⬇️ GANTI 'src' di bawah dengan foto Anda dari folder public/images/events/
        // Contoh: src: '/images/events/lomba-ibu-1.jpg',
        src: './images/events/ibuibu1.webp',
        alt: 'Keseruan Lomba Ibu-ibu',
      },
      {
        // 📸 FOTO 2 (Atas Kanan - Rasio Portrait 3:4)
        // ⬇️ GANTI 'src' di bawah dengan foto Anda dari folder public/images/events/
        // Contoh: src: '/images/events/lomba-ibu-2.jpg',
        src: './images/events/ibuibu2.webp',
        alt: 'Aksi Peserta Lomba Ibu-ibu',
      },
      {
        // 📸 FOTO 3 (Bawah Lebar - Rasio Landscape 16:9 / Foto Bersama)
        // ⬇️ GANTI 'src' di bawah dengan foto Anda dari folder public/images/events/
        // Contoh: src: '/images/events/lomba-ibu-bersama.jpg',
        src: './images/events/ibuibu.webp',
        alt: 'Foto Bersama Peserta & Panitia Lomba Ibu-ibu',
      },
    ],
  },

  // ============================================================================
  // EVENT 2: Tanggal 9 Agustus 2026 - Lomba Anak-anak
  // ============================================================================
  {
    id: 2,
    date: '09',
    month: 'Agustus 2026',
    title: 'Lomba Anak-anak HUT RI ke-81',

    photos: [
      {
        // 📸 FOTO 1 (Atas Kiri - Rasio Portrait 3:4)
        // ⬇️ GANTI 'src' di bawah dengan foto Anda dari folder public/images/events/
        // Contoh: src: '/images/events/lomba-anak-1.jpg',
        src: './images/events/anakanak1.webp',
        alt: 'Keceriaan Lomba Anak-anak',
      },
      {
        // 📸 FOTO 2 (Atas Kanan - Rasio Portrait 3:4)
        // ⬇️ GANTI 'src' di bawah dengan foto Anda dari folder public/images/events/
        // Contoh: src: '/images/events/lomba-anak-2.jpg',
        src: './images/events/anakanak2.webp',
        alt: 'Antusiasme Peserta Lomba Anak-anak',
      },
      {
        // 📸 FOTO 3 (Bawah Lebar - Rasio Landscape 16:9 / Foto Bersama)
        // ⬇️ GANTI 'src' di bawah dengan foto Anda dari folder public/images/events/
        // Contoh: src: '/images/events/lomba-anak-bersama.jpg',
        src: './images/events/anakanak.webp',
        alt: 'Foto Bersama Juara & Panitia Lomba Anak-anak',
      },
    ],
  },

  // ============================================================================
  // EVENT 3: Tanggal 16 Agustus 2026 - Malam Tirakatan HUT RI ke-81
  // ============================================================================
  {
    id: 3,
    date: '16',
    month: 'Agustus 2026',
    title: 'Malam Tirakatan HUT RI ke-81',

    photos: [
      {
        // 📸 FOTO 1 (Atas Kiri - Rasio Portrait 3:4)
        // ⬇️ GANTI 'src' di bawah dengan foto Anda dari folder public/images/events/
        // Contoh: src: '/images/events/tirakatan-1.jpg',
        src: './images/events/tirakatan1.webp',
        alt: 'Suasana Malam Tirakatan HUT RI ke-81',
      },
      {
        // 📸 FOTO 2 (Atas Kanan - Rasio Portrait 3:4)
        // ⬇️ GANTI 'src' di bawah dengan foto Anda dari folder public/images/events/
        // Contoh: src: '/images/events/tirakatan-2.jpg',
        src: './images/events/tirakatan2.webp',
        alt: 'Doa Bersama & Pemotongan Tumpeng Kemerdekaan',
      },
      {
        // 📸 FOTO 3 (Bawah Lebar - Rasio Landscape 16:9 / Foto Bersama)
        // ⬇️ GANTI 'src' di bawah dengan foto Anda dari folder public/images/events/
        // Contoh: src: '/images/events/tirakatan-bersama.jpg',
        src: './images/events/tirakatan.webp',
        alt: 'Foto Bersama Warga & Tokoh Masyarakat Malam Tirakatan',
      },
    ],
  },

  // ============================================================================
  // EVENT 4: Tanggal 24 Agustus 2026 - Malam Perayaan Maulid Nabi
  // ============================================================================
  {
    id: 4,
    date: '24',
    month: 'Agustus 2026',
    title: 'Malam Perayaan Maulid Nabi 1448 Hijriah',

    photos: [
      {
        // 📸 FOTO 1 (Atas Kiri - Rasio Portrait 3:4)
        // ⬇️ GANTI 'src' di bawah dengan foto Anda dari folder public/images/events/
        // Contoh: src: '/images/events/maulid-1.jpg',
        src: './images/events/maulid1.webp',
        alt: 'Pembacaan Sholawat & Doa Maulid Nabi',
      },
      {
        // 📸 FOTO 2 (Atas Kanan - Rasio Portrait 3:4)
        // ⬇️ GANTI 'src' di bawah dengan foto Anda dari folder public/images/events/
        // Contoh: src: '/images/events/maulid-2.jpg',
        src: './images/events/maulid2.webp',
        alt: 'Kajian & Tausiyah Maulid Nabi',
      },
      {
        // 📸 FOTO 3 (Bawah Lebar - Rasio Landscape 16:9 / Foto Bersama)
        // ⬇️ GANTI 'src' di bawah dengan foto Anda dari folder public/images/events/
        // Contoh: src: '/images/events/maulid-bersama.jpg',
        src: './images/events/maulid.webp',
        alt: 'Foto Bersama Jamaah & Panitia Muda-Mudi Maulid Nabi',
      },
    ],
  },
];
