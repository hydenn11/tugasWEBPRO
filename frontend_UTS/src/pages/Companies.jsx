import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');

  const companyList = [
    {
      id: 1,
      name: 'PT Google Indonesia',
      dataName: 'Google Indonesia',
      industryKey: 'Teknologi',
      industryLabel: 'Teknologi & Software',
      logo: '/assets/company-google.png',
      rating: '4.9',
      desc: 'Perusahaan teknologi multinasional terkemuka penyedia ekosistem mesin pencari, komputasi awan Google Cloud, dan infrastruktur komputasi awan global.',
      location: 'SCBD, Jakarta Selatan',
      openJobs: '12 Lowongan Terbuka',
      since: 'Mitra sejak 2024',
    },
    {
      id: 2,
      name: 'PT Amazon Web Services',
      dataName: 'Amazon Web Services',
      industryKey: 'Cloud',
      industryLabel: 'Cloud & Infra',
      logo: '/assets/company-amazon.png',
      rating: '4.8',
      desc: 'Penyedia platform komputasi awan global terlengkap, infrastruktur server enterprise, dan pusat analitik data di kawasan Asia Pasifik.',
      location: 'SCBD Senayan, Jakarta',
      openJobs: '8 Lowongan Terbuka',
      since: 'Mitra sejak 2024',
    },
    {
      id: 3,
      name: 'PT Adobe Systems',
      dataName: 'Adobe Systems',
      industryKey: 'Desain',
      industryLabel: 'Desain & Kreatif',
      logo: '/assets/company-adobe.png',
      rating: '4.9',
      desc: 'Pelopor perangkat lunak kreatif digital terkemuka dunia di bidang desain grafis, ilustrasi, UI/UX, video editing, dan publikasi media.',
      location: 'BSD City, Tangerang',
      openJobs: '6 Lowongan Terbuka',
      since: 'Mitra sejak 2025',
    },
    {
      id: 4,
      name: 'PT Sari Burger Indonesia',
      dataName: 'Burger King Sari Burger',
      industryKey: 'F&B',
      industryLabel: 'F&B / Kuliner',
      logo: '/assets/company-burgerking.png',
      rating: '4.7',
      desc: 'Jaringan waralaba restoran cepat saji internasional dengan ratusan cabang di kota-kota besar Indonesia, berfokus pada manajemen F&B dan rantai pasok.',
      location: 'Surabaya & Nasional',
      openJobs: '15 Lowongan Terbuka',
      since: 'Mitra sejak 2024',
    },
    {
      id: 5,
      name: 'PT Starlink Services',
      dataName: 'SpaceX Starlink Services',
      industryKey: 'Telekomunikasi',
      industryLabel: 'Telekomunikasi & Satelit',
      logo: '/assets/company-spacex.png',
      rating: '4.9',
      desc: 'Penyedia jaringan telekomunikasi internet satelit orbit rendah berkecepatan tinggi yang menjangkau seluruh pelosok kepulauan Indonesia.',
      location: 'Jakarta Pusat',
      openJobs: '5 Lowongan Terbuka',
      since: 'Mitra sejak 2025',
    },
    {
      id: 6,
      name: 'PT Amazon Services',
      dataName: 'Amazon Services Indonesia E-Commerce',
      industryKey: 'Teknologi',
      industryLabel: 'E-Commerce & Logistik',
      logo: '/assets/company-amazon.png',
      rating: '4.7',
      desc: 'Pengembang platform ritel perdagangan daring, inovasi otomasi pergudangan pintar, dan manajemen solusi fulfillment pesanan regional.',
      location: 'Jakarta Selatan',
      openJobs: '10 Lowongan Terbuka',
      since: 'Mitra sejak 2024',
    },
  ];

  const filteredCompanies = companyList.filter((comp) => {
    const matchesSearch =
      comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.dataName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry = !selectedIndustry || comp.industryKey === selectedIndustry;

    return matchesSearch && matchesIndustry;
  });

  return (
    <div>
      <section className="w-full bg-gradient-to-r from-[#00193F] to-[#16B3A3] pt-12 pb-16 px-4 text-center text-white shadow-md mb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
            Daftar Mitra <span className="text-[#99F6E4]">Perusahaan</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto mb-8 leading-relaxed">
            Jelajahi profil 500+ perusahaan mitra resmi yang telah lolos verifikasi legalitas tim AYOKERJA! dan siap
            merekrut talenta terbaik.
          </p>

          <div className="bg-white p-2 rounded-full shadow-2xl flex flex-col sm:flex-row items-center gap-2 max-w-3xl mx-auto border border-white/30">
            <div className="flex-1 flex items-center gap-3 pl-4 w-full">
              <i className="fa-solid fa-magnifying-glass text-slate-400 text-sm"></i>
              <input
                type="text"
                placeholder="Cari nama perusahaan (contoh: Google, Amazon, Adobe)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
              />
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 border-l border-slate-200 text-slate-600 text-xs sm:text-sm">
              <i className="fa-solid fa-industry text-slate-400 text-xs"></i>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer text-slate-700 text-xs sm:text-sm pr-2"
              >
                <option value="">Semua Industri</option>
                <option value="Teknologi">Teknologi &amp; Software</option>
                <option value="Cloud">Cloud &amp; Infra</option>
                <option value="Desain">Desain &amp; Kreatif</option>
                <option value="F&B">F&B / Kuliner</option>
                <option value="Telekomunikasi">Telekomunikasi &amp; Satelit</option>
              </select>
            </div>

            <button
              type="button"
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#16B3A3] hover:bg-[#109485] text-white font-bold text-xs sm:text-sm transition-all shadow-md"
            >
              Cari Perusahaan
            </button>
          </div>
        </div>
      </section>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#00193F]">Perusahaan Rekanan Terverifikasi</h2>
            <p className="text-xs text-slate-500 mt-0.5">Menampilkan mitra aktif yang sedang membuka lowongan karir</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#CCFBF1] text-[#16B3A3]">
              {filteredCompanies.length} Perusahaan Terdaftar
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((comp) => (
            <article
              key={comp.id}
              className="company-card bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#16B3A3]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={comp.logo}
                      alt={comp.name}
                      className="w-12 h-12 object-contain p-1 rounded-xl bg-slate-50 border border-slate-100"
                    />
                    <div>
                      <h3 className="text-base font-bold text-[#00193F] leading-snug">{comp.name}</h3>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                        <i className="fa-solid fa-shield-check text-xs"></i> Terverifikasi Resmi
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                    <i className="fa-solid fa-star"></i> {comp.rating}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {comp.desc}
                </p>

                <div className="space-y-1.5 text-xs text-slate-500 mb-4">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-industry w-4 text-slate-400"></i>
                    <span>Industri: <strong>{comp.industryLabel}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-location-dot w-4 text-slate-400"></i>
                    <span>Kantor: {comp.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-briefcase w-4 text-slate-400"></i>
                    <span className="font-semibold">{comp.openJobs}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{comp.since}</span>
                <Link
                  to={`/jobs?q=${encodeURIComponent(comp.name)}`}
                  className="px-4 py-1.5 rounded-full bg-[#16B3A3] hover:bg-[#109485] text-white text-xs font-semibold transition-colors"
                >
                  Lihat Lowongan &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>

      </main>
    </div>
  );
}
