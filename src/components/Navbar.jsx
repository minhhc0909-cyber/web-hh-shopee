import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Link2, 
  Wallet, 
  Users, 
  Trophy, 
  ShieldCheck, 
  Menu, 
  X, 
  Sparkles,
  ChevronRight,
  ArrowRightLeft,
  User,
  LogOut,
  LogIn
} from 'lucide-react';
import { getStoredUser, logoutUser } from '../services/storage';

export default function Navbar({ isAdminMode, setIsAdminMode }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = getStoredUser();

  const handleLogout = () => {
    logoutUser();
    setIsAdminMode(false);
    window.location.href = '/login';
  };

  const userNavLinks = [
    { path: '/', label: 'Chuyển Link', icon: Link2 },
    { path: '/orders', label: 'Đơn Hàng', icon: ShoppingBag },
    { path: '/withdrawal', label: 'Rút Tiền', icon: Wallet },
    { path: '/referral', label: 'Giới Thiệu', icon: Users },
    { path: '/leaderboard', label: 'BXH Top', icon: Trophy },
  ];

  const guestNavLinks = [
    { path: '/', label: 'Chuyển Link', icon: Link2 },
    { path: '/referral', label: 'Giới Thiệu', icon: Users },
    { path: '/leaderboard', label: 'BXH Top', icon: Trophy },
  ];

  const adminNavLinks = [
    { path: '/admin', label: 'Tổng Quan', icon: ShieldCheck },
    { path: '/admin/shopee-session', label: 'Shopee Session', icon: Link2 },
    { path: '/admin/reconciliation', label: 'Đối Soát Sàn', icon: ArrowRightLeft },
    { path: '/admin/orders', label: 'Đơn Hàng Admin', icon: ShoppingBag },
    { path: '/admin/withdrawals', label: 'Duyệt Rút Tiền', icon: Wallet },
  ];

  const activeLinks = isAdminMode ? adminNavLinks : (user ? userNavLinks : guestNavLinks);


  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-200">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-500 text-white text-xs font-semibold py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>Tự động hoàn đến 80% hoa hồng Shopee, TikTok Shop & Lazada. Đã chi trả hơn 2.5 tỷ VNĐ!</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-2xl shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              🐹
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-gray-900">Chuột</span>
                <span className="bg-orange-500 text-white text-[10px] font-bold uppercase px-1.5 py-0.5 rounded tracking-wide">Hoàn Tiền</span>
              </div>
              <span className="text-[10px] text-gray-500 font-medium block -mt-0.5">Shopee Affiliate Partner</span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {activeLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-orange-50 text-orange-600 border border-orange-200/60 shadow-xs'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-orange-600' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Widgets */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {/* Balance Widget */}
                <Link
                  to="/withdrawal"
                  className="flex items-center gap-2 bg-orange-50/80 hover:bg-orange-100/80 border border-orange-200/80 px-3 py-1.5 rounded-xl transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs">
                    ₫
                  </div>
                  <div>
                    <span className="text-[10px] text-orange-600 uppercase font-bold block leading-none">Khả dụng</span>
                    <span className="text-xs font-extrabold text-orange-700">
                      {(user.balance || 0).toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                </Link>

                {/* Mode Switcher Admin vs User - Only visible for Admin Role */}
                {user.role === 'admin' && (
                  <button
                    onClick={() => setIsAdminMode(!isAdminMode)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      isAdminMode
                        ? 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{isAdminMode ? 'Thoát Admin' : 'Vào Admin'}</span>
                  </button>
                )}

                {/* User Profile & Logout */}
                <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                  <div className="flex items-center gap-2">
                    <img
                      src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border border-orange-300 object-cover"
                    />
                    <div className="text-left">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-gray-800 block truncate max-w-[100px]">{user.name}</span>
                      </div>
                      <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded inline-block ${
                        user.role === 'admin' ? 'bg-orange-500 text-white' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {user.role === 'admin' ? 'ROLE: ADMIN' : 'ROLE: USER'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Đăng Xuất"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              /* Guest Visitor Header: Prominent Login / Register Button */
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>Đăng Nhập / Đăng Ký</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-2 animate-in slide-in-from-top duration-200">
          {user ? (
            <div className="p-3 bg-orange-50 rounded-xl flex items-center justify-between mb-3 border border-orange-100">
              <div className="flex items-center gap-2.5">
                <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full border border-orange-300" />
                <div>
                  <div className="text-xs font-bold text-gray-900">{user.name}</div>
                  <div className="text-[11px] font-bold text-orange-600">Số dư: {(user.balance || 0).toLocaleString('vi-VN')} đ</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-2.5 py-1 bg-rose-600 text-white rounded text-xs font-bold"
              >
                Đăng Xuất
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-orange-500 text-white font-bold rounded-xl text-xs mb-3"
            >
              <LogIn className="w-4 h-4" />
              <span>Đăng Nhập / Đăng Ký</span>
            </Link>
          )}

          <div className="space-y-1">
            {activeLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-2.5 rounded-lg text-sm font-semibold ${
                    isActive ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-orange-500" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
