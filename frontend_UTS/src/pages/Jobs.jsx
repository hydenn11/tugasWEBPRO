import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthRequiredModal from '../components/AuthRequiredModal';
import JobDetailModal from '../components/JobDetailModal';
import JobApplyModal from '../components/JobApplyModal';
import ViewApplicationModal from '../components/ViewApplicationModal';
import { ALL_JOBS } from '../data/jobsList';

export default function Jobs() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const initialCategory = searchParams.get('kategori') || '';
  const initialLocation = searchParams.get('lokasi') || '';
  const initialFilter = searchParams.get('filter') || '';

  const [search, setSearch] = useState(initialQ);
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [locationFilter, setLocationFilter] = useState(initialLocation);
  const [typeFilter, setTypeFilter] = useState('');

  // Tab Aktif: 'all' (Semua Lowongan) | 'saved' (Lowongan Tersimpan) | 'applied' (Riwayat Lamaran)
  const [activeTab, setActiveTab] = useState(
    initialFilter === 'saved' ? 'saved' : initialFilter === 'applied' ? 'applied' : 'all'
  );

  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter === 'saved') {
      setActiveTab('saved');
    } else if (filter === 'applied') {
      setActiveTab('applied');
    } else if (!filter && searchParams.size === 0) {
      setActiveTab('all');
    }
  }, [searchParams]);

  const { savedJobIds, toggleSaveJob, applyJob, withdrawApplication, appliedJobs, user } = useAuth();

  const [authModal, setAuthModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    actionType: 'apply',
    jobTitle: '',
    companyName: '',
  });

  // Modal Detail Lowongan
  const [selectedJobDetail, setSelectedJobDetail] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  // Modal Pengisian Berkas Lamaran
  const [selectedJobToApply, setSelectedJobToApply] = useState(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  // Modal Detail Berkas Lamaran Terkirim
  const [viewApplicationModal, setViewApplicationModal] = useState(null);

  // Form Fields Berkas Lamaran
  const [candidateName, setCandidateName] = useState(user?.nama || '');
  const [candidateEmail, setCandidateEmail] = useState(user?.email || '');
  const [candidatePhone, setCandidatePhone] = useState(user?.telepon || '0857-1122-3344');
  const [resumeOption, setResumeOption] = useState('profile'); // 'profile' | 'upload'
  const [uploadedResumeName, setUploadedResumeName] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');

  // Toast Notifikasi
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  };

  const allJobs = ALL_JOBS;

  const matchesProvinceOrCity = (jobLocation = '', filterProvince = '') => {
    if (!filterProvince) return true;
    const loc = (jobLocation || '').toLowerCase();
    const prov = filterProvince.toLowerCase();

    if (prov === 'remote') {
      return loc.includes('remote') || loc.includes('jarak jauh') || loc.includes('wfa');
    }

    const provinceMap = {
      jakarta: ['jakarta', 'dki', 'scbd', 'senayan', 'thamrin', 'kuningan', 'sudirman'],
      'jawa barat': ['jawa barat', 'jabar', 'bandung', 'bekasi', 'bogor', 'depok', 'cimahi', 'cikarang', 'karawang'],
      'jawa tengah': ['jawa tengah', 'jateng', 'semarang', 'solo', 'surakarta', 'yogyakarta', 'jogja'],
      'jawa timur': ['jawa timur', 'jatim', 'surabaya', 'malang', 'sidoarjo', 'gresik'],
      'sulawesi selatan': ['sulawesi selatan', 'sulsel', 'makassar', 'gowa', 'maros'],
      bali: ['bali', 'denpasar', 'badung', 'kuta', 'ubud'],
    };

    const keywords = provinceMap[prov] || [prov];
    return keywords.some((kw) => loc.includes(kw));
  };

  const filteredJobs = allJobs.filter((job) => {
    if (activeTab === 'saved' && !savedJobIds.includes(job.id)) {
      return false;
    }

    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = !categoryFilter || job.categoryKey === categoryFilter || job.categoryLabel.toLowerCase().includes(categoryFilter.toLowerCase());
    const matchesLocation = matchesProvinceOrCity(job.location, locationFilter);
    const matchesType = !typeFilter || job.type === typeFilter;

    return matchesSearch && matchesCategory && matchesLocation && matchesType;
  });

  const filteredAppliedJobs = appliedJobs.filter((app) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase().trim();
    return (
      app.title?.toLowerCase().includes(q) ||
      app.company?.toLowerCase().includes(q) ||
      app.status?.toLowerCase().includes(q)
    );
  });

  const openJobDetail = (job) => {
    setSelectedJobDetail(job);
    setDetailModalOpen(true);
  };

  const closeJobDetail = () => {
    setSelectedJobDetail(null);
    setDetailModalOpen(false);
    if (searchParams.get('detail')) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('detail');
      navigate({ search: newParams.toString() ? `?${newParams.toString()}` : '' }, { replace: true });
    }
  };


  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const newParams = new URLSearchParams(searchParams);
    if (tab === 'saved') {
      newParams.set('filter', 'saved');
    } else if (tab === 'applied') {
      newParams.set('filter', 'applied');
    } else {
      newParams.delete('filter');
    }
    navigate({ search: newParams.toString() ? `?${newParams.toString()}` : '' }, { replace: true });
  };

  const handleWithdrawApplication = (jobId, jobTitle) => {
    if (window.confirm(`Apakah Anda yakin ingin membatalkan/menarik berkas lamaran untuk posisi "${jobTitle}"?`)) {
      withdrawApplication(jobId);
      showToast(`Lamaran untuk posisi "${jobTitle}" berhasil ditarik.`);
    }
  };

  // Listener untuk parameter URL (?detail=ID, ?apply=ID, ?filter=saved/applied)
  useEffect(() => {
    const detailId = searchParams.get('detail');
    if (detailId) {
      const found = allJobs.find((j) => String(j.id) === String(detailId));
      if (found) {
        setSelectedJobDetail(found);
        setDetailModalOpen(true);
      }
    }

    const applyId = searchParams.get('apply');
    if (applyId) {
      const found = allJobs.find((j) => String(j.id) === String(applyId));
      if (found) {
        handleApplyClick(found);
      }
    }

    const filterParam = searchParams.get('filter');
    if (filterParam === 'saved') {
      setActiveTab('saved');
    } else if (filterParam === 'applied') {
      setActiveTab('applied');
    } else if (!filterParam && (activeTab === 'saved' || activeTab === 'applied')) {
      // jika filter dihapus dari URL
    }
  }, [searchParams]);

  const handleApplyClick = (job) => {
    if (!user || user.role !== 'pelamar') {
      setAuthModal({
        isOpen: true,
        title: 'Masuk Akun Pelamar Terlebih Dahulu',
        message: `Untuk melamar posisi "${job.title}" di "${job.company}", Anda harus masuk ke akun pelamar Anda terlebih dahulu.`,
        actionType: 'apply',
        jobTitle: job.title,
        companyName: job.company,
      });
      return;
    }

    if (appliedJobs.some((item) => item.id === job.id)) {
      showToast(`Anda sudah melamar posisi "${job.title}" sebelumnya.`);
      return;
    }

    // Pre-fill data pelamar
    setCandidateName(user?.nama || 'Luthfi Ramadhan');
    setCandidateEmail(user?.email || 'daniramadh47@gmail.com');
    setCandidatePhone(user?.telepon || '0857-1122-3344');
    setResumeOption('profile');
    setUploadedResumeName('');
    setCoverLetter('');
    setPortfolioUrl(user?.linkedin || '');
    setExpectedSalary(job.salary ? job.salary.split('-')[0].trim() : '');

    setSelectedJobToApply(job);
    setApplyModalOpen(true);
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran berkas melebihi batas maksimal 5MB.');
        return;
      }
      setUploadedResumeName(file.name);
      setResumeOption('upload');
      showToast(`Berkas resume "${file.name}" berhasil dipilih.`);
    }
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!selectedJobToApply) return;

    const resumeName = resumeOption === 'upload' && uploadedResumeName
      ? uploadedResumeName
      : 'Resume_Luthfi_Frontend.pdf';

    const success = applyJob(selectedJobToApply, {
      candidateName,
      candidateEmail,
      candidatePhone,
      resumeName,
      coverLetter,
      portfolioUrl,
      expectedSalary,
    });

    if (success) {
      setApplyModalOpen(false);
      showToast(`Lamaran dan berkas untuk "${selectedJobToApply.title}" di ${selectedJobToApply.company} berhasil dikirim!`);
    } else {
      showToast(`Lamaran untuk posisi "${selectedJobToApply.title}" sudah pernah dikirim sebelumnya.`);
      setApplyModalOpen(false);
    }
  };

  const handleSave = (job) => {
    if (!user || user.role !== 'pelamar') {
      setAuthModal({
        isOpen: true,
        title: 'Masuk Akun Pelamar Terlebih Dahulu',
        message: `Untuk menyimpan lowongan "${job.title}" ke daftar favorit, Anda harus masuk ke akun pelamar Anda terlebih dahulu.`,
        actionType: 'save',
        jobTitle: job.title,
        companyName: job.company,
      });
      return;
    }
    toggleSaveJob(job.id);
  };

  return (
    <div>
      <section className="bg-white border-b border-slate-200 py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <nav className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                <Link to="/" className="hover:text-[#16B3A3] transition-colors">Beranda</Link>
                <i className="fa-solid fa-chevron-right text-[10px]"></i>
                <span className="text-slate-600 font-semibold">Katalog Lowongan</span>
              </nav>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00193F] tracking-tight">
                Daftar Lowongan Kerja Terbaru
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Temukan karir impian Anda, bandingkan rentang gaji kompetitif, dan lamar posisi favorit secara langsung.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">

        <div className="flex items-center gap-2 sm:gap-3 mb-5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => handleTabChange('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'all'
                ? 'bg-[#00193F] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
          >
            <i className="fa-solid fa-briefcase text-xs"></i>
            <span>Semua Lowongan</span>
            <span className={`text-[11px] font-bold ${activeTab === 'all' ? 'text-white/80' : 'text-slate-400'}`}>
              ({allJobs.length})
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('saved')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'saved'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-amber-50 hover:text-amber-700 border border-slate-200'
              }`}
          >
            <i className={`fa-bookmark ${activeTab === 'saved' ? 'fa-solid' : 'fa-regular'} text-xs`}></i>
            <span>Lowongan Tersimpan</span>
            <span className={`text-[11px] font-bold ${activeTab === 'saved' ? 'text-white/80' : 'text-slate-400'}`}>
              ({savedJobIds.length})
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('applied')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'applied'
                ? 'bg-[#16B3A3] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-teal-50 hover:text-[#16B3A3] border border-slate-200'
              }`}
          >
            <i className="fa-solid fa-clipboard-check text-xs"></i>
            <span>Riwayat Lamaran</span>
            <span className={`text-[11px] font-bold ${activeTab === 'applied' ? 'text-white/80' : 'text-slate-400'}`}>
              ({appliedJobs.length})
            </span>
          </button>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <i className="fa-solid fa-magnifying-glass text-xs"></i>
              </div>
              <input
                type="text"
                placeholder={
                  activeTab === 'applied'
                    ? 'Cari riwayat lamaran / perusahaan...'
                    : 'Cari posisi atau perusahaan...'
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all placeholder:text-slate-400"
              />
            </div>

            <div>
              <select
                disabled={activeTab === 'applied'}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all text-slate-700 bg-white disabled:bg-slate-50 disabled:text-slate-400"
              >
                <option value="">Semua Kategori</option>
                <option value="IT">Software &amp; AI</option>
                <option value="Cloud">Cloud &amp; Infrastructure</option>
                <option value="Design">UI/UX &amp; Design</option>
                <option value="Operations">Operations &amp; F&B</option>
                <option value="Telecom">Telecommunication</option>
              </select>
            </div>

            <div>
              <select
                disabled={activeTab === 'applied'}
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all text-slate-700 bg-white disabled:bg-slate-50 disabled:text-slate-400"
              >
                <option value="">Semua Provinsi</option>
                <option value="Jakarta">DKI Jakarta</option>
                <option value="Jawa Barat">Jawa Barat</option>
                <option value="Jawa Tengah">Jawa Tengah</option>
                <option value="Jawa Timur">Jawa Timur</option>
                <option value="Sulawesi Selatan">Sulawesi Selatan</option>
                <option value="Bali">Bali</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div>
              <select
                disabled={activeTab === 'applied'}
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all text-slate-700 bg-white disabled:bg-slate-50 disabled:text-slate-400"
              >
                <option value="">Semua Tipe Kerja</option>
                <option value="Full-time">Full-time</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setCategoryFilter('');
                  setLocationFilter('');
                  setTypeFilter('');
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                <i className="fa-solid fa-arrow-rotate-left"></i> Reset Filter
              </button>
              <div className="hidden lg:flex items-center justify-center px-3 py-2 bg-[#CCFBF1] text-[#16B3A3] font-bold text-xs rounded-xl whitespace-nowrap">
                {activeTab === 'applied' ? `${filteredAppliedJobs.length} Lamaran` : `${filteredJobs.length} Lowongan`}
              </div>
            </div>
          </div>
        </div>

        {activeTab === 'applied' ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            {appliedJobs.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 text-[#16B3A3] mx-auto flex items-center justify-center text-2xl mb-3 shadow-sm">
                  <i className="fa-solid fa-clipboard-check"></i>
                </div>
                <h3 className="text-base font-bold text-[#00193F] mb-1">
                  Belum Ada Riwayat Lamaran
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mb-5 leading-relaxed">
                  Anda belum pernah mengajukan lamaran ke lowongan pekerjaan mana pun. Jelajahi lowongan yang sesuai minat Anda dan kirimkan resume serta berkas profil terbaik Anda.
                </p>
                <button
                  type="button"
                  onClick={() => handleTabChange('all')}
                  className="px-5 py-2.5 rounded-lg bg-[#16B3A3] text-white font-semibold text-xs hover:bg-[#109485] transition-all shadow-sm inline-flex items-center gap-2"
                >
                  <i className="fa-solid fa-compass"></i> Jelajahi Semua Lowongan
                </button>
              </div>
            ) : filteredAppliedJobs.length === 0 ? (
              <div className="p-10 text-center text-slate-500 text-xs">
                Tidak ada riwayat lamaran yang cocok dengan pencarian "{search}".
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th scope="col" className="py-4 px-4 sm:px-6">Posisi &amp; Perusahaan</th>
                      <th scope="col" className="py-4 px-4">Tanggal Melamar</th>
                      <th scope="col" className="py-4 px-4">Berkas yang Dikirim</th>
                      <th scope="col" className="py-4 px-4 text-center">Status Lamaran</th>
                      <th scope="col" className="py-4 px-4 sm:px-6 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {filteredAppliedJobs.map((app) => {
                      const matchedJob = allJobs.find((j) => j.id === app.id);
                      const displayLogo = app.logo || matchedJob?.logo || '/assets/company-google.png';
                      const displayLocation = app.location || matchedJob?.location || 'Indonesia';
                      const displaySalary = app.salary || matchedJob?.salary || 'Sesuai Standar';

                      return (
                        <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-4 sm:px-6">
                            <div className="flex items-center gap-3">
                              <img
                                src={displayLogo}
                                alt={app.company}
                                className="w-10 h-10 rounded-xl object-contain p-1.5 bg-slate-50 border border-slate-200 shrink-0"
                              />
                              <div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const jobToOpen = matchedJob || app;
                                    openJobDetail(jobToOpen);
                                  }}
                                  className="font-bold text-[#00193F] leading-snug hover:text-[#16B3A3] text-left transition-colors cursor-pointer hover:underline block"
                                  title="Klik posisi untuk melihat detail lowongan"
                                >
                                  {app.title}
                                </button>
                                <p className="text-xs text-slate-500 font-medium mt-0.5">
                                  {app.company}
                                </p>
                                <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                                  <span className="flex items-center gap-1">
                                    <i className="fa-solid fa-location-dot text-[#16B3A3] text-[10px]"></i>
                                    {displayLocation}
                                  </span>
                                  <span>•</span>
                                  <span className="text-slate-600 font-medium">{displaySalary}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-600 font-medium">
                            <div className="flex items-center gap-1.5">
                              <i className="fa-regular fa-calendar text-slate-400"></i>
                              <span>{app.date || 'Hari ini'}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex flex-col gap-1 items-start text-xs">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                                <i className="fa-solid fa-file-pdf text-red-500 text-[10px]"></i>
                                <span className="truncate max-w-[150px]">{app.resumeName || 'Resume.pdf'}</span>
                              </span>
                              {app.expectedSalary && (
                                <span className="text-[11px] text-slate-500">
                                  Gaji: <strong>{app.expectedSalary}</strong>
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              <span>{app.status || 'Terkirim'}</span>
                            </span>
                          </td>
                          <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setViewApplicationModal(app)}
                                className="h-9 px-3.5 rounded-lg border border-slate-200 hover:border-[#16B3A3] text-slate-700 hover:text-[#16B3A3] bg-white hover:bg-teal-50/50 font-semibold text-xs transition-colors shadow-sm flex items-center gap-1.5"
                                title="Lihat salinan formulir berkas yang dikirim"
                              >
                                <i className="fa-solid fa-eye text-xs"></i>
                                <span>Lihat Berkas</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleWithdrawApplication(app.id, app.title)}
                                className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors"
                                title="Tarik / Batalkan Lamaran"
                                aria-label="Tarik / Batalkan Lamaran"
                              >
                                <i className="fa-solid fa-trash-can text-xs"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          /* Daftar Lowongan */
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            {filteredJobs.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 text-slate-400 mx-auto flex items-center justify-center text-xl mb-3">
                  <i className={`fa-solid ${activeTab === 'saved' ? 'fa-bookmark text-amber-400' : 'fa-briefcase'}`}></i>
                </div>
                <h3 className="text-base font-bold text-[#00193F] mb-1">
                  {activeTab === 'saved' ? 'Belum Ada Lowongan Tersimpan' : 'Tidak Ada Lowongan yang Cocok'}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                  {activeTab === 'saved'
                    ? 'Anda belum menandai lowongan pekerjaan ke daftar favorit. Klik ikon bookmark pada daftar untuk menyimpannya.'
                    : 'Coba ubah kata kunci pencarian, filter kategori, atau pilih provinsi lain.'}
                </p>
                {activeTab === 'saved' && (
                  <button
                    type="button"
                    onClick={() => handleTabChange('all')}
                    className="px-4 py-2 rounded-lg bg-[#16B3A3] text-white font-semibold text-xs hover:bg-[#109485] transition-colors"
                  >
                    Lihat Semua Lowongan
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th scope="col" className="py-4 px-4 sm:px-6">Posisi &amp; Perusahaan</th>
                      <th scope="col" className="py-4 px-4">Kategori &amp; Tipe</th>
                      <th scope="col" className="py-4 px-4">Rentang Gaji</th>
                      <th scope="col" className="py-4 px-4">Peminat</th>
                      <th scope="col" className="py-4 px-4 text-center">Batas Waktu</th>
                      <th scope="col" className="py-4 px-4 sm:px-6 text-right">Aksi Pelamar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {filteredJobs.map((job) => {
                      const isSaved = savedJobIds.includes(job.id);
                      const isApplied = appliedJobs.some((item) => item.id === job.id);
                      return (
                        <tr key={job.id} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="py-4 px-4 sm:px-6">
                            <div className="flex items-center gap-3">
                              <img
                                src={job.logo}
                                alt={job.company}
                                className="w-10 h-10 rounded-xl object-contain p-1.5 bg-slate-50 border border-slate-200 shrink-0"
                              />
                              <div>
                                <button
                                  type="button"
                                  onClick={() => openJobDetail(job)}
                                  className="font-bold text-[#00193F] leading-snug hover:text-[#16B3A3] text-left transition-colors cursor-pointer hover:underline block"
                                  title="Klik posisi untuk melihat detail pekerjaan"
                                >
                                  {job.title}
                                </button>
                                <p className="text-xs text-slate-500 font-medium mt-0.5">
                                  {job.company}
                                </p>
                                <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                                  <i className="fa-solid fa-location-dot text-[#16B3A3] text-[10px]"></i>
                                  <span>{job.location}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex flex-col gap-1 items-start">
                              <span className="font-semibold text-slate-700">{job.categoryLabel}</span>
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#EFF6FF] text-[#1D4ED8]">
                                {job.type}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-semibold text-[#00193F]">
                            {job.salary}
                          </td>
                          <td className="py-4 px-4 font-bold text-slate-700">
                            {job.applicants}
                          </td>
                          <td className="py-4 px-4 text-center text-xs text-slate-500 font-medium">
                            {job.deadline}
                          </td>
                          <td className="py-4 px-4 sm:px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => handleSave(job)}
                                className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors border ${isSaved
                                    ? 'text-amber-500 bg-amber-50 border-amber-200'
                                    : 'text-slate-400 hover:text-amber-500 hover:bg-slate-50 border-slate-200'
                                  }`}
                                title={isSaved ? 'Tersimpan di Favorit' : 'Simpan ke Favorit'}
                                aria-label={isSaved ? 'Tersimpan di Favorit' : 'Simpan ke Favorit'}
                              >
                                <i className={`fa-bookmark ${isSaved ? 'fa-solid text-amber-500' : 'fa-regular'} text-sm`}></i>
                              </button>
                              {job.isClosed ? (
                                <span className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-400 font-semibold text-xs whitespace-nowrap cursor-not-allowed">
                                  Sudah Ditutup
                                </span>
                              ) : isApplied ? (
                                <span className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-emerald-50 text-emerald-700 font-semibold text-xs whitespace-nowrap border border-emerald-200">
                                  <i className="fa-solid fa-circle-check text-emerald-500 text-[11px]"></i> Sudah Dilamar
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleApplyClick(job)}
                                  className="h-9 px-4 rounded-lg bg-[#16B3A3] hover:bg-[#109485] text-white font-medium text-xs transition-colors whitespace-nowrap shadow-sm"
                                >
                                  Lamar Sekarang
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </main>

      {toastVisible && (
        <div className="fixed top-24 right-5 z-50 bg-[#00193F] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#16B3A3] text-xs sm:text-sm font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <i className="fa-solid fa-circle-check text-[#16B3A3] text-base"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      <JobDetailModal
        isOpen={detailModalOpen}
        job={selectedJobDetail}
        onClose={closeJobDetail}
        onApply={(job) => {
          closeJobDetail();
          handleApplyClick(job);
        }}
        onSave={handleSave}
        isSaved={selectedJobDetail ? savedJobIds.includes(selectedJobDetail.id) : false}
        isApplied={selectedJobDetail ? appliedJobs.some((item) => item.id === selectedJobDetail.id) : false}
      />



      <JobApplyModal
        isOpen={applyModalOpen}
        job={selectedJobToApply}
        onClose={() => setApplyModalOpen(false)}
        onSubmit={handleApplySubmit}
        user={user}
        candidateName={candidateName}
        setCandidateName={setCandidateName}
        candidateEmail={candidateEmail}
        setCandidateEmail={setCandidateEmail}
        candidatePhone={candidatePhone}
        setCandidatePhone={setCandidatePhone}
        resumeOption={resumeOption}
        setResumeOption={setResumeOption}
        uploadedResumeName={uploadedResumeName}
        onUploadResume={handleResumeUpload}
        coverLetter={coverLetter}
        setCoverLetter={setCoverLetter}
        portfolioUrl={portfolioUrl}
        setPortfolioUrl={setPortfolioUrl}
        expectedSalary={expectedSalary}
        setExpectedSalary={setExpectedSalary}
      />

      <ViewApplicationModal
        application={viewApplicationModal}
        onClose={() => setViewApplicationModal(null)}
      />

      <AuthRequiredModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        title={authModal.title}
        message={authModal.message}
        actionType={authModal.actionType}
        jobTitle={authModal.jobTitle}
        companyName={authModal.companyName}
      />
    </div>
  );
}
