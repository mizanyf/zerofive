# 📸 Panduan Lengkap Mengganti Foto & Konten ZeroFive

Dokumen ini memandu Anda langkah demi langkah untuk mengganti foto dan teks di website ZeroFive dengan mudah.

---

## 📁 1. Struktur Folder Gambar (`public/images/`)

Semua foto yang ingin ditampilkan di website cukup diletakkan ke dalam folder `public/images/`:

| Folder | Digunakan Untuk | Rekomendasi Format & Ukuran |
| :--- | :--- | :--- |
| `public/images/events/` | Foto dokumentasi 4 event yang telah diselesaikan | 2 Foto Tegak (3:4, 600x800) + 1 Foto Bersama Lebar (16:9, 1200x675) |
| `public/images/activities/` | Foto 6 kegiatan utama | Landscape (800x600 s/d 1200x800) |
| `public/images/gallery/` | Foto-foto galeri | Bebas (Portrait atau Landscape) |
| `public/images/about/` | Foto profil ZeroFive & sorotan | 800x600 s/d 1200x800 |
| `public/images/hero/` | Background banner paling atas | Landscape lebar (1920x1080) |
| `public/images/members/` | Foto muda-mudi / anggota | Kotak / Portrait (500x500 s/d 600x800) |

> 💡 **Tips Performa:** Gunakan format `.jpg` atau `.webp` dengan ukuran file di bawah **1.5 MB** per foto agar website terbuka super cepat dan lancar di HP maupun laptop.

---

## 🎯 2. Di Mana Saja Kode yang Perlu Diedit?

### A. Event yang Telah Diselesaikan
👉 **File:** `src/data/events.js`

Event yang aktif saat ini:
1. **2 Agustus 2026** — *Lomba Ibu-ibu*
2. **9 Agustus 2026** — *Lomba Anak-anak*
3. **16 Agustus 2026** — *Malam Tirakatan HUT RI ke-81*
4. **24 Agustus 2026** — *Malam Perayaan Maulid Nabi*

**Cara ganti fotonya:**
Cari bagian `photos: [...]` di masing-masing event pada `src/data/events.js`, lalu ganti nilai `src`:
```javascript
photos: [
  {
    // Foto 1 (Atas Kiri)
    src: '/images/events/lomba-ibu-1.jpg',
    alt: 'Keseruan Lomba Ibu-ibu',
  },
  {
    // Foto 2 (Atas Kanan)
    src: '/images/events/lomba-ibu-2.jpg',
    alt: 'Aksi Peserta Lomba Ibu-ibu',
  },
  {
    // Foto 3 (Bawah Lebar - Foto Bersama)
    src: '/images/events/lomba-ibu-bersama.jpg',
    alt: 'Foto Bersama Peserta & Panitia Lomba Ibu-ibu',
  },
]
```

---

### B. Kegiatan / Aksi Nyata
👉 **File:** `src/data/activities.js`

Terdapat 6 kartu kegiatan. Untuk mengganti foto, simpan foto di `public/images/activities/` dan ganti baris `photo`:
```javascript
// Contoh:
photo: '/images/activities/gotong-royong.jpg',
```

---

### C. Galeri Foto
👉 **File:** `src/data/gallery.js`

Untuk mengganti atau menambah foto galeri:
1. Taruh foto di `public/images/gallery/`
2. Ubah baris `src` dan `fullSrc`:
```javascript
src: '/images/gallery/nama-foto.jpg',
fullSrc: '/images/gallery/nama-foto.jpg',
```

---

### D. Banner Utama (Hero Background)
👉 **File:** `src/components/Hero.jsx`

Cari baris berikut (sekitar baris 25):
```jsx
style={{ backgroundImage: "url('/images/about/fixawal.png')" }}
```
Ganti dengan foto Anda, misalnya:
```jsx
style={{ backgroundImage: "url('/images/hero/banner-utama.jpg')" }}
```

---

### E. Foto Profil Tentang ZeroFive
👉 **File:** `src/components/About.jsx`

Cari baris berikut (sekitar baris 85):
```jsx
<img
  src="/images/about/tosa.png"
  alt="Komunitas ZeroFive"
  loading="lazy"
/>
```
Ganti nilai `src` dengan path foto baru Anda.

---

### F. Daftar & Foto Anggota
👉 **File:** `src/components/Members.jsx`

Cari array `MEMBERS` di bagian atas file:
```javascript
const MEMBERS = [
  { id: 1, name: 'Nama Asli Anggota', photo: '/images/members/anggota1.jpg' },
  // jika belum ada foto, biarkan photo: null (akan muncul avatar bawaan)
];
```
