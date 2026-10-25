import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Companies from './pages/Companies';
import LoginPelamar from './pages/LoginPelamar';
import LoginPerusahaan from './pages/LoginPerusahaan';
import ProfilePelamar from './pages/ProfilePelamar';
import CompanyDashboard from './pages/CompanyDashboard';

function AppContent() {
  const location = useLocation();
  // Pages with their own dedicated full-page headers/footers
  const isDedicatedAuthOrDashboard =
    location.pathname === '/login-pelamar' ||
    location.pathname === '/login-perusahaan' ||
    location.pathname === '/company-dashboard';

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased">
      {!isDedicatedAuthOrDashboard && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/login-pelamar" element={<LoginPelamar />} />
          <Route path="/login-perusahaan" element={<LoginPerusahaan />} />
          <Route path="/profile" element={<ProfilePelamar />} />
          <Route path="/company-dashboard" element={<CompanyDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isDedicatedAuthOrDashboard && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
