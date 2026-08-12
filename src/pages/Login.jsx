import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, UserPlus, KeyRound, CheckCircle2, User, PlusCircle, Check } from 'lucide-react';
import { updateStoredUser, registerUser } from '../services/storage';

export default function Login({ setIsAdminMode }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleMail, setCustomGoogleMail] = useState('');

  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPin, setRegPin] = useState('123456');

  const [regSuccess, setRegSuccess] = useState('');

  const savedGoogleAccounts = [
    { name: 'Hoang Minh', email: 'minhhc0909@gmail.com', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80' },
    { name: 'minh hoàng', email: 'hoangminh1999.1a@gmail.com', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80' },
    { name: 'Deluxe Autocar', email: 'autocardeluxes@gmail.com', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80' }
  ];

  const handleSelectGoogleAccount = (accEmail, accName) => {
    const loggedUser = registerUser({
      name: accName || accEmail.split('@')[0],
      email: accEmail,
      password: 'google_oauth_authenticated',
      pin: '123456'
    });

    updateStoredUser(loggedUser);
    setIsAdminMode(false);
    setShowGoogleModal(false);
    setRegSuccess(`Đã xác thực thành công tài khoản Google ${accEmail}!`);

    setTimeout(() => {
      navigate('/dashboard');
    }, 600);
  };

  const handleCustomGoogleSubmit = (e) => {
    e.preventDefault();
    if (!customGoogleMail || !customGoogleMail.includes('@')) return;
    handleSelectGoogleAccount(customGoogleMail, customGoogleMail.split('@')[0]);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    const isAdmin = email.toLowerCase().includes('admin');
    const loggedUser = {
      id: isAdmin ? 'ADM-000001' : `USR-${Math.floor(100000 + Math.random() * 900000)}`,
      name: isAdmin ? 'Quản Trị Viên (System Admin)' : email.split('@')[0],
      email: email,
      role: isAdmin ? 'admin' : 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      balance: isAdmin ? 15400000 : 450000,
      withdrawalPin: '123456'
    };

    updateStoredUser(loggedUser);
    setIsAdminMode(isAdmin);

    if (isAdmin) {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) return;

    const newUser = registerUser({
      name: regName,
      email: regEmail,
      password: regPassword,
      pin: regPin
    });

    updateStoredUser(newUser);
    setIsAdminMode(false);
    setRegSuccess(`Đăng ký thành công tài khoản ${newUser.name}! Đang đăng nhập...`);

    setTimeout(() => {
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-gray-200 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-3xl mx-auto shadow-lg shadow-orange-500/25">
            🐹
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Chuột Hoàn Tiền</h2>
          <p className="text-xs text-gray-500">Nền tảng hoàn tiền mua sắm Shopee & TikTok Shop #1</p>
        </div>

        {/* Tab Switcher: Login vs Register */}
        <div className="flex items-center bg-gray-100 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'login' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Đăng Nhập
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'register' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Đăng Ký Mới
          </button>
        </div>

        {regSuccess && (
          <div className="bg-emerald-50 text-emerald-700 text-xs p-3.5 rounded-xl border border-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{regSuccess}</span>
          </div>
        )}

        {/* Official Google OAuth Single Sign-On Button */}
        <button
          type="button"
          onClick={() => setShowGoogleModal(true)}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-2xl text-xs font-extrabold text-gray-700 transition-all shadow-xs group"
        >
          <svg className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.94 1.19 15.23 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
          <span>Đăng Nhập Trực Tiếp Bằng Google Account</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t w-full border-gray-200" />
          <span className="bg-white px-3 text-[11px] font-bold text-gray-400 uppercase absolute">Hoặc nhập email</span>
        </div>

        {/* TAB 1: LOGIN */}
        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Đăng Nhập</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-medium focus:bg-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mật Khẩu</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-medium focus:bg-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-orange-500/25 transition-all"
            >
              Đăng Nhập Vào Hệ Thống
            </button>
          </form>
        ) : (
          /* TAB 2: REGISTER NEW USER ACCOUNT */
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Họ Và Tên Người Dùng</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-medium focus:bg-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Địa Chỉ Gmail Cá Nhân</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="nguyenvana@gmail.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-medium focus:bg-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mật Khẩu</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-medium focus:bg-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mã PIN Rút Tiền (6 số)</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  maxLength={6}
                  value={regPin}
                  onChange={(e) => setRegPin(e.target.value)}
                  placeholder="123456"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono font-bold tracking-widest focus:bg-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Đăng Ký Tài Khoản Ngay</span>
            </button>
          </form>
        )}

      </div>

      {/* GOOGLE OAUTH ACCOUNT SELECTOR MODAL */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-5 border border-gray-100">
            
            {/* Google Modal Header */}
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.94 1.19 15.23 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <div>
                <h3 className="font-extrabold text-gray-900 text-sm">Sign in with Google</h3>
                <p className="text-[11px] text-gray-500">Choose an account to continue to Giftixa</p>
              </div>
            </div>

            {/* List of Saved Google Accounts */}
            <div className="space-y-2">
              {savedGoogleAccounts.map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => handleSelectGoogleAccount(acc.email, acc.name)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl border border-gray-200 hover:border-orange-500 hover:bg-orange-50/50 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <img src={acc.avatar} alt={acc.name} className="w-9 h-9 rounded-full object-cover border border-gray-200" />
                    <div>
                      <div className="text-xs font-extrabold text-gray-900 group-hover:text-orange-600">{acc.name}</div>
                      <div className="text-[11px] text-gray-500 font-mono">{acc.email}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

            {/* Custom Google Account Input */}
            <form onSubmit={handleCustomGoogleSubmit} className="pt-2 border-t border-gray-100 space-y-2">
              <label className="block text-[11px] font-bold text-gray-500 uppercase">Đăng nhập tài khoản Gmail khác</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={customGoogleMail}
                  onChange={(e) => setCustomGoogleMail(e.target.value)}
                  placeholder="nhap.email.moi@gmail.com"
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-mono focus:bg-white focus:outline-none focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold shrink-0"
                >
                  Tiếp tục
                </button>
              </div>
            </form>

            <button
              onClick={() => setShowGoogleModal(false)}
              className="w-full py-2 text-center text-xs font-bold text-gray-400 hover:text-gray-600 pt-1"
            >
              Hủy bỏ
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
