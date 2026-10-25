# Proyek Frontend UTS — AYOKERJA! (React.js SPA & Tailwind CSS)

**Studi Kasus Proyek Fullstack:** **AYOKERJA!** (Portal Rekrutmen & Penyaluran Kerja Terpadu Indonesia)  
**Tautan Repositori GitHub:** [https://github.com/hydenn11/tugasWEBPRO](https://github.com/hydenn11/tugasWEBPRO)  
**Teknologi:** **React 18/19, Vite, Tailwind CSS v3, React Router v6, Lucide Icons**

---

## 1. Deskripsi Proyek
Proyek ini merupakan implementasi **100% Frontend Modern** berbasis arsitektur **Single Page Application (SPA)** menggunakan **React.js** dan **Tailwind CSS**. Mengonversi prototipe antarmuka menjadi komponen modular, reaktif, dan terkelola dengan state manajemen global (`AuthContext`).

---

## 2. Fitur & Halaman yang Dibangun

| No | Halaman | Rute / Komponen | Fitur & Keunggulan Frontend |
| :---: | :--- | :--- | :--- |
| 1 | **Beranda Utama** | `/` (`Home.jsx`) | • Banner Hero dengan Clean Pill Search Bar dinamis.<br>• Metrik statistik platform interaktif.<br>• 6 Kartu lowongan rekomendasi dengan tombol bookmark & modal *Lamar Cepat* instan.<br>• Strip mitra korporasi terverifikasi. |
| 2 | **Katalog Lowongan** | `/jobs` (`Jobs.jsx`) | • *Live search* instan dan filter multi-kategori/tipe penempatan.<br>• Filter khusus *Lowongan Tersimpan* (`?filter=saved`).<br>• Tabel interaktif dengan modal detail deskripsi lowongan dan form lamaran. |
| 3 | **Direktori Perusahaan** | `/companies` (`Companies.jsx`) | • Direktori mitra terverifikasi (Google, AWS, Adobe, SpaceX, Burger King).<br>• Rating bintang, jumlah review, dan badge legalitas.<br>• Filter industri dan modal profil ringkas perusahaan. |
| 4 | **Autentikasi Pelamar** | `/login-pelamar` (`LoginPelamar.jsx`) | • Tab *Masuk* dan *Daftar Baru* dengan validasi form.<br>• Demo login Google satu klik.<br>• Penyimpanan sesi terintegrasi ke `localStorage`. |
| 5 | **Portal Perusahaan** | `/login-perusahaan` (`LoginPerusahaan.jsx`) | • Autentikasi recruiter korporat dengan pemilihan sektor industri.<br>• Redirect langsung ke Dashboard Recruiter. |
| 6 | **Profil Pelamar** | `/profile` (`ProfilePelamar.jsx`) | • Modal interaktif edit nama, kontak, dan ringkasan profesional.<br>• Kartu riwayat karir dan riwayat pendidikan lengkap.<br>• Berkas Resume / CV (fitur unduh & ganti file).<br>• Pantauan real-time *Riwayat Lamaran Kerja* dan *Lowongan Tersimpan*. |
| 7 | **Dashboard Recruiter** | `/company-dashboard` (`CompanyDashboard.jsx`) | • Metrik lowongan aktif, pelamar masuk, dan kandidat lolos.<br>• Tabel screening pelamar dengan aksi Terima / Tolak / Wawancara / Unduh CV.<br>• Modal formulir tambah lowongan kerja baru. |

---

## 3. Struktur Direktori Proyek

```text
frontend_UTS/
├── public/
│   └── assets/                     # Logo AYOKERJA! & logo perusahaan mitra
├── src/
│   ├── components/                 # Komponen Modular Reusable
│   │   ├── Navbar.jsx              # Navigasi responsif, dropdown sesi, & mobile drawer
│   │   └── Footer.jsx              # Footer informatif & tautan cepat
│   ├── context/
│   │   └── AuthContext.jsx         # State global sesi user, lamaran, & bookmark lowongan
│   ├── data/
│   │   └── mockData.js             # Data lowongan dan profil korporat
│   ├── pages/                      # Halaman Rute Aplikasi (SPA)
│   │   ├── Home.jsx
│   │   ├── Jobs.jsx
│   │   ├── Companies.jsx
│   │   ├── LoginPelamar.jsx
│   │   ├── LoginPerusahaan.jsx
│   │   ├── ProfilePelamar.jsx
│   │   └── CompanyDashboard.jsx
│   ├── App.jsx                     # Konfigurasi routing React Router DOM
│   ├── index.css                   # Direktif Tailwind CSS & font base
│   └── main.jsx                    # Entry point aplikasi React
├── package.json
├── tailwind.config.js              # Palet warna brand navy-teal & font token
└── vite.config.js
```

---

## 4. Cara Menjalankan Proyek Secara Lokal

1. Masuk ke direktori `frontend_UTS`:
   ```bash
   cd frontend_UTS
   ```
2. Instal dependensi (jika belum):
   ```bash
   npm install
   ```
3. Jalankan server pengembangan (*development server*):
   ```bash
   npm run dev
   ```
4. Buka tautan lokal yang ditampilkan di terminal (biasanya `http://localhost:5173`).
