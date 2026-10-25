/**
 * AYOKERJA! - Pelamar Authentication & Dropdown Management
 * Mengelola state login pelamar, dropdown profil di navbar, modal Pengaturan Akun,
 * serta status terkunci untuk Lowongan Tersimpan & Riwayat Lamaran Kerja.
 */

(function () {
  // 1. Inisialisasi User Session dari LocalStorage
  const STORAGE_KEY = 'ayokerja_pelamar_user';

  function getPelamarUser() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data || data === 'logged_out') return null;
      const parsed = JSON.parse(data);
      if (parsed && parsed.isLoggedIn) return parsed;
    } catch (e) {
      console.error(e);
    }
    return null;
  }

  function setPelamarUser(user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    renderNavbarState();
  }

  function logoutPelamar() {
    localStorage.removeItem(STORAGE_KEY);
    alert('Anda telah berhasil keluar dari akun pelamar.');
    window.location.href = 'login-pelamar.html';
  }

  // Guard Akses: Halaman Profil HANYA bisa dibuka setelah daftar & login
  function checkAuthGuard() {
    const currentPath = window.location.pathname.toLowerCase();
    if (currentPath.includes('profile-pelamar.html')) {
      const user = getPelamarUser();
      if (!user || !user.isLoggedIn) {
        alert('Halaman Profil hanya dapat diakses setelah Anda mendaftar dan masuk sebagai pelamar. Mengarahkan ke halaman Masuk/Daftar...');
        window.location.replace('login-pelamar.html');
        return false;
      }
    }
    return true;
  }

  // Jalankan guard seketika
  if (!checkAuthGuard()) return;

  // 2. Render Dropdown & Tombol di Navbar
  function renderNavbarState() {
    const user = getPelamarUser();
    const isLogged = user && user.isLoggedIn;

    // A. Desktop Container
    const desktopAuthContainers = document.querySelectorAll('.desktop-auth-container, header .hidden.md\\:flex.items-center.gap-3');
    
    desktopAuthContainers.forEach(container => {
      // Hapus dropdown lama jika ada agar tidak duplikasi
      const existingDropdown = container.querySelector('#pelamarDropdownWidget');
      if (existingDropdown) existingDropdown.remove();

      const btnMasuk = container.querySelector('a[href*="login-pelamar.html"]');

      if (isLogged) {
        if (btnMasuk) btnMasuk.classList.add('hidden');

        // Buat Dropdown Widget Persis Sesuai Gambar Desain
        const dropdownHtml = `
          <div id="pelamarDropdownWidget" class="relative inline-block text-left">
            <button id="pelamarDropdownTrigger" type="button" class="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full pl-2 pr-3.5 py-1 text-white transition-all focus:outline-none shadow-sm cursor-pointer">
              <!-- Avatar Thumbnail -->
              <div class="w-7 h-7 rounded-full bg-gradient-to-tr from-[#00193F] to-[#16B3A3] text-white flex items-center justify-center font-bold text-xs shadow-sm overflow-hidden border border-white/50">
                <i class="fa-solid fa-user text-[11px]"></i>
              </div>
              <!-- Username -->
              <span class="text-xs font-bold text-white max-w-[120px] truncate">${user.username || 'daniramadh47'}</span>
              <!-- Chevron Up/Down -->
              <i id="dropdownChevronIcon" class="fa-solid fa-chevron-down text-[10px] text-white/80 transition-transform duration-200"></i>
            </button>

            <!-- Popup Card Menu Dropdown (Sesuai Screenshot User) -->
            <div id="pelamarDropdownMenu" class="hidden absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 text-slate-700 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              
              <!-- Item 1: Avatar + Username + Panah Kanan Link Profil -->
              <a href="profile-pelamar.html" class="flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 group">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00193F] to-[#16B3A3] text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow-inner">
                    <i class="fa-solid fa-user"></i>
                  </div>
                  <div class="min-w-0 text-left">
                    <div class="font-bold text-sm text-[#00193F] group-hover:text-[#16B3A3] truncate transition-colors">${user.username || 'daniramadh47'}</div>
                    <span class="text-[11px] text-slate-400 font-medium">Buka Profil Saya</span>
                  </div>
                </div>
                <i class="fa-solid fa-chevron-right text-xs text-slate-400 group-hover:text-[#16B3A3] group-hover:translate-x-0.5 transition-all shrink-0 ml-2"></i>
              </a>

              <!-- List Menu Dropdown Pelamar -->
              <div class="py-2 text-xs">
                
                <!-- Lowongan Tersimpan (Tidak berfungsi saat diklik, tanpa logo kunci) -->
                <button type="button" onclick="event.preventDefault(); return false;" class="w-full flex items-center gap-3.5 px-5 py-2.5 hover:bg-slate-50 text-slate-700 font-medium transition-colors text-left">
                  <i class="fa-regular fa-bookmark text-base text-slate-500 w-5 text-center"></i>
                  <span class="text-xs font-semibold text-slate-700">Lowongan tersimpan</span>
                </button>

                <!-- Lamaran Kerja (Tidak berfungsi saat diklik, tanpa logo kunci) -->
                <button type="button" onclick="event.preventDefault(); return false;" class="w-full flex items-center gap-3.5 px-5 py-2.5 hover:bg-slate-50 text-slate-700 font-medium transition-colors text-left">
                  <i class="fa-solid fa-file-invoice text-base text-slate-500 w-5 text-center"></i>
                  <span class="text-xs font-semibold text-slate-700">Lamaran kerja</span>
                </button>

                <!-- Pengaturan -->
                <button type="button" onclick="window.ayokerjaModals.openSettings()" class="w-full flex items-center gap-3.5 px-5 py-2.5 hover:bg-slate-50 text-slate-700 font-medium transition-colors text-left">
                  <i class="fa-solid fa-gear text-base text-slate-500 w-5 text-center"></i>
                  <span class="text-xs font-semibold text-slate-700">Pengaturan</span>
                </button>
              </div>

              <!-- Tombol Keluar (Sesuai Screenshot: Border Top & Teks Keluar) -->
              <div class="border-t border-slate-100 pt-2 pb-1 px-1">
                <button type="button" onclick="window.ayokerjaAuth.logout()" class="w-full text-left px-5 py-2.5 text-xs text-slate-700 hover:text-rose-600 hover:bg-slate-50 transition-colors">
                  Keluar
                </button>
              </div>

            </div>
          </div>
        `;

        // Sisipkan sebelum tombol Masuk Perusahaan
        const btnPerusahaan = container.querySelector('a[href*="login-perusahaan.html"]');
        if (btnPerusahaan) {
          btnPerusahaan.insertAdjacentHTML('beforebegin', dropdownHtml);
        } else {
          container.insertAdjacentHTML('beforeend', dropdownHtml);
        }

        // Event Listener Toggle Dropdown
        const trigger = container.querySelector('#pelamarDropdownTrigger');
        const menu = container.querySelector('#pelamarDropdownMenu');
        const chevron = container.querySelector('#dropdownChevronIcon');

        if (trigger && menu) {
          trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = menu.classList.contains('hidden');
            if (isHidden) {
              menu.classList.remove('hidden');
              chevron.classList.add('rotate-180');
            } else {
              menu.classList.add('hidden');
              chevron.classList.remove('rotate-180');
            }
          });
        }
      } else {
        // Jika belum login, tampilkan tombol Masuk Pelamar biasa
        if (btnMasuk) btnMasuk.classList.remove('hidden');
      }
    });

    // B. Mobile Drawer Menu State
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
      const existingMobileUser = mobileMenu.querySelector('#mobileUserSection');
      if (existingMobileUser) existingMobileUser.remove();

      const mobileAuthButtons = mobileMenu.querySelector('.border-t.border-white\\/10');

      if (isLogged) {
        if (mobileAuthButtons) mobileAuthButtons.classList.add('hidden');

        const mobileUserHtml = `
          <div id="mobileUserSection" class="pt-3 border-t border-white/10 space-y-2">
            <!-- User Info Card -->
            <a href="profile-pelamar.html" class="flex items-center gap-3 p-3 rounded-xl bg-white/10 text-white">
              <div class="w-9 h-9 rounded-full bg-[#16B3A3] text-white font-bold text-xs flex items-center justify-center">
                <i class="fa-solid fa-user"></i>
              </div>
              <div class="min-w-0 flex-1">
                <div class="text-xs font-bold truncate">${user.username || 'daniramadh47'}</div>
                <div class="text-[10px] text-[#99F6E4]">Buka Profil Saya</div>
              </div>
              <i class="fa-solid fa-chevron-right text-xs text-white/60"></i>
            </a>

            <!-- Quick Action Links -->
            <div class="space-y-1 text-xs">
              <button type="button" onclick="event.preventDefault(); return false;" class="w-full text-left px-3 py-2 text-white/90 hover:bg-white/10 rounded-lg flex items-center">
                <i class="fa-regular fa-bookmark mr-2 text-[#16B3A3]"></i> Lowongan Tersimpan
              </button>
              <button type="button" onclick="event.preventDefault(); return false;" class="w-full text-left px-3 py-2 text-white/90 hover:bg-white/10 rounded-lg flex items-center">
                <i class="fa-solid fa-file-invoice mr-2 text-[#16B3A3]"></i> Lamaran Kerja
              </button>
              <button type="button" onclick="window.ayokerjaModals.openSettings()" class="w-full text-left px-3 py-2 text-white/90 hover:bg-white/10 rounded-lg flex items-center">
                <i class="fa-solid fa-gear mr-2 text-[#16B3A3]"></i> Pengaturan Akun
              </button>
              <button type="button" onclick="window.ayokerjaAuth.logout()" class="w-full text-left px-3 py-2 text-rose-300 hover:bg-white/10 rounded-lg flex items-center">
                <i class="fa-solid fa-arrow-right-from-bracket mr-2"></i> Keluar Akun
              </button>
            </div>
          </div>
        `;
        mobileMenu.insertAdjacentHTML('beforeend', mobileUserHtml);
      } else {
        if (mobileAuthButtons) mobileAuthButtons.classList.remove('hidden');
      }
    }
  }

  // 3. Close Dropdown Saat Klik di Luar
  document.addEventListener('click', (e) => {
    const dropdownMenu = document.getElementById('pelamarDropdownMenu');
    const dropdownTrigger = document.getElementById('pelamarDropdownTrigger');
    const chevron = document.getElementById('dropdownChevronIcon');

    if (dropdownMenu && !dropdownMenu.classList.contains('hidden')) {
      if (dropdownTrigger && !dropdownTrigger.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.add('hidden');
        if (chevron) chevron.classList.remove('rotate-180');
      }
    }
  });

  // 4. Injeksi Modal Dialog (Pengaturan Akun)
  function injectModals() {
    if (document.getElementById('ayokerjaModalContainer')) return;

    const modalContainer = document.createElement('div');
    modalContainer.id = 'ayokerjaModalContainer';
    modalContainer.innerHTML = `
      <!-- ================= MODAL: PENGATURAN AKUN ================= -->
      <div id="modalSettings" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto">
          
          <!-- Header Modal -->
          <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-[#CCFBF1] text-[#16B3A3] flex items-center justify-center text-lg shadow-inner">
                <i class="fa-solid fa-gear"></i>
              </div>
              <div>
                <h3 class="text-base sm:text-lg font-bold text-[#00193F]">Pengaturan Akun</h3>
                <p class="text-xs text-slate-400">Kelola informasi akun pelamar dan keamanan</p>
              </div>
            </div>
            <button type="button" onclick="window.ayokerjaModals.close('modalSettings')" class="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <div class="space-y-6 text-xs sm:text-sm">
            
            <!-- BAGIAN 1: INFORMASI AKUN & EDIT EMAIL -->
            <div class="space-y-3.5">
              <div class="flex items-center gap-2 pb-1 border-b border-slate-100">
                <i class="fa-regular fa-user text-[#16B3A3] font-bold"></i>
                <h4 class="font-bold text-[#00193F] text-sm">Informasi Akun</h4>
              </div>

              <!-- Username (Readonly) -->
              <div>
                <label class="block font-semibold text-slate-600 text-xs mb-1">Username Pelamar</label>
                <div class="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                  <i class="fa-solid fa-at text-slate-400 text-xs"></i>
                  <span id="settingsUsernameDisplay" class="font-bold text-xs">daniramadh47</span>
                  <span class="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-bold border border-emerald-200">Terverifikasi</span>
                </div>
              </div>

              <!-- Form Ubah Email -->
              <form id="formUpdateEmail" onsubmit="window.ayokerjaSettings.handleUpdateEmail(event)" class="space-y-3 pt-1">
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <label for="settingsEmailInput" class="block font-semibold text-slate-700 text-xs">
                      Alamat Email Akun <span class="text-rose-500">*</span>
                    </label>
                    <span class="text-[11px] text-[#16B3A3] font-medium"><i class="fa-solid fa-pen text-[10px] mr-1"></i>Bisa diedit</span>
                  </div>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <i class="fa-regular fa-envelope text-xs"></i>
                    </div>
                    <input type="email" id="settingsEmailInput" required placeholder="nama@email.com"
                      class="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16B3A3]/20 focus:border-[#16B3A3] transition-all">
                  </div>
                  <p class="text-[11px] text-slate-400 mt-1">Email digunakan untuk notifikasi lamaran dan akses komunikasi dengan perusahaan.</p>
                </div>

                <div class="flex justify-end pt-1">
                  <button type="submit" class="px-5 py-2.5 rounded-xl bg-[#16B3A3] hover:bg-[#109485] text-white font-bold text-xs transition-all shadow-sm flex items-center gap-2">
                    <i class="fa-solid fa-check text-xs"></i>
                    Simpan Perubahan Email
                  </button>
                </div>
              </form>
            </div>

            <!-- BAGIAN 2: HAPUS AKUN (DANGER ZONE) -->
            <div class="pt-4 border-t border-slate-100">
              <div class="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-3">
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 text-sm mt-0.5">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                  </div>
                  <div>
                    <h5 class="font-bold text-rose-900 text-xs sm:text-sm">Hapus Akun Pelamar</h5>
                    <p class="text-[11px] text-rose-700 leading-relaxed mt-0.5">
                      Menghapus akun akan menghapus profil Anda, dokumen resume, serta seluruh riwayat lamaran secara permanen. Tindakan ini tidak dapat dibatalkan.
                    </p>
                  </div>
                </div>

                <div class="pt-2 flex justify-end">
                  <button type="button" onclick="window.ayokerjaSettings.handleDeleteAccount()" 
                    class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors shadow-sm flex items-center gap-2">
                    <i class="fa-regular fa-trash-can text-xs"></i>
                    Hapus Akun Saya
                  </button>
                </div>
              </div>
            </div>

          </div>

          <!-- Footer Modal -->
          <div class="pt-5 border-t border-slate-100 flex justify-end mt-6">
            <button type="button" onclick="window.ayokerjaModals.close('modalSettings')" class="px-5 py-2 rounded-full border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-colors">
              Tutup
            </button>
          </div>

        </div>
      </div>
    `;

    document.body.appendChild(modalContainer);
  }

  // 5. Expose Global Modal Handlers
  window.ayokerjaModals = {
    open(modalId) {
      injectModals();
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.remove('hidden');
      // Tutup dropdown menu jika terbuka
      const dropdownMenu = document.getElementById('pelamarDropdownMenu');
      if (dropdownMenu) dropdownMenu.classList.add('hidden');
    },
    close(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add('hidden');
    },
    openSavedJobs() {
      // Fitur dinonaktifkan / tidak berfungsi saat diklik
    },
    openApplications() {
      // Fitur dinonaktifkan / tidak berfungsi saat diklik
    },
    openSettings() {
      injectModals();
      const user = getPelamarUser() || { username: 'daniramadh47', email: 'daniramadh47@ayokerja.id' };
      const emailInput = document.getElementById('settingsEmailInput');
      const usernameDisplay = document.getElementById('settingsUsernameDisplay');
      if (emailInput) emailInput.value = user.email || 'daniramadh47@ayokerja.id';
      if (usernameDisplay) usernameDisplay.textContent = user.username || 'daniramadh47';
      this.open('modalSettings');
    }
  };

  // Handler Khusus Pengaturan Akun: Edit Email & Hapus Akun
  window.ayokerjaSettings = {
    handleUpdateEmail(e) {
      e.preventDefault();
      const emailInput = document.getElementById('settingsEmailInput');
      if (!emailInput) return;
      const newEmail = emailInput.value.trim();
      if (!newEmail) return;

      const user = getPelamarUser() || { username: 'daniramadh47', name: 'Luthfi Ramadhan', isLoggedIn: true };
      user.email = newEmail;
      setPelamarUser(user);

      // Sinkronkan data ke elemen profil jika sedang berada di profile-pelamar.html
      const profileEmailDisplay = document.getElementById('profileEmailDisplay');
      if (profileEmailDisplay) profileEmailDisplay.textContent = newEmail;
      const inputEmail = document.getElementById('inputEmail');
      if (inputEmail) inputEmail.value = newEmail;

      alert(`Berhasil! Alamat email akun Anda telah diperbarui menjadi:\n${newEmail}`);
      window.ayokerjaModals.close('modalSettings');
    },

    handleDeleteAccount() {
      const user = getPelamarUser();
      const username = user && user.username ? `@${user.username}` : 'ini';
      const confirmDelete = confirm(`PERINGATAN HAPUS AKUN:\n\nApakah Anda yakin ingin menghapus akun pelamar ${username} secara permanen?\n\nSeluruh data profil, berkas resume, lowongan tersimpan, dan riwayat lamaran Anda akan dihapus.`);
      if (!confirmDelete) return;

      localStorage.removeItem(STORAGE_KEY);
      alert('Akun pelamar Anda telah berhasil dihapus secara permanen.');
      window.location.href = 'index.html';
    }
  };

  // Cegah akses link profil dari seluruh halaman jika belum daftar/login
  document.addEventListener('click', (e) => {
    const targetLink = e.target.closest('a[href*="profile-pelamar.html"]');
    if (targetLink) {
      const user = getPelamarUser();
      if (!user || !user.isLoggedIn) {
        e.preventDefault();
        alert('Akses Terbatas: Silakan daftar atau masuk terlebih dahulu untuk mengakses profil pelamar.');
        window.location.href = 'login-pelamar.html';
      }
    }
  });

  // Kunci fitur Masuk Perusahaan (tidak berfungsi saat diklik, tanpa logo kunci)
  document.addEventListener('click', (e) => {
    const perusahaanLink = e.target.closest('a[href*="login-perusahaan.html"]');
    if (perusahaanLink) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });

  window.ayokerjaAuth = {
    getUser: getPelamarUser,
    setUser: setPelamarUser,
    logout: logoutPelamar,
    render: renderNavbarState
  };

  // Jalankan saat DOM siap
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectModals();
      renderNavbarState();
    });
  } else {
    injectModals();
    renderNavbarState();
  }

})();
