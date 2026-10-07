# Dokumentasi Tugas Praktikum Pemrograman Web
## BAB 2 - Penerapan Struktur Semantic HTML5 & Aksesibilitas

**Nama Mahasiswa / Repositori:** tugasWEBPRO  
**Studi Kasus Proyek Fullstack:** **AYOKERJA!** (Portal Rekrutmen & Penyaluran Kerja Terpadu Indonesia)  
**Tautan Repositori GitHub:** [https://github.com/hydenn11/tugasWEBPRO](https://github.com/hydenn11/tugasWEBPRO)

---

## 1. Studi Kasus Aplikasi: **AYOKERJA!**
**AYOKERJA!** adalah platform portal lowongan kerja dan rekrutmen digital terpadu di Indonesia yang menghubungkan pencari kerja (*job seekers*) dengan perusahaan (*employers*) secara transparan, efisien, dan terverifikasi.

Studi kasus ini dipilih karena memiliki kompleksitas data yang ideal untuk pengembangan bertahap hingga pekan ke-14 (meliputi katalog data lowongan terverifikasi, pencarian & filtering data, statistik ekosistem, accordion FAQ, serta profil visi misi perusahaan).

---

## 2. Struktur Direktori Proyek (BAB 2 - HTML)

```text
tugas_bab2_html/
├── assets/                               # Aset logo dan gambar perusahaan
│   ├── company-google.png                # Logo PT Google Indonesia
│   ├── company-amazon.png                # Logo PT Amazon Web Services / Services Indonesia
│   ├── company-adobe.png                 # Logo PT Adobe Systems Indonesia
│   ├── company-burgerking.png            # Logo PT Sari Burger Indonesia
│   ├── company-spacex.png                # Logo PT Starlink Services Indonesia / SpaceX
│   └── logo.png                          # Logo resmi platform AYOKERJA!
├── docs/
│   └── screenshots/                      # Direktori Dokumentasi Tangkapan Layar
│       ├── 01-beranda-html.png           # Screenshot halaman Beranda (HTML Murni)
│       ├── 02-tentang-kami-html.png      # Screenshot halaman Tentang Kami (HTML Murni)
│       └── 03-pusat-bantuan-html.png     # Screenshot halaman Pusat Bantuan (HTML Murni)
├── about.html                            # Halaman 2: Tentang Kami (Profil & Visi Misi)
├── index.html                            # Halaman 1: Beranda & Katalog Lowongan
├── support.html                          # Halaman 3: Pusat Bantuan (FAQ Accordion & Kontak)
└── README.md                             # Dokumentasi lengkap tugas Bab 2
```

---

## 3. Rincian Halaman & Komponen HTML yang Diterapkan

Proyek ini terdiri dari **3 halaman HTML murni** (tanpa CSS eksternal) yang saling terhubung melalui navigasi hyperlink (`<a href="...">`):

### A. Halaman Utama / Beranda (`index.html`)
* **Fungsi:** Menampilkan identitas platform AYOKERJA!, navigasi menu utama, banner hero search bar, 4 metrik statistik ekosistem, navigasi filter kategori cepat, 6 katalog artikel lowongan pekerjaan unggulan dari perusahaan terverifikasi (Google, AWS, Adobe, Burger King, SpaceX, Amazon), serta footer informasi kontak.
* **Elemen HTML Utama:**
  * **Semantic HTML5:** `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<footer>`, `<address>`.
  * **Headings:** `<h1>` (tunggal untuk judul utama halaman), `<h2>`, `<h3>`, `<h4>`.
  * **Description List & Data Statistik:** `<dl>`, `<dt>`, `<dd>` untuk statistik ekosistem.
  * **Formulir & Kontrol Pencarian:** `<form>`, `<label for="...">`, `<input type="text">`, `<select>`, `<option>`, `<button type="submit">`.
  * **Media & Gambar:** `<img>` dengan atribut `alt`, `width`, dan `height` yang proporsional.

### B. Halaman Tentang Kami (`about.html`)
* **Fungsi:** Menyajikan informasi komprehensif terkait profil platform AYOKERJA!, 3 metrik pencapaian (mitra industri terverifikasi, kandidat diterima, indeks kepuasan), serta kartu visi dan misi dengan daftar komitmen keunggulan layanan.
* **Elemen HTML Utama:**
  * **Semantic Structure:** `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<address>`.
  * **Hierarki Heading:** `<h1>` judul halaman, `<h2>` sub-topik capaian & visi misi, `<h3>` judul komitmen layanan.
  * **Data List:** `<dl>`, `<dt>`, `<dd>` untuk statistik capaian platform dan `<ul>`, `<li>` untuk poin-poin visi misi.

### C. Halaman Pusat Bantuan (`support.html`)
* **Fungsi:** Menyediakan pusat bantuan interaktif berisi daftar pertanyaan umum (FAQ) seputar mekanisme lamaran kerja, proses verifikasi dokumen legalitas perusahaan, biaya registrasi, dan konfirmasi jadwal wawancara, serta banner tautan kontak customer service resmi.
* **Elemen HTML Utama:**
  * **Interaktif Native HTML5:** `<details>` dan `<summary>` untuk membuat komponen accordion FAQ murni tanpa JavaScript/CSS.
  * **Atribut Default Open:** Penggunaan atribut `open` pada `<details open>` untuk menampilkan item FAQ pertama dalam keadaan terbuka.
  * **Tautan Komunikasi:** `<a href="mailto:support@ayokerja.id">` untuk interaksi email langsung.

---

## 4. Penerapan Semantic HTML5 & Praktik Aksesibilitas

1. **Semantic HTML5:**
   * Dokumen tidak menggunakan `<div>` bertumpuk tanpa makna struktural; setiap bagian dibungkus dengan tag semantik yang tepat (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
   * Struktur dokumen jelas dan mematuhi kaidah HTML5 standar W3C.
2. **Aksesibilitas (a11y):**
   * **Deskripsi Gambar:** Semua tag `<img>` memiliki atribut `alt` deskriptif bagi pembaca layar (*screen reader*).
   * **Relasi Label & Input:** Setiap elemen input form terhubung langsung dengan `<label>` melalui atribut `for` dan `id` yang presisi.
   * **Landmark Navigasi:** Menggunakan atribut `aria-label="Navigasi Menu Utama"` pada elemen `<nav>`.

---

## 5. Tangkapan Layar Tampilan Halaman (HTML Murni)

### 1. Tampilan Halaman Beranda (`index.html`)
![Tampilan Halaman Beranda HTML](docs/screenshots/01-beranda-html.png)

### 2. Tampilan Halaman Tentang Kami (`about.html`)
![Tampilan Halaman Tentang Kami HTML](docs/screenshots/02-tentang-kami-html.png)

### 3. Tampilan Halaman Pusat Bantuan (`support.html`)
![Tampilan Halaman Pusat Bantuan HTML](docs/screenshots/03-pusat-bantuan-html.png)

---

## 6. Petunjuk Menjalankan Proyek

1. Proyek ini dibangun menggunakan **HTML5 standar murni**, sehingga tidak memerlukan server lokal atau dependensi tambahan.
2. Buka file `index.html` pada folder `tugas_bab2_html/` secara langsung di web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, dll).
3. Semua tautan navigasi (`<a>`) antar 3 halaman (**Beranda**, **Tentang Kami**, **Pusat Bantuan**) telah terhubung secara relatif dan dapat diakses dengan lancar.

---

