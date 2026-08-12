import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCheck, Lock, Mail, ArrowRight, UserPlus, KeyRound, CheckCircle2, User } from 'lucide-react';
import { SAMPLE_USER_ACCOUNT, SAMPLE_ADMIN_ACCOUNT } from '../services/mockData';
import { updateStoredUser, registerUser } from '../services/storage';

export default function Login({ setIsAdminMode }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'

  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPin, setRegPin] = useState('123456');
  const [regRef, setRegRef] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  const handleQuickLogin = (account) => {
    updateStoredUser(account);
    const isAdmin = account.role === 'admin';
    setIsAdminMode(isAdmin);
    if (isAdmin) {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (email === SAMPLE_ADMIN_ACCOUNT.email) {
      handleQuickLogin(SAMPLE_ADMIN_ACCOUNT);
    } else {
      handleQuickLogin(SAMPLE_USER_ACCOUNT);
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

    setIsAdminMode(false);
    setRegSuccess(`Đăng ký thành công tài khoản ${newUser.name}! Đang đăng nhập...`);

    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
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
          <div className="bg-emerald-50 text-emerald-700 text-xs p-3 rounded-xl border border-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{regSuccess}</span>
          </div>
        )}

        {/* TAB 1: LOGIN */}
        {activeTab === 'login' ? (
          <div className="space-y-5">
            
            {/* 1-Click Quick Preset Account Buttons */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block text-center">
                Đăng Nhập Thử Nghiệm 1-Click
              </span>

              <div className="grid grid-cols-1 gap-2.5">
                
                {/* User Account Preset */}
                <button
                  onClick={() => handleQuickLogin(SAMPLE_USER_ACCOUNT)}
                  className="flex items-center justify-between p-3.5 rounded-2xl border-2 border-orange-200 bg-orange-50/70 hover:bg-orange-100 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={SAMPLE_USER_ACCOUNT.avatar}
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-orange-400 object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-sm text-gray-900">{SAMPLE_USER_ACCOUNT.name}</span>
                        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-200">
                          ROLE: USER
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 font-mono">{SAMPLE_USER_ACCOUNT.email} • Pass: {SAMPLE_USER_ACCOUNT.password}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Admin Account Preset */}
                <button
                  onClick={() => handleQuickLogin(SAMPLE_ADMIN_ACCOUNT)}
                  className="flex items-center justify-between p-3.5 rounded-2xl border-2 border-slate-800 bg-slate-900 text-white hover:bg-slate-800 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={SAMPLE_ADMIN_ACCOUNT.avatar}
                      alt="Admin"
                      className="w-10 h-10 rounded-full border-2 border-orange-500 object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-sm text-white">{SAMPLE_ADMIN_ACCOUNT.name}</span>
                        <span className="bg-orange-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                          ROLE: ADMIN
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">{SAMPLE_ADMIN_ACCOUNT.email} • Pass: {SAMPLE_ADMIN_ACCOUNT.password}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t w-full border-gray-200" />
              <span className="bg-white px-3 text-[11px] font-bold text-gray-400 uppercase absolute">Hoặc nhập email</span>
            </div>

            {/* Standard Form Login */}
            <form onSubmit={handleLoginSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Tài Khoản</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@chuot-hoantien.com"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
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

          </div>
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
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Đăng Ký</label>
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
    </div>
  );
}
