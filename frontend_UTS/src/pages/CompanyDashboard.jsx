import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CompanyCandidateModal from '../components/CompanyCandidateModal';
import CompanyEditJobModal from '../components/CompanyEditJobModal';

export default function CompanyDashboard() {
  const { user, logout, updateCompanyProfile } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active Tab: 'dashboard' | 'jobs' | 'create-job' | 'applicants' | 'profile'
  const validTabs = ['dashboard', 'jobs', 'create-job', 'applicants', 'profile'];
  const tabFromUrl = searchParams.get('tab');

  const [activeTab, setActiveTabState] = useState(() => {
    if (tabFromUrl && validTabs.includes(tabFromUrl)) {
      return tabFromUrl;
    }
    return 'dashboard';
  });

  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    setSearchParams(tab === 'dashboard' ? {} : { tab }, { replace: true });
  };

  useEffect(() => {
    if (tabFromUrl && validTabs.includes(tabFromUrl) && tabFromUrl !== activeTab) {
      setActiveTabState(tabFromUrl);
    } else if (!tabFromUrl && activeTab !== 'dashboard') {
      setActiveTabState('dashboard');
    }
  }, [tabFromUrl]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  };

  // State profil perusahaan
  const [companyProfile, setCompanyProfile] = useState(() => {
    const saved = localStorage.getItem('ayokerja_current_company');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && (parsed.name === 'daniramadh47' || !parsed.name)) {
          parsed.name = 'PT Google Indonesia';
        }
        return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    const rawName = user?.namaPerusahaan;
    const isUsername = rawName === 'daniramadh47' || (user?.email && rawName === user.email.split('@')[0]);
    return {
      name: rawName && !isUsername ? rawName : 'PT Google Indonesia',
      email: user?.email || 'recruitment@google.co.id',
      industry: user?.industri || 'Teknologi Informasi & SaaS',
      employeeSize: user?.ukuranKaryawan || '500 - 1.000 Karyawan',
      address: user?.lokasi || 'Sentral Senayan II, Jl. Asia Afrika No.8, Gelora, Jakarta Pusat',
      website: user?.website || 'https://careers.google.com',
      linkedin: user?.linkedin || 'https://linkedin.com/company/google-indonesia',
      instagram: user?.instagram || '@googleindonesia',
      description:
        user?.deskripsi ||
        'Perusahaan teknologi multinasional terkemuka penyedia ekosistem mesin pencari, komputasi awan Google Cloud, dan infrastruktur digital global. Kami berkomitmen membangun lingkungan kerja inklusif dan mendorong inovasi digital bagi Indonesia.',
      logo: user?.logo || '/assets/company-google.png',
      banner: user?.banner || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    };
  });

  useEffect(() => {
    localStorage.setItem('ayokerja_current_company', JSON.stringify(companyProfile));
  }, [companyProfile]);

  // State daftar lowongan
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('ayokerja_company_jobs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: 1,
        title: 'Senior Cloud & DevOps Engineer',
        department: 'Software & AI',
        type: 'Full-time',
        workPolicy: 'Hybrid',
        location: 'Jakarta Selatan',
        minSalary: 28,
        maxSalary: 45,
        showSalary: true,
        experienceLevel: 'Senior Level',
        deadline: '2026-11-15',
        createdAt: '2026-10-10',
        status: 'Aktif',
        description:
          'Mengembangkan arsitektur microservices Google Cloud, container orchestration Kubernetes, dan optimasi query data berskala global.',
        qualifications: 'Minimal 4 tahun pengalaman di ekosistem AI, Python/TypeScript, GCP, dan Docker/Kubernetes.',
        skills: ['AI / ML', 'Google Cloud', 'TypeScript', 'Kubernetes', 'Python'],
        applicantsCount: 142,
      },
      {
        id: 2,
        title: 'Cloud Solutions Architect',
        department: 'Cloud & Infrastructure',
        type: 'Full-time',
        workPolicy: 'Full-time',
        location: 'Jakarta Pusat',
        minSalary: 25,
        maxSalary: 40,
        showSalary: true,
        experienceLevel: 'Senior Level',
        deadline: '2026-11-20',
        createdAt: '2026-10-14',
        status: 'Aktif',
        description:
          'Merancang arsitektur multi-region enterprise cloud, disaster recovery, dan optimasi efisiensi biaya infrastruktur klien korporat.',
        qualifications: 'Memiliki sertifikasi Cloud Professional Architect dan pengalaman 5+ tahun dalam perancangan cloud infra.',
        skills: ['Cloud Architecture', 'Terraform', 'DevOps', 'Security', 'GCP'],
        applicantsCount: 74,
      },
      {
        id: 3,
        title: 'Senior UI/UX & Visual Designer',
        department: 'UI/UX Design',
        type: 'Remote',
        workPolicy: 'Remote',
        location: 'Bandung (Remote)',
        minSalary: 18,
        maxSalary: 26,
        showSalary: true,
        experienceLevel: 'Mid-Senior Level',
        deadline: '2026-11-10',
        createdAt: '2026-10-18',
        status: 'Aktif',
        description:
          'Merancang antarmuka sistem desain terpusat, memimpin user research, prototyping interaktif, dan validasi kegunaan produk.',
        qualifications: 'Menguasai Figma, design token, riset usability, dan memiliki portofolio UX mobile/web yang kuat.',
        skills: ['Figma', 'UI/UX', 'Design System', 'User Research', 'Prototyping'],
        applicantsCount: 56,
      },
      {
        id: 4,
        title: 'Associate Product Growth Specialist',
        department: 'Product Management',
        type: 'Internship',
        workPolicy: 'Hybrid',
        location: 'Jakarta Selatan',
        minSalary: 6,
        maxSalary: 9,
        showSalary: false,
        experienceLevel: 'Entry / Magang',
        deadline: '2026-10-30',
        createdAt: '2026-10-01',
        status: 'Ditutup',
        description:
          'Membantu analisis metrik akuisisi pengguna, funnel konversi, dan eksperimen fitur pertumbuhan produk aplikasi.',
        qualifications: 'Mahasiswa tingkat akhir atau fresh graduate dengan kemampuan analisis data dan komunikasi yang baik.',
        skills: ['Product Analytics', 'Growth Marketing', 'SQL', 'A/B Testing'],
        applicantsCount: 38,
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('ayokerja_company_jobs', JSON.stringify(jobs));
  }, [jobs]);

  // State data pelamar
  const [applicants, setApplicants] = useState(() => {
    const saved = localStorage.getItem('ayokerja_company_applicants');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: 101,
        name: 'Andi Pratama, S.Kom.',
        email: 'andi.pratama@gmail.com',
        phone: '0812-8899-7711',
        jobId: 1,
        jobTitle: 'Senior Cloud & DevOps Engineer',
        appliedDate: '2026-10-25',
        stage: 'baru', // 'baru' | 'review' | 'interview' | 'diterima' | 'ditolak'
        matchScore: 96,
        skills: ['Python', 'TensorFlow', 'GCP', 'TypeScript'],
        resumeName: 'CV_Andi_Pratama_AI_Engineer.pdf',
        experience: '4 Tahun di Tech Unicorn',
        education: 'S1 Teknik Informatika, Institut Teknologi Bandung',
        coverNote: 'Sangat antusias berkontribusi dalam implementasi model LLM & cloud infra berskala enterprise di Google Indonesia.',
      },
      {
        id: 102,
        name: 'Siti Rahmawati',
        email: 'siti.rahmawati@uiux.design',
        phone: '0857-1122-3344',
        jobId: 3,
        jobTitle: 'Senior UI/UX & Visual Designer',
        appliedDate: '2026-10-24',
        stage: 'interview',
        matchScore: 94,
        skills: ['Figma', 'Design System', 'User Research', 'Tailwind'],
        resumeName: 'Portfolio_CV_Siti_Rahmawati.pdf',
        experience: '3.5 Tahun di Digital Product Agency',
        education: 'S1 Desain Komunikasi Visual, Universitas Indonesia',
        coverNote: 'Berpengalaman membangun design system terintegrasi dari nol dan meningkatkan conversion rate produk hingga 35%.',
      },
      {
        id: 103,
        name: 'Fajar Nugraha',
        email: 'fajar.nugraha@cloudinfra.net',
        phone: '0813-4455-6677',
        jobId: 2,
        jobTitle: 'Cloud Solutions Architect',
        appliedDate: '2026-10-25',
        stage: 'baru',
        matchScore: 91,
        skills: ['Terraform', 'Kubernetes', 'GCP Architect', 'Docker'],
        resumeName: 'CV_Fajar_CloudArchitect.pdf',
        experience: '5 Tahun di Banking IT & Multi-cloud',
        education: 'S1 Sistem Informasi, Universitas Gadjah Mada',
        coverNote: 'Memiliki sertifikasi Google Cloud Professional Architect & pengalaman mengelola lebih dari 200 microservices clusters.',
      },
      {
        id: 104,
        name: 'Dimas Aditya Saputra',
        email: 'dimas.aditya@gmail.com',
        phone: '0821-9988-1122',
        jobId: 1,
        jobTitle: 'Senior Cloud & DevOps Engineer',
        appliedDate: '2026-10-23',
        stage: 'review',
        matchScore: 88,
        skills: ['Python', 'Docker', 'FastAPI', 'PyTorch'],
        resumeName: 'Resume_Dimas_Aditya.pdf',
        experience: '3 Tahun di AI Research Lab',
        education: 'S2 Ilmu Komputer, Institut Teknologi Sepuluh Nopember',
        coverNote: 'Berfokus pada fine-tuning model open-source dan deployment inferensi berkecepatan tinggi.',
      },
      {
        id: 105,
        name: 'Jessica Wong',
        email: 'jessica.wong@gmail.com',
        phone: '0811-2233-4455',
        jobId: 1,
        jobTitle: 'Senior Cloud & DevOps Engineer',
        appliedDate: '2026-10-18',
        stage: 'diterima',
        matchScore: 98,
        skills: ['AI / ML', 'Kubernetes', 'Go', 'GCP', 'TypeScript'],
        resumeName: 'CV_Jessica_Wong_Lead.pdf',
        experience: '6 Tahun di Silicon Valley & SEA Unicorn',
        education: 'B.Sc Computer Science, National University of Singapore',
        coverNote: 'Tawaran kerja (Offering Letter) telah disetujui. Siap bergabung per 1 Desember 2026.',
      },
      {
        id: 106,
        name: 'Reza Kurniawan',
        email: 'reza.kurniawan@corp.id',
        phone: '0819-0011-2233',
        jobId: 4,
        jobTitle: 'Associate Product Growth Specialist',
        appliedDate: '2026-10-15',
        stage: 'ditolak',
        matchScore: 68,
        skills: ['Marketing', 'Social Media', 'Excel'],
        resumeName: 'Resume_Reza_K.pdf',
        experience: '1 Tahun di E-Commerce Support',
        education: 'S1 Manajemen Bisnis, Universitas Padjadjaran',
        coverNote: 'Kualifikasi teknis dan analisis data belum memenuhi standar peran Growth Product saat ini.',
      },
      {
        id: 107,
        name: 'Dewi Lestari',
        email: 'dewi.lestari@desain.id',
        phone: '0812-7766-5544',
        jobId: 3,
        jobTitle: 'Senior UI/UX & Visual Designer',
        appliedDate: '2026-10-21',
        stage: 'review',
        matchScore: 89,
        skills: ['Figma', 'Interaction Design', 'Micro-copy', 'Design Tokens'],
        resumeName: 'CV_Dewi_Lestari_UIUX.pdf',
        experience: '3 Tahun di Fintech Startup',
        education: 'S1 Desain Produk, ITB',
        coverNote: 'Spesialis antarmuka ramah pengguna pada aplikasi perbankan digital dan e-wallet.',
      },
      {
        id: 108,
        name: 'Budi Hartono',
        email: 'budi.hartono@engineer.id',
        phone: '0878-3344-5566',
        jobId: 2,
        jobTitle: 'Cloud Solutions Architect',
        appliedDate: '2026-10-20',
        stage: 'interview',
        matchScore: 93,
        skills: ['AWS', 'GCP', 'Linux Kernel', 'Ansible', 'DevSecOps'],
        resumeName: 'CV_Budi_Hartono_DevOps.pdf',
        experience: '4.5 Tahun di FinTech Enterprise',
        education: 'S1 Teknik Elektro, Universitas Indonesia',
        coverNote: 'Jadwal wawancara teknis arsitektur sistem terjadwal pada Kamis, 29 Oktober 2026.',
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('ayokerja_company_applicants', JSON.stringify(applicants));
  }, [applicants]);

  // Feed aktivitas
  const [activities] = useState([
    {
      id: 1,
      type: 'applicant',
      icon: 'fa-user-plus text-emerald-500 bg-emerald-50',
      title: 'Pelamar Baru Masuk',
      desc: 'Andi Pratama melamar untuk posisi Senior Cloud & DevOps Engineer',
      time: '15 menit yang lalu',
    },
    {
      id: 2,
      type: 'interview',
      icon: 'fa-calendar-check text-blue-500 bg-blue-50',
      title: 'Jadwal Interview Terkonfirmasi',
      desc: 'Siti Rahmawati (UI/UX) dijadwalkan wawancara teknis besok, 10:00 WIB',
      time: '1 jam yang lalu',
    },
    {
      id: 3,
      type: 'stage',
      icon: 'fa-arrows-rotate text-purple-500 bg-purple-50',
      title: 'Perubahan Tahap Seleksi',
      desc: 'Dimas Aditya Saputra dipindahkan ke tahap Screening & Review',
      time: '3 jam yang lalu',
    },
    {
      id: 4,
      type: 'job',
      icon: 'fa-briefcase text-teal-500 bg-teal-50',
      title: 'Lowongan Ditutup',
      desc: 'Lowongan Associate Product Growth Specialist telah ditutup',
      time: 'Kemarin, 16:30 WIB',
    },
    {
      id: 5,
      type: 'hired',
      icon: 'fa-circle-check text-emerald-600 bg-emerald-100',
      title: 'Kandidat Menerima Tawaran',
      desc: 'Jessica Wong menerima Offering Letter posisi Senior Cloud & DevOps Engineer',
      time: '2 hari yang lalu',
    },
  ]);

  // Form buat lowongan
  const [createStep, setCreateStep] = useState(1);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobDept, setNewJobDept] = useState('Software & AI');
  const [newJobType, setNewJobType] = useState('Full-time');
  const [newJobPolicy, setNewJobPolicy] = useState('Hybrid');
  const [newJobLocation, setNewJobLocation] = useState('Jakarta Selatan, DKI Jakarta');
  const [newJobExp, setNewJobExp] = useState('Mid-Senior Level');
  const [newJobMinSalary, setNewJobMinSalary] = useState('20');
  const [newJobMaxSalary, setNewJobMaxSalary] = useState('35');
  const [newJobShowSalary, setNewJobShowSalary] = useState(true);
  const [newJobDeadline, setNewJobDeadline] = useState('2026-11-30');
  const [newJobDesc, setNewJobDesc] = useState('');
  const [newJobQual, setNewJobQual] = useState('');
  const [newSkillInput, setNewSkillInput] = useState('');
  const [newJobSkills, setNewJobSkills] = useState(['React.js', 'TypeScript', 'Tailwind CSS', 'REST API']);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkillInput.trim() && !newJobSkills.includes(newSkillInput.trim())) {
      setNewJobSkills([...newJobSkills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setNewJobSkills(newJobSkills.filter((s) => s !== skillToRemove));
  };

  const handleCreateJobSubmit = (e) => {
    e.preventDefault();
    const createdJob = {
      id: Date.now(),
      title: newJobTitle,
      department: newJobDept,
      type: newJobType,
      workPolicy: newJobPolicy,
      location: newJobLocation,
      minSalary: Number(newJobMinSalary) || 0,
      maxSalary: Number(newJobMaxSalary) || 0,
      showSalary: newJobShowSalary,
      experienceLevel: newJobExp,
      deadline: newJobDeadline,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Aktif',
      description: newJobDesc || 'Peran ini bertanggung jawab untuk mengembangkan dan memelihara aplikasi berkinerja tinggi.',
      qualifications: newJobQual || 'Minimal 2 tahun pengalaman kerja relevan di bidang terkait.',
      skills: newJobSkills.length > 0 ? newJobSkills : ['Software Engineering', 'Problem Solving'],
      applicantsCount: 0,
    };

    setJobs([createdJob, ...jobs]);
    showToast(`Lowongan "${createdJob.title}" berhasil dipublikasikan!`);

    // Reset Form
    setNewJobTitle('');
    setNewJobDesc('');
    setNewJobQual('');
    setCreateStep(1);
    setActiveTab('jobs');
  };

  // Modal edit lowongan
  const [editJobModalOpen, setEditJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const openEditJob = (job) => {
    setEditingJob({ ...job });
    setEditJobModalOpen(true);
  };

  const handleSaveEditedJob = (e) => {
    e.preventDefault();
    setJobs(jobs.map((j) => (j.id === editingJob.id ? editingJob : j)));
    setEditJobModalOpen(false);
    showToast(`Perubahan lowongan "${editingJob.title}" berhasil disimpan!`);
  };

  const toggleJobStatus = (id) => {
    setJobs(
      jobs.map((j) => {
        if (j.id === id) {
          const nextStatus = j.status === 'Aktif' ? 'Ditutup' : 'Aktif';
          showToast(`Status lowongan diubah menjadi "${nextStatus}"`);
          return { ...j, status: nextStatus };
        }
        return j;
      })
    );
  };

  const handleDeleteJob = (id, title) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus lowongan "${title}"?`)) {
      setJobs(jobs.filter((j) => j.id !== id));
      showToast(`Lowongan "${title}" berhasil dihapus.`);
    }
  };

  // State seleksi pelamar
  const [atsViewMode, setAtsViewMode] = useState('kanban');
  const [atsFilterJobId, setAtsFilterJobId] = useState('all');
  const [atsSearchQuery, setAtsSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidateModalOpen, setCandidateModalOpen] = useState(false);

  const filteredApplicants = useMemo(() => {
    return applicants.filter((app) => {
      const matchJob = atsFilterJobId === 'all' || String(app.jobId) === String(atsFilterJobId);
      const matchSearch =
        app.name.toLowerCase().includes(atsSearchQuery.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(atsSearchQuery.toLowerCase()) ||
        app.skills.some((s) => s.toLowerCase().includes(atsSearchQuery.toLowerCase()));
      return matchJob && matchSearch;
    });
  }, [applicants, atsFilterJobId, atsSearchQuery]);

  const handleStageChange = (applicantId, newStage) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === applicantId ? { ...a, stage: newStage } : a))
    );
    showToast(`Status pelamar berhasil diperbarui ke tahap "${getStageLabel(newStage)}"`);
  };

  const openCandidateDetail = (candidate) => {
    setSelectedCandidate(candidate);
    setCandidateModalOpen(true);
  };

  const stages = [
    { key: 'baru', label: 'Terkirim / Baru', color: 'border-blue-400 bg-blue-50/50 text-blue-700', badge: 'bg-blue-100 text-blue-700' },
    { key: 'review', label: 'Di-review', color: 'border-amber-400 bg-amber-50/50 text-amber-700', badge: 'bg-amber-100 text-amber-700' },
    { key: 'interview', label: 'Interview', color: 'border-purple-400 bg-purple-50/50 text-purple-700', badge: 'bg-purple-100 text-purple-700' },
    { key: 'diterima', label: 'Diterima', color: 'border-emerald-400 bg-emerald-50/50 text-emerald-700', badge: 'bg-emerald-100 text-emerald-700' },
    { key: 'ditolak', label: 'Ditolak', color: 'border-rose-300 bg-rose-50/50 text-rose-700', badge: 'bg-rose-100 text-rose-700' },
  ];

  function getStageLabel(stageKey) {
    const found = stages.find((s) => s.key === stageKey);
    return found ? found.label : stageKey;
  }

  // State form profil
  const [profileForm, setProfileForm] = useState({ ...companyProfile });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setCompanyProfile({ ...profileForm });
    if (updateCompanyProfile) {
      updateCompanyProfile({
        namaPerusahaan: profileForm.name,
        email: profileForm.email,
        industri: profileForm.industry,
        ukuranKaryawan: profileForm.employeeSize,
        lokasi: profileForm.address,
        website: profileForm.website,
        linkedin: profileForm.linkedin,
        instagram: profileForm.instagram,
        deskripsi: profileForm.description,
        logo: profileForm.logo,
        banner: profileForm.banner,
      });
    }
    showToast('Profil dan informasi perusahaan berhasil diperbarui!');
  };

  const handleLogoFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih berkas gambar yang valid (PNG, JPG, JPEG, WEBP, atau SVG).');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran gambar terlalu besar! Maksimal ukuran berkas adalah 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setProfileForm((prev) => ({
        ...prev,
        logo: event.target.result,
      }));
      showToast('Foto logo berhasil dipilih! Pratinjau langsung diperbarui.');
    };
    reader.readAsDataURL(file);
  };

  const handleBannerPreset = (url) => {
    setProfileForm({ ...profileForm, banner: url });
  };

  const handleLogout = () => {
    logout();
    alert('Anda telah keluar dari Portal Perusahaan.');
    navigate('/');
  };

  // Metrik Ringkasan
  const totalActiveJobs = jobs.filter((j) => j.status === 'Aktif').length;
  const totalApplicants = applicants.length;
  const totalInterviews = applicants.filter((a) => a.stage === 'interview').length;
  const totalHired = applicants.filter((a) => a.stage === 'diterima').length;



  return (
    <div className="bg-[#F8FAFC] text-[#0F172A] font-sans antialiased min-h-screen flex flex-col">
      {toastVisible && (
        <div className="fixed top-24 right-5 z-50 bg-[#00193F] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#16B3A3] text-xs sm:text-sm font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <i className="fa-solid fa-circle-check text-[#16B3A3] text-base"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      <header className="w-full bg-gradient-to-r from-[#00193F] to-[#16B3A3] sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/assets/logo.png"
                alt="AYOKERJA! Logo"
                className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <span className="text-2xl font-extrabold text-white tracking-wide">AYOKERJA!</span>
            </Link>

            <nav className="hidden md:flex items-center gap-7">
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className={
                  activeTab === 'dashboard'
                    ? 'text-white font-bold text-sm border-b-2 border-white pb-1 transition-all'
                    : 'text-white/90 hover:text-white text-sm font-medium transition-colors'
                }
              >
                Dashboard
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('jobs')}
                className={
                  activeTab === 'jobs'
                    ? 'text-white font-bold text-sm border-b-2 border-white pb-1 transition-all'
                    : 'text-white/90 hover:text-white text-sm font-medium transition-colors'
                }
              >
                Kelola Lowongan
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('create-job')}
                className={
                  activeTab === 'create-job'
                    ? 'text-white font-bold text-sm border-b-2 border-white pb-1 transition-all'
                    : 'text-white/90 hover:text-white text-sm font-medium transition-colors'
                }
              >
                Pasang Lowongan
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('applicants')}
                className={
                  activeTab === 'applicants'
                    ? 'text-white font-bold text-sm border-b-2 border-white pb-1 transition-all'
                    : 'text-white/90 hover:text-white text-sm font-medium transition-colors'
                }
              >
                Kelola Pelamar
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={
                  activeTab === 'profile'
                    ? 'text-white font-bold text-sm border-b-2 border-white pb-1 transition-all'
                    : 'text-white/90 hover:text-white text-sm font-medium transition-colors'
                }
              >
                Profil Perusahaan
              </button>
            </nav>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <div
                className="flex items-center gap-2.5 bg-white/15 text-white pl-2 pr-3.5 py-1.5 rounded-full border border-white/25 shadow-sm select-none"
              >
                <div className="w-7 h-7 rounded-full bg-white p-0.5 flex items-center justify-center font-bold text-xs ring-2 ring-white/80 overflow-hidden shrink-0 shadow-sm">
                  <img
                    src={companyProfile.logo || '/assets/company-google.png'}
                    alt="Logo Perusahaan"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-white max-w-[130px] sm:max-w-[170px] truncate leading-tight">
                    {companyProfile.name === 'daniramadh47' ? 'PT Google Indonesia' : companyProfile.name}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-rose-600/90 text-white border border-white/20 hover:border-rose-400 text-xs font-semibold transition-all shadow-sm cursor-pointer group"
                title="Keluar dari Portal Perusahaan"
              >
                <i className="fa-solid fa-arrow-right-from-bracket text-xs text-white/80 group-hover:text-white transition-colors"></i>
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </div>

            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none"
                aria-label="Toggle navigation"
              >
                <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#00193F] border-t border-white/15 px-4 pt-3 pb-6 space-y-2 shadow-xl">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold ${activeTab === 'dashboard' ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10'
                }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                setActiveTab('jobs');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold ${activeTab === 'jobs' ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10'
                }`}
            >
              Kelola Lowongan
            </button>
            <button
              onClick={() => {
                setActiveTab('create-job');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold ${activeTab === 'create-job' ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10'
                }`}
            >
              Pasang Lowongan Baru
            </button>
            <button
              onClick={() => {
                setActiveTab('applicants');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold ${activeTab === 'applicants' ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10'
                }`}
            >
              Kelola Pelamar
            </button>
            <button
              onClick={() => {
                setActiveTab('profile');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold ${activeTab === 'profile' ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10'
                }`}
            >
              Profil Perusahaan
            </button>
            <div className="pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-rose-300 hover:bg-rose-500/20 flex items-center gap-2"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Keluar
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        
        
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-13 h-13 rounded-2xl bg-[#CCFBF1] text-[#16B3A3] flex items-center justify-center text-2xl shrink-0">
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#00193F]">{totalActiveJobs}</div>
                  <div className="text-xs text-slate-500 font-semibold">Lowongan Aktif Tayang</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-13 h-13 rounded-2xl bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center text-2xl shrink-0">
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#00193F]">{totalApplicants}</div>
                  <div className="text-xs text-slate-500 font-semibold">Total Lamaran Masuk</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-13 h-13 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl shrink-0">
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#00193F]">{totalInterviews}</div>
                  <div className="text-xs text-slate-500 font-semibold">Jadwal Interview Mendatang</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl shrink-0">
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#00193F]">{totalHired}</div>
                  <div className="text-xs text-slate-500 font-semibold">Kandidat Diterima (Hired)</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 mb-6 gap-3">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#00193F] flex items-center gap-2.5">
                    <span>Jadwal Interview Mendatang</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Daftar kandidat pelamar yang telah dijadwalkan untuk sesi wawancara teknis dan manajerial
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('applicants')}
                    className="text-xs font-semibold text-[#16B3A3] hover:text-[#109485] px-3 py-1 rounded-full hover:bg-teal-50 transition-colors"
                  >
                    Buka di ATS Kanban &rarr;
                  </button>
                </div>
              </div>

              {applicants.filter((a) => a.stage === 'interview').length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <i className="fa-solid fa-calendar-xmark text-3xl text-slate-300 mb-2"></i>
                  <p className="text-sm font-bold text-slate-600">Belum ada sesi wawancara yang dijadwalkan</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                    Kandidat yang Anda pindahkan ke tahap Interview di ATS akan otomatis muncul dalam agenda wawancara ini.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('applicants')}
                    className="mt-4 px-4 py-2 rounded-xl bg-[#16B3A3] hover:bg-[#109485] text-white text-xs font-bold shadow-sm transition-all"
                  >
                    Buka Kelola Pelamar
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {applicants
                    .filter((a) => a.stage === 'interview')
                    .map((cand) => (
                      <div
                        key={cand.id}
                        className="p-5 rounded-2xl bg-slate-50/70 hover:bg-slate-50 border border-slate-200/80 flex flex-col justify-between transition-all hover:shadow-sm"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-3 mb-2.5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00193F] to-[#16B3A3] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                                {cand.name.charAt(0)}
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-[#00193F]">{cand.name}</h4>
                                <p className="text-xs text-slate-500 font-medium">{cand.jobTitle}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1.5 text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-100 my-3">
                            <div className="flex items-center gap-2 text-purple-700 font-semibold">
                              <i className="fa-solid fa-video text-xs w-4 text-center"></i>
                              <span>Online via Google Meet</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                              <i className="fa-solid fa-clock text-xs w-4 text-center"></i>
                              <span>Terjadwal: {cand.coverNote.includes('Kamis') ? 'Kamis, 29 Okt 2026' : 'Besok, 10:00 WIB'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                              <i className="fa-solid fa-graduation-cap text-xs w-4 text-center"></i>
                              <span className="truncate">{cand.education}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                          <span className="text-[11px] text-slate-400">
                            <i className="fa-solid fa-phone mr-1"></i> {cand.phone}
                          </span>
                          <button
                            type="button"
                            onClick={() => openCandidateDetail(cand)}
                            className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-[#16B3A3] font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>Lihat Detail Berkas</span>
                            <i className="fa-solid fa-arrow-right text-[10px]"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-4 px-5">Posisi Pekerjaan</th>
                      <th className="py-4 px-4">Tipe &amp; Lokasi</th>
                      <th className="py-4 px-4">Rentang Gaji</th>
                      <th className="py-4 px-4">Pelamar Masuk</th>
                      <th className="py-4 px-4">Batas Tayang</th>
                      <th className="py-4 px-4">Status</th>
                      <th className="py-4 px-5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {jobs.map((job) => (
                      <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-5">
                          <div className="font-bold text-[#00193F]">{job.title}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1.5">
                            <span className="font-medium text-slate-600">{job.department}</span>
                            <span>•</span>
                            <span>Dibuat: {job.createdAt}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-col gap-1 items-start">
                            <span className="font-semibold text-slate-700">{job.workPolicy}</span>
                            <span className="text-[11px] text-slate-400">{job.location}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 font-semibold text-slate-800">
                          {job.showSalary ? `Rp ${job.minSalary} - ${job.maxSalary} Juta` : 'Dirahasiakan'}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className="inline-flex items-center rounded-full font-bold text-xs text-slate-700"
                          >
                            <span>{job.applicantsCount} Pelamar</span>
                          </span>
                        </td>
                        <td className="py-4 px-4 text-xs text-slate-500 font-medium">
                          {job.deadline}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1 ${job.status === 'Aktif'
                              }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${job.status === 'Aktif'
                                ? 'bg-emerald-500'
                                : job.status === 'Draft'
                                  ? 'bg-blue-500'
                                  : 'bg-rose-500'
                                }`}
                            ></span>
                            {job.status}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => openEditJob(job)}
                              className="p-2 rounded-xl text-slate-500"
                              title="Edit Parameter Lowongan"
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleJobStatus(job.id)}
                              className={`p-2 rounded-xl transition-colors ${job.status === 'Aktif'
                                ? 'text-slate-500'
                                : 'text-slate-500'
                                }`}
                              title={job.status === 'Aktif' ? 'Nonaktifkan / Tutup Lowongan' : 'Aktifkan Kembali Lowongan'}
                            >
                              <i className={`fa-solid ${job.status === 'Aktif' ? 'fa-pause' : 'fa-play'}`}></i>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteJob(job.id, job.title)}
                              className="p-2 rounded-xl text-slate-400"
                              title="Hapus Lowongan"
                            >
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        
        
        {activeTab === 'create-job' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm text-center">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#00193F]">
                Formulir Pasang Lowongan Baru
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg mx-auto">
                Publikasikan lowongan kerja terstruktur untuk menjangkau jutaan talenta profesional di seluruh Indonesia.
              </p>

              <div className="flex items-center justify-center gap-3 sm:gap-6 mt-6 max-w-md mx-auto">
                {[
                  { step: 1, title: 'Info Dasar' },
                  { step: 2, title: 'Kompensasi' },
                  { step: 3, title: 'Kualifikasi' },
                  { step: 4, title: 'Pratinjau' },
                ].map((s) => (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => setCreateStep(s.step)}
                    className="flex flex-col items-center gap-1.5 focus:outline-none"
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${createStep === s.step
                        ? 'bg-[#16B3A3] text-white ring-4 ring-[#CCFBF1]'
                        : createStep > s.step
                          ? 'bg-[#00193F] text-white'
                          : 'bg-slate-100 text-slate-400'
                        }`}
                    >
                      {createStep > s.step ? <i className="fa-solid fa-check text-[11px]"></i> : s.step}
                    </div>
                    <span
                      className={`text-[11px] font-semibold ${createStep === s.step ? 'text-[#16B3A3]' : 'text-slate-400'
                        }`}
                    >
                      {s.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleCreateJobSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              {createStep === 1 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <h3 className="text-base font-bold text-[#00193F] border-b border-slate-100 pb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#16B3A3] text-white text-xs flex items-center justify-center font-bold">1</span>
                    Informasi Dasar Pekerjaan
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Judul Posisi Lowongan *</label>
                    <input
                      type="text"
                      required
                      value={newJobTitle}
                      onChange={(e) => setNewJobTitle(e.target.value)}
                      placeholder="Contoh: Senior Fullstack React & Node.js Engineer"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Departemen / Kategori *</label>
                      <select
                        value={newJobDept}
                        onChange={(e) => setNewJobDept(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] bg-white text-slate-700"
                      >
                        <option value="Software & AI">Software Engineering & AI</option>
                        <option value="Cloud & Infrastructure">Cloud Infrastructure & DevOps</option>
                        <option value="UI/UX Design">UI/UX & Product Design</option>
                        <option value="Product Management">Product Management</option>
                        <option value="Data & Analytics">Data Science & Analytics</option>
                        <option value="Marketing & Growth">Marketing & Brand</option>
                        <option value="Operations & Supply Chain">Operations & Supply Chain</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Tipe Pekerjaan *</label>
                      <select
                        value={newJobType}
                        onChange={(e) => setNewJobType(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] bg-white text-slate-700"
                      >
                        <option value="Full-time">Full-time (Penuh Waktu)</option>
                        <option value="Part-time">Part-time (Paruh Waktu)</option>
                        <option value="Contract">Contract (Kontrak)</option>
                        <option value="Internship">Internship (Magang)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Kebijakan Kehadiran *</label>
                      <select
                        value={newJobPolicy}
                        onChange={(e) => setNewJobPolicy(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] bg-white text-slate-700"
                      >
                        <option value="Hybrid">Hybrid (Kombinasi Kantor & WFH)</option>
                        <option value="Remote">Remote (100% Kerja Jarak Jauh)</option>
                        <option value="On-site">On-site (Wajib di Kantor)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Lokasi Penempatan Kantor *</label>
                      <input
                        type="text"
                        required
                        value={newJobLocation}
                        onChange={(e) => setNewJobLocation(e.target.value)}
                        placeholder="Contoh: Jakarta Selatan, DKI Jakarta"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      disabled={!newJobTitle.trim()}
                      onClick={() => setCreateStep(2)}
                      className="px-6 py-2.5 rounded-full bg-[#16B3A3] disabled:opacity-50 hover:bg-[#109485] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
                    >
                      Lanjut ke Kompensasi &rarr;
                    </button>
                  </div>
                </div>
              )}

              {createStep === 2 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <h3 className="text-base font-bold text-[#00193F] border-b border-slate-100 pb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#16B3A3] text-white text-xs flex items-center justify-center font-bold">2</span>
                    Rentang Gaji &amp; Batas Waktu Tayang
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Gaji Minimum (Juta Rp / Bulan) *</label>
                      <input
                        type="number"
                        min="1"
                        value={newJobMinSalary}
                        onChange={(e) => setNewJobMinSalary(e.target.value)}
                        placeholder="Contoh: 20"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Gaji Maksimum (Juta Rp / Bulan) *</label>
                      <input
                        type="number"
                        min="1"
                        value={newJobMaxSalary}
                        onChange={(e) => setNewJobMaxSalary(e.target.value)}
                        placeholder="Contoh: 35"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3]"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#00193F]">Tampilkan Estimasi Gaji ke Publik</div>
                      <div className="text-[11px] text-slate-500">Lowongan yang menampilkan gaji menerima rata-rata 40% lebih banyak pelamar relevan.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newJobShowSalary}
                        onChange={(e) => setNewJobShowSalary(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16B3A3]"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Tingkat Pengalaman *</label>
                      <select
                        value={newJobExp}
                        onChange={(e) => setNewJobExp(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] bg-white text-slate-700"
                      >
                        <option value="Entry / Fresh Graduate">Entry Level / Fresh Graduate</option>
                        <option value="Mid Level (2-4 Thn)">Mid Level (2 - 4 Tahun)</option>
                        <option value="Senior Level (5+ Thn)">Senior Level (5+ Tahun)</option>
                        <option value="Lead / Managerial">Lead / Managerial Level</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Batas Tanggal Pendaftaran (Deadline) *</label>
                      <input
                        type="date"
                        required
                        value={newJobDeadline}
                        onChange={(e) => setNewJobDeadline(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCreateStep(1)}
                      className="px-5 py-2.5 rounded-full text-slate-600 hover:bg-slate-100 font-semibold text-xs transition-colors"
                    >
                      &larr; Kembali
                    </button>
                    <button
                      type="button"
                      onClick={() => setCreateStep(3)}
                      className="px-6 py-2.5 rounded-full bg-[#16B3A3] hover:bg-[#109485] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
                    >
                      Lanjut ke Kualifikasi &rarr;
                    </button>
                  </div>
                </div>
              )}

              {createStep === 3 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <h3 className="text-base font-bold text-[#00193F] border-b border-slate-100 pb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#16B3A3] text-white text-xs flex items-center justify-center font-bold">3</span>
                    Deskripsi Pekerjaan, Syarat &amp; Skill Tags
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Deskripsi Peran &amp; Tanggung Jawab *</label>
                    <textarea
                      rows="4"
                      required
                      value={newJobDesc}
                      onChange={(e) => setNewJobDesc(e.target.value)}
                      placeholder="Jelaskan peran kerja, proyek yang akan ditangani, dan ekosistem teknologi yang digunakan..."
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] leading-relaxed"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Kualifikasi &amp; Persyaratan Kandidat *</label>
                    <textarea
                      rows="3"
                      required
                      value={newJobQual}
                      onChange={(e) => setNewJobQual(e.target.value)}
                      placeholder="Contoh: Pengalaman minimal 3 tahun menggunakan React.js, pemahaman arsitektur clean code, komunikasi tim yang baik..."
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] leading-relaxed"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Keahlian &amp; Skill Tags yang Dibutuhkan</label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={newSkillInput}
                        onChange={(e) => setNewSkillInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkill(e);
                          }
                        }}
                        placeholder="Ketik nama skill lalu klik Tambah (cth: Docker, Figma, Golang)"
                        className="flex-1 px-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3]"
                      />
                      <button
                        type="button"
                        onClick={handleAddSkill}
                        className="px-4 py-2 rounded-xl bg-[#00193F] text-white text-xs font-bold hover:bg-[#002D6B] transition-colors"
                      >
                        + Tambah
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {newJobSkills.map((sk, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#CCFBF1] text-[#16B3A3] border border-[#99F6E4]"
                        >
                          {sk}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(sk)}
                            className="hover:text-rose-600 transition-colors"
                          >
                            <i className="fa-solid fa-xmark text-[10px]"></i>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCreateStep(2)}
                      className="px-5 py-2.5 rounded-full text-slate-600 hover:bg-slate-100 font-semibold text-xs transition-colors"
                    >
                      &larr; Kembali
                    </button>
                    <button
                      type="button"
                      onClick={() => setCreateStep(4)}
                      className="px-6 py-2.5 rounded-full bg-[#16B3A3] hover:bg-[#109485] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
                    >
                      Lihat Pratinjau (Preview) &rarr;
                    </button>
                  </div>
                </div>
              )}

              {createStep === 4 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <h3 className="text-base font-bold text-[#00193F] border-b border-slate-100 pb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#16B3A3] text-white text-xs flex items-center justify-center font-bold">4</span>
                    Pratinjau Tampilan Lowongan Anda
                  </h3>

                  <div className="p-6 rounded-2xl border-2 border-dashed border-[#16B3A3]/40 bg-slate-50/70">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={companyProfile.logo || '/assets/company-google.png'}
                        alt="Logo"
                        className="w-12 h-12 rounded-xl object-contain bg-white p-1.5 border border-slate-200"
                      />
                      <div>
                        <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EFF6FF] text-[#1D4ED8] mb-1">
                          {newJobPolicy} • {newJobType}
                        </div>
                        <h4 className="text-lg font-extrabold text-[#00193F]">{newJobTitle || 'Judul Posisi Lowongan'}</h4>
                        <p className="text-xs text-slate-600 font-medium">{companyProfile.name} • 📍 {newJobLocation}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {newJobSkills.map((sk, idx) => (
                        <span key={idx} className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white border border-slate-200 text-slate-700">
                          {sk}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                      {newJobDesc || 'Deskripsi pekerjaan yang akan tampil pada halaman rincian lowongan kerja bagi pelamar.'}
                    </p>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="font-bold text-[#00193F]">
                        {newJobShowSalary ? `Rp ${newJobMinSalary} - ${newJobMaxSalary} Juta / Bulan` : 'Gaji Dirahasiakan'}
                      </span>
                      <span className="text-slate-400">Batas: {newJobDeadline}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCreateStep(3)}
                      className="px-5 py-2.5 rounded-full text-slate-600 hover:bg-slate-100 font-semibold text-xs transition-colors"
                    >
                      &larr; Ubah Kualifikasi
                    </button>

                    <button
                      type="submit"
                      className="px-8 py-3 rounded-full bg-[#16B3A3] hover:bg-[#109485] text-white font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 hover:-translate-y-0.5"
                    >
                      <i className="fa-solid fa-paper-plane"></i> Publikasikan Lowongan Sekarang
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}

        
        
        {activeTab === 'applicants' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-[#00193F] flex items-center gap-2">
                  Sistem Pelacak Pelamar
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pantau alur seleksi pelamar, filter berdasarkan lowongan, dan ubah status kandidat secara real-time.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl self-start md:self-auto">
                <button
                  type="button"
                  onClick={() => setAtsViewMode('kanban')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${atsViewMode === 'kanban' ? 'bg-white text-[#00193F] shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                >
                  <i className="fa-solid fa-table-columns"></i> Kanban Board
                </button>
                <button
                  type="button"
                  onClick={() => setAtsViewMode('list')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${atsViewMode === 'list' ? 'bg-white text-[#00193F] shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                >
                  <i className="fa-solid fa-list-ul"></i> Tampilan List
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center gap-3">
              <div className="w-full sm:w-72">
                <select
                  value={atsFilterJobId}
                  onChange={(e) => setAtsFilterJobId(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] bg-white text-slate-700"
                >
                  <option value="all">Semua Posisi Lowongan ({applicants.length} Pelamar)</option>
                  {jobs.map((j) => (
                    <option key={j.id} value={String(j.id)}>
                      {j.title} ({applicants.filter((a) => a.jobId === j.id).length} Pelamar)
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full sm:flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <i className="fa-solid fa-magnifying-glass text-xs"></i>
                </div>
                <input
                  type="text"
                  placeholder="Cari nama kandidat atau keahlian..."
                  value={atsSearchQuery}
                  onChange={(e) => setAtsSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3]"
                />
              </div>

              {atsFilterJobId !== 'all' || atsSearchQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    setAtsFilterJobId('all');
                    setAtsSearchQuery('');
                  }}
                  className="text-xs font-bold text-rose-600 hover:underline px-2 py-1"
                >
                  Reset Filter
                </button>
              ) : null}
            </div>

            {atsViewMode === 'kanban' && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
                {stages.map((stage) => {
                  const stageApplicants = filteredApplicants.filter((a) => a.stage === stage.key);
                  return (
                    <div key={stage.key} className="bg-slate-100/90 rounded-2xl p-3 border border-slate-200 flex flex-col min-h-[500px]">
                      <div className="pb-2 mb-3 border-b border-slate-200/80 px-1">
                        <span className="text-xs font-extrabold text-[#00193F]">{stage.label}</span>
                      </div>

                      <div className="space-y-3 flex-1">
                        {stageApplicants.map((cand) => (
                          <div
                            key={cand.id}
                            className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-all group"
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <h4 className="text-xs font-bold text-[#00193F] leading-tight group-hover:text-[#16B3A3] transition-colors">
                                  {cand.name}
                                </h4>
                                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-1">
                                  {cand.jobTitle}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1 mb-3">
                              {cand.skills.slice(0, 3).map((sk, idx) => (
                                <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                                  {sk}
                                </span>
                              ))}
                              {cand.skills.length > 3 && (
                                <span className="text-[10px] px-1 py-0.5 text-slate-400">+{cand.skills.length - 3}</span>
                              )}
                            </div>

                            <div className="text-[10px] text-slate-400 mb-3 flex items-center gap-1">
                              <i className="fa-regular fa-clock"></i> Melamar: {cand.appliedDate}
                            </div>

                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1 text-xs">
                              <button
                                type="button"
                                onClick={() => openCandidateDetail(cand)}
                                className="px-2 py-1 rounded-lg text-[11px] font-bold text-[#16B3A3] hover:bg-[#CCFBF1] transition-colors"
                              >
                                Lihat CV
                              </button>

                              <select
                                value={cand.stage}
                                onChange={(e) => handleStageChange(cand.id, e.target.value)}
                                className="text-[10px] font-bold px-1.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none cursor-pointer"
                              >
                                {stages.map((st) => (
                                  <option key={st.key} value={st.key}>
                                    {st.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        ))}

                        {stageApplicants.length === 0 && (
                          <div className="h-28 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-[11px] text-slate-400 italic">
                            Belum ada kandidat
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {atsViewMode === 'list' && (
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                        <th className="py-4 px-5">Nama Pelamar</th>
                        <th className="py-4 px-4">Posisi Dilamar</th>
                        <th className="py-4 px-4">Tanggal Melamar</th>
                        <th className="py-4 px-4">Tahapan Seleksi</th>
                        <th className="py-4 px-5 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredApplicants.map((cand) => (
                        <tr key={cand.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-5">
                            <div className="font-bold text-[#00193F]">{cand.name}</div>
                            <div className="text-[11px] text-slate-400">{cand.email} • {cand.phone}</div>
                          </td>
                          <td className="py-4 px-4 font-semibold text-slate-700">{cand.jobTitle}</td>
                          <td className="py-4 px-4 text-slate-500">{cand.appliedDate}</td>
                          <td className="py-4 px-4">
                            <select
                              value={cand.stage}
                              onChange={(e) => handleStageChange(cand.id, e.target.value)}
                              className="text-xs font-bold px-2 py-1 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none cursor-pointer"
                            >
                              {stages.map((st) => (
                                <option key={st.key} value={st.key}>
                                  {st.label}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="py-4 px-5 text-right">
                            <button
                              type="button"
                              onClick={() => openCandidateDetail(cand)}
                              className="px-3 py-1.5 rounded-full bg-[#16B3A3] hover:bg-[#109485] text-white font-bold text-xs transition-colors shadow-xs"
                            >
                              Detail &amp; Resume
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        
        
        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
            <form onSubmit={handleProfileSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-8">
              <div>
                <h2 className="text-xl font-extrabold text-[#00193F] flex items-center gap-2">
                  Pengaturan Profil Perusahaan
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Lengkapi data profil, banner, logo, dan tautan sosial untuk memperkuat Employer Branding di AYOKERJA!.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-1">
                  <div className="relative group shrink-0">
                    <img
                      src={profileForm.logo || '/assets/company-google.png'}
                      alt="Logo Preview"
                      className="w-20 h-20 rounded-2xl bg-white p-2 object-contain border-2 border-slate-200 shadow-md transition-all group-hover:border-[#16B3A3]"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <label className="block text-xs font-bold text-slate-700">Logo Resmi Perusahaan</label>
                    <div className="flex flex-wrap items-center gap-3">
                      <label
                        htmlFor="companyLogoUpload"
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#00193F] text-xs font-bold cursor-pointer transition-colors border border-slate-200/80 flex items-center gap-2 shadow-xs"
                      >
                        <i className="fa-solid fa-arrow-up-from-bracket text-[#16B3A3]"></i>
                        <span>Pilih Foto dari Galeri</span>
                      </label>
                      <input
                        type="file"
                        id="companyLogoUpload"
                        accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                        className="hidden"
                        onChange={handleLogoFileChange}
                      />
                      {profileForm.logo && profileForm.logo !== '/assets/company-google.png' && (
                        <button
                          type="button"
                          onClick={() => setProfileForm({ ...profileForm, logo: '/assets/company-google.png' })}
                          className="px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors"
                        >
                          Reset ke Default
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Pilih berkas logo langsung dari perangkat Anda (PNG, JPG, WEBP, atau SVG, maks. 2MB).
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Resmi Perusahaan *</label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Kategori Industri *</label>
                  <select
                    value={profileForm.industry}
                    onChange={(e) => setProfileForm({ ...profileForm, industry: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 bg-white"
                  >
                    <option value="Teknologi Informasi & SaaS">Teknologi Informasi &amp; SaaS</option>
                    <option value="Cloud & Infrastruktur">Cloud &amp; Infrastruktur</option>
                    <option value="Finansial & Perbankan Digital">Finansial &amp; Perbankan Digital</option>
                    <option value="E-Commerce & Ritel">E-Commerce &amp; Ritel</option>
                    <option value="Telekomunikasi & Satelit">Telekomunikasi &amp; Satelit</option>
                    <option value="F&B & Kuliner Nasional">F&B &amp; Kuliner Nasional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Ukuran / Jumlah Karyawan *</label>
                  <select
                    value={profileForm.employeeSize}
                    onChange={(e) => setProfileForm({ ...profileForm, employeeSize: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 bg-white"
                  >
                    <option value="1 - 10 Karyawan">1 - 10 Karyawan (Startup Awal)</option>
                    <option value="11 - 50 Karyawan">11 - 50 Karyawan (Berkembang)</option>
                    <option value="51 - 200 Karyawan">51 - 200 Karyawan (Menengah)</option>
                    <option value="201 - 500 Karyawan">201 - 500 Karyawan (Besar)</option>
                    <option value="500 - 1.000 Karyawan">500 - 1.000 Karyawan (Enterprise)</option>
                    <option value="1.000+ Karyawan">1.000+ Karyawan (Korporasi Multinasional)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Rekrutmen Resmi *</label>
                  <input
                    type="email"
                    required
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Alamat Kantor Pusat *</label>
                  <input
                    type="text"
                    required
                    value={profileForm.address}
                    onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-[#00193F]">Tautan Eksternal &amp; Media Sosial</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      <i className="fa-solid fa-globe mr-1 text-slate-400"></i> Website Resmi
                    </label>
                    <input
                      type="url"
                      value={profileForm.website}
                      onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                      placeholder="https://company.com"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      <i className="fa-brands fa-linkedin mr-1 text-blue-600"></i> LinkedIn Perusahaan
                    </label>
                    <input
                      type="url"
                      value={profileForm.linkedin}
                      onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/company/..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      <i className="fa-brands fa-instagram mr-1 text-pink-600"></i> Instagram
                    </label>
                    <input
                      type="text"
                      value={profileForm.instagram}
                      onChange={(e) => setProfileForm({ ...profileForm, instagram: e.target.value })}
                      placeholder="@company_id"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Deskripsi Profil Perusahaan ('Tentang Kami') *</label>
                <textarea
                  rows="4"
                  required
                  value={profileForm.description}
                  onChange={(e) => setProfileForm({ ...profileForm, description: e.target.value })}
                  placeholder="Ceritakan profil, budaya kerja, misi, dan produk unggulan perusahaan Anda..."
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 leading-relaxed"
                ></textarea>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-[#16B3A3] hover:bg-[#109485] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <i className="fa-solid fa-floppy-disk"></i> Simpan Perubahan Profil Perusahaan
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      <CompanyCandidateModal
        isOpen={candidateModalOpen}
        candidate={selectedCandidate}
        onClose={() => setCandidateModalOpen(false)}
      />

      <CompanyEditJobModal
        isOpen={editJobModalOpen}
        job={editingJob}
        onClose={() => setEditJobModalOpen(false)}
        onChange={setEditingJob}
        onSave={handleSaveEditedJob}
      />

      <footer className="bg-[#00193F] text-slate-400 py-6 border-t border-white/10 mt-auto text-center text-xs">
        &copy; 2026 AYOKERJA!. Portal Manajemen Rekrutmen Perusahaan Mitra Indonesia.
      </footer>
    </div>
  );
}
