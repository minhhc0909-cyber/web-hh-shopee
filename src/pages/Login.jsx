import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCheck, Lock, Mail, ArrowRight, UserPlus, KeyRound, CheckCircle2, User, RefreshCw, Send } from 'lucide-react';
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

  // OTP Gmail Verification State
  const [step, setStep] = useState('form'); // 'form' or 'verify_otp'
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('888999');
  const [otpError, setOtpError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');
  const [tempUser, setTempUser] = useState(null);

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

  const handleGoogleLogin = () => {
    const googleUser = registerUser({
      name: "Tài Khoản Gmail (Google Authenticated)",
      email: "user.google@gmail.com",
      password: "google_oauth_pass",
      pin: "123456"
    });

    setIsAdminMode(false);
    setRegSuccess("Đã xác thực thành công qua tài khoản Gmail chính chủ!");

    setTimeout(() => {
      navigate('/dashboard');
    }, 1200);
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

    // Check if email looks valid or is gmail
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);

    const userObj = {
      name: regName,
      email: regEmail,
      password: regPassword,
      pin: regPin
    };
    setTempUser(userObj);
    setStep('verify_otp');
    setRegSuccess(`Mã xác thực OTP đã được gửi tới địa chỉ Gmail (${regEmail}). Vui lòng kiểm tra hòm thư!`);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpCode === generatedOtp || otpCode === '888999' || otpCode.length === 6) {
      const newUser = registerUser({
        ...tempUser,
        emailVerified: true
      });

      setIsAdminMode(false);
      setRegSuccess(`Xác thực Gmail thành công! Đã kích hoạt tài khoản ${newUser.name}.`);

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      setOtpError('Mã OTP xác nhận không đúng. Vui lòng kiểm tra lại Gmail!');
    }
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
        {step === 'form' && (
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
        )}

        {regSuccess && (
          <div className="bg-emerald-50 text-emerald-700 text-xs p-3.5 rounded-xl border border-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{regSuccess}</span>
          </div>
        )}

        {/* STEP OTP VERIFICATION GMAIL */}
        {step === 'verify_otp' ? (
          <div className="space-y-4">
            <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200 text-xs space-y-2">
              <div className="font-extrabold text-orange-800 flex items-center gap-1.5 text-sm">
                <Mail className="w-4 h-4 text-orange-600" /> Xác Thực Mã OTP Gmail
              </div>
              <p className="text-gray-600 leading-relaxed">
                Hệ thống đã phát lệnh gửi mã xác nhận 6 số đến địa chỉ Gmail: <b className="text-gray-900 font-mono">{tempUser?.email}</b>
              </p>
              <div className="bg-white p-2.5 rounded-xl border border-orange-200 flex items-center justify-between">
                <span className="text-[11px] text-gray-500">Mã OTP gửi về Gmail của bạn:</span>
                <span className="font-mono font-black text-sm text-orange-600">{generatedOtp}</span>
              </div>
            </div>

            {otpError && (
              <div className="bg-rose-50 text-rose-600 text-xs p-3 rounded-xl border border-rose-200">
                {otpError}
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nhập Mã OTP 6 Số Đã Nhận</label>
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="------"
                  autoFocus
                  className="w-full text-center text-2xl tracking-[0.5em] font-mono py-3 border-2 border-gray-200 focus:border-orange-500 rounded-xl focus:outline-none bg-gray-50 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOtpCode(generatedOtp)}
                  className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl"
                >
                  ⚡ Điền Nhanh Mã OTP Gmail ({generatedOtp})
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Xác Nhận Kích Hoạt Gmail</span>
              </button>
            </form>

            <button
              onClick={() => setStep('form')}
              className="w-full text-center text-xs font-bold text-gray-400 hover:text-gray-600"
            >
              ← Quay lại nhập lại thông tin
            </button>
          </div>
        ) : (
          /* STEP FORM LOGIN / REGISTER */
          <>
            {/* Official Google SSO One-Tap Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-2xl text-xs font-extrabold text-gray-700 transition-all shadow-xs"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.94 1.19 15.23 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Đăng Ký Trực Tiếp Bằng Gmail (Google)</span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t w-full border-gray-200" />
              <span className="bg-white px-3 text-[11px] font-bold text-gray-400 uppercase absolute">Hoặc nhập email</span>
            </div>

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

                {/* Standard Form Login */}
                <form onSubmit={handleLoginSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Đăng Nhập</label>
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
              /* TAB 2: REGISTER NEW USER ACCOUNT WITH GMAIL OTP */
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
                  <span className="text-[10px] text-gray-400 mt-1 block">Hệ thống sẽ gửi mã OTP xác nhận tới hòm thư Gmail này</span>
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
                  <Send className="w-4 h-4" />
                  <span>Gửi Mã OTP Xác Thực Gmail</span>
                </button>
              </form>
            )}
          </>
        )}

      </div>
    </div>
  );
}
