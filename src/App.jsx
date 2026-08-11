import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// User Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Withdrawal from './pages/Withdrawal';
import Referral from './pages/Referral';
import Leaderboard from './pages/Leaderboard';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminShopeeSession from './pages/Admin/AdminShopeeSession';
import AdminReconciliation from './pages/Admin/AdminReconciliation';
import AdminOrders from './pages/Admin/AdminOrders';
import AdminWithdrawals from './pages/Admin/AdminWithdrawals';

export default function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-orange-500 selection:text-white">
      
      {/* Navbar Header */}
      <Navbar isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/withdrawal" element={<Withdrawal />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/leaderboard" element={<Leaderboard />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/shopee-session" element={<AdminShopeeSession />} />
          <Route path="/admin/reconciliation" element={<AdminReconciliation />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/withdrawals" element={<AdminWithdrawals />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
