// ==============================================================================
// 📋 DATA AKTIVITAS / KEGIATAN (src/data/activities.js)
// ==============================================================================
// 📌 CARA MENGGANTI FOTO KEGIATAN:
// 1. Masukkan foto Anda ke folder:
//    👉 public/images/activities/
// 2. Ganti nilai 'photo' di bawah dengan path foto Anda, contoh:
//    photo: '/images/activities/gotong-royong.jpg',
// ==============================================================================

export const activities = [
  {
    id: 1,
    category: 'Pembubaran Panitia',
    title: 'Pembubaran Panitia Pantai Wonogoro',
    description:
      'Bersama menjaga kebersihan dan kenyamanan lingkungan RT 05 RW 03. Rutin, konsisten, dan penuh semangat kebersamaan.',
    // 📸 FOTO KEGIATAN 1 (Kartu Besar)
    // ⬇️ GANTI 'photo' di bawah jika sudah ada file di public/images/activities/
    // Contoh: photo: '/images/activities/gotong-royong.jpg',
    photo: './images/activities/pembubaran.webp',
    large: true,
  },
  {
    id: 2,
    category: 'Healing',
    title: 'Healing Bedengan',
    description: 'Membangun kebersamaan melalui kegiatan olahraga.',
    // 📸 FOTO KEGIATAN 2
    // ⬇️ GANTI 'photo' di bawah jika sudah ada file di public/images/activities/
    // Contoh: photo: '/images/activities/olahraga.jpg',
    photo: './images/activities/bedengan.webp',
    large: false,
  },
  {
    id: 3,
    category: 'Latihan',
    title: 'Gladi Bersih Malam Tirakatan',
    description: 'Berbagi dan membantu masyarakat sekitar.',
    // 📸 FOTO KEGIATAN 3
    // ⬇️ GANTI 'photo' di bawah jika sudah ada file di public/images/activities/
    // Contoh: photo: '/images/activities/sosial.jpg',
    photo: './images/activities/gladibersih.webp',
    large: false,
  },
  {
    id: 4,
    category: 'Panitia',
    title: 'Panitia Lomba Perayaan HUT RI',
    description: 'Ruang bagi ide dan karya anak muda.',
    // 📸 FOTO KEGIATAN 4
    // ⬇️ GANTI 'photo' di bawah jika sudah ada file di public/images/activities/
    // Contoh: photo: '/images/activities/kreatif.jpg',
    photo: './images/events/ibuibu.webp',
    large: false,
  },
  {
    id: 5,
    category: 'Rapat',
    title: 'Rapat Koordinasi',
    description: 'Kegiatan positif bagi generasi muda.',
    // 📸 FOTO KEGIATAN 5
    // ⬇️ GANTI 'photo' di bawah jika sudah ada file di public/images/activities/
    // Contoh: photo: '/images/activities/kepemudaan.jpg',
    photo: './images/activities/rapat.webp',
    large: false,
  },
  {
    id: 6,
    category: 'Nongki',
    title: 'Ngopi Bareng',
    description: 'Merayakan momen penting bersama warga.',
    // 📸 FOTO KEGIATAN 6
    // ⬇️ GANTI 'photo' di bawah jika sudah ada file di public/images/activities/
    // Contoh: photo: '/images/activities/perayaan.jpg',
    photo: './images/activities/ngopi.webp',
    large: false,
  },
];
