// ==============================================================================
// 📋 DATA ANGGOTA ZEROFIVE (src/data/members.js)
// ==============================================================================
// 📌 CARA MENGGANTI ATAU MENAMBAHKAN FOTO ANGGOTA:
// 1. Simpan file foto anggota ke folder:
//    👉 public/images/members/  (misal: caca.webp, daffa.webp, dll)
// 2. Ubah nilai 'photo' dengan path foto:
//    Contoh: photo: '/images/members/caca.webp'
// 3. Jika belum ada foto, biarkan `photo: null` (avatar inisial & ikon otomatis muncul).
//
// 💡 KETERANGAN BARIS:
// - femaleMembers (8 Cewek) : Baris ATAS (bergerak ke KIRI)
// - maleMembers   (8 Laki)  : Baris BAWAH (bergerak ke KANAN)
// ==============================================================================

// ── BARIS ATAS: 8 ANGGOTA CEWEK (Bergerak ke KIRI) ──────────────────────────
export const femaleMembers = [
  {
    id: 'f-1',
    name: 'Bilan',
    role: 'Muda-Mudi',
    photo: '/images/members/Bilan.webp',
    gender: 'female',
  },
  {
    id: 'f-2',
    name: 'Caca',
    role: 'Muda-Mudi',
    photo: '/images/members/Caca.webp',
    gender: 'female',
  },
  {
    id: 'f-3',
    name: 'Dana',
    role: 'Muda-Mudi',
    photo: '/images/members/Dana.webp',
    gender: 'female',
  },
  {
    id: 'f-4',
    name: 'Hani',
    role: 'Muda-Mudi',
    photo: '/images/members/Hani.webp',
    gender: 'female',
  },
  {
    id: 'f-5',
    name: 'Ica',
    role: 'Muda-Mudi',
    photo: '/images/members/Ica.webp',
    gender: 'female',
  },
  {
    id: 'f-6',
    name: 'Indri',
    role: 'Muda-Mudi',
    photo: '/images/members/Indri.webp',
    gender: 'female',
  },
  {
    id: 'f-7',
    name: 'Lala',
    role: 'Muda-Mudi',
    photo: '/images/members/Lala.webp',
    gender: 'female',
  },
  {
    id: 'f-8',
    name: 'Naura',
    role: 'Muda-Mudi',
    photo: '/images/members/Naura.webp',
    gender: 'female',
  },
];

// ── BARIS BAWAH: 8 ANGGOTA LAKI-LAKI (Bergerak ke KANAN) ────────────────────
export const maleMembers = [
  {
    id: 'm-1',
    name: 'Daffa',
    role: 'Muda-Mudi',
    photo: '/images/members/Daffa.webp',
    gender: 'male',
  },
  {
    id: 'm-2',
    name: 'Hisyam',
    role: 'Muda-Mudi',
    photo: '/images/members/Hisyam.webp',
    gender: 'male',
  },
  {
    id: 'm-3',
    name: 'Irul',
    role: 'Muda-Mudi',
    photo: '/images/members/Irul.webp',
    gender: 'male',
  },
  {
    id: 'm-4',
    name: 'Mizan',
    role: 'Muda-Mudi',
    photo: '/images/members/Mizan.webp',
    gender: 'male',
  },
  {
    id: 'm-5',
    name: 'Pandu',
    role: 'Muda-Mudi',
    photo: '/images/members/Pandu.webp',
    gender: 'male',
  },
  {
    id: 'm-6',
    name: 'Rafa',
    role: 'Muda-Mudi',
    photo: '/images/members/Rafa.webp',
    gender: 'male',
  },
  {
    id: 'm-7',
    name: 'Rama',
    role: 'Muda-Mudi',
    photo: '/images/members/Rama.webp',
    gender: 'male',
  },
  {
    id: 'm-8',
    name: 'Risky',
    role: 'Muda-Mudi',
    photo: '/images/members/Risky.webp',
    gender: 'male',
  },
];
