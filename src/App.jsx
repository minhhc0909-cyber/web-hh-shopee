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

import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

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
          <Route path="/login" element={<Login setIsAdminMode={setIsAdminMode} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/withdrawal" element={<Withdrawal />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/leaderboard" element={<Leaderboard />} />


          {/* Admin Routes - Protected by ProtectedRoute */}
          <Route path="/admin" element={
            <ProtectedRoute isAdminMode={isAdminMode} requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/shopee-session" element={
            <ProtectedRoute isAdminMode={isAdminMode} requiredRole="admin">
              <AdminShopeeSession />
            </ProtectedRoute>
          } />
          <Route path="/admin/reconciliation" element={
            <ProtectedRoute isAdminMode={isAdminMode} requiredRole="admin">
              <AdminReconciliation />
            </ProtectedRoute>
          } />
          <Route path="/admin/orders" element={
            <ProtectedRoute isAdminMode={isAdminMode} requiredRole="admin">
              <AdminOrders />
            </ProtectedRoute>
          } />
          <Route path="/admin/withdrawals" element={
            <ProtectedRoute isAdminMode={isAdminMode} requiredRole="admin">
              <AdminWithdrawals />
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>


      {/* Footer */}
      <Footer />

    </div>
  );
}
