import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Send, CheckCircle2, User, UserPlus, KeyRound, Lock } from 'lucide-react';
import { updateStoredUser, registerUser } from '../services/storage';

export default function Login({ setIsAdminMode }) {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState('');
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [showCustomEmailInput, setShowCustomEmailInput] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  // 1:1 Accounts matching user's exact Google accounts screenshot (Image 2)
  const googleAccounts = [
    { name: 'Hoang Minh', email: 'minhhc0909@gmail.com', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80', initial: 'H', color: 'bg-amber-500' },
    { name: 'Deluxe Autocar', email: 'autocardeluxes@gmail.com', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80', initial: 'D', color: 'bg-sky-600' },
    { name: 'Linh Phương', email: 'linh386606@gmail.com', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', initial: 'L', color: 'bg-emerald-600' },
    { name: 'Minh Hoang', email: 'hoangminh1999.8a@gmail.com', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80', initial: 'M', color: 'bg-purple-600' },
    { name: 'asby reginia', email: 'reginiaasbymcg94@gmail.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', initial: 'a', color: 'bg-pink-600' },
    { name: 'minh hoàng', email: 'hoangminh1999.1a@gmail.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', initial: 'm', color: 'bg-indigo-600' }
  ];

  const handleSelectAccount = (account) => {
    setShowGoogleModal(false);
    setStatusMsg(`✓ Đã đăng nhập bằng tài khoản Google: ${account.email}`);

    const isAdmin = account.email.toLowerCase().includes('admin');
    const loggedUser = registerUser({
      name: account.name,
      email: account.email,
      password: 'google_authenticated',
      pin: '123456'
    });

    if (account.avatar) {
      loggedUser.avatar = account.avatar;
    }

    updateStoredUser(loggedUser);
    setIsAdminMode(isAdmin);

    setTimeout(() => {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }, 600);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    const userMail = emailInput.trim();
    const isAdmin = userMail.toLowerCase().includes('admin');

    const loggedUser = registerUser({
      name: userMail.split('@')[0],
      email: userMail,
      password: 'email_otp_login',
      pin: '123456'
    });

    updateStoredUser(loggedUser);
    setIsAdminMode(isAdmin);
    setStatusMsg(`✓ Đã gửi mã đăng nhập tới ${userMail}! Đang chuyển hướng...`);

    setTimeout(() => {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-0 sm:p-6 font-sans">
      
      {/* Container 2 Cột giống 100% Ảnh 1 */}
      <div className="bg-white rounded-none sm:rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full min-h-[640px] flex flex-col md:flex-row border border-gray-100">
        
        {/* CỘT TRÁI: ORANGE BANNER (Giống 100% Screenshot 1) */}
        <div className="md:w-5/12 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
          
          {/* Background Decorative Circles */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute top-1/2 -right-20 w-64 h-64 rounded-full bg-amber-400/20 blur-2xl pointer-events-none" />

          {/* Logo & Header */}
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl border border-white/30 shadow-md">
                🐹
              </div>
              <div>
                <h3 className="font-black text-lg text-white leading-tight">Chuột – hoàn tiền</h3>
                <p className="text-xs text-orange-100 font-medium">Đăng nhập nhanh để lưu hoa hồng</p>
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <h1 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight text-white">
                Đăng nhập một lần, theo dõi hoa hồng dễ hơn mỗi ngày.
              </h1>
              <p className="text-xs sm:text-sm text-orange-100 leading-relaxed">
                Chỉ cần email để nhận mã OTP. Không cần mật khẩu, không mất thời gian làm quen lại từ đầu.
              </p>
            </div>
          </div>

          {/* Bottom Quote Badge */}
          <div className="pt-8 relative z-10">
            <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-xs text-orange-50 leading-relaxed space-y-2">
              <p>“Hoa hồng được cộng dồn từ những chia sẻ đều đặn, và chúng tôi muốn đồng hành cùng bạn trên chặng đường đó.”</p>
              <div className="font-extrabold uppercase text-[10px] tracking-wider text-white">CHUỘT – HOÀN TIỀN</div>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: FORM ĐĂNG NHẬP (Giống 100% Screenshot 1) */}
        <div className="md:w-7/12 p-8 sm:p-12 bg-white flex flex-col justify-between relative">
          
          {/* Top Return Link */}
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Về trang giới thiệu</span>
            </Link>
          </div>

          {/* Main Content Box */}
          <div className="max-w-md w-full mx-auto my-auto py-8 space-y-6">
            
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Chào mừng bạn quay lại</h2>
              <p className="text-xs text-gray-500">Đăng nhập nhanh bằng tài khoản Google.</p>
            </div>

            {statusMsg && (
              <div className="bg-emerald-50 text-emerald-700 text-xs p-3.5 rounded-xl border border-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{statusMsg}</span>
              </div>
            )}

            {/* Form Nhập Email OTP */}
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Địa chỉ email</label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-gray-50/70 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Gửi mã đăng nhập</span>
              </button>
            </form>

            {/* Divider hoac */}
            <div className="relative flex items-center justify-center py-2">
              <div className="border-t w-full border-gray-200" />
              <span className="bg-white px-4 text-xs text-gray-400 font-medium uppercase absolute">hoặc</span>
            </div>

            {/* OFFICIAL GOOGLE LOGIN BUTTON (Screenshot 1) */}
            <button
              type="button"
              onClick={() => setShowGoogleModal(true)}
              className="w-full py-3.5 px-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm font-bold text-gray-700 transition-all flex items-center justify-center gap-3 shadow-xs hover:shadow-md"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.94 1.19 15.23 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Đăng nhập bằng Google</span>
            </button>

          </div>

          {/* Footer note */}
          <div className="text-center text-[11px] text-gray-400">
            © 2026 Giftixa – Chuột Hoàn Tiền. Bảo mật thông tin người dùng.
          </div>

        </div>

      </div>

      {/* ------------------------------------------------------------------ */}
      {/* GOOGLE ACCOUNT SELECTOR MODAL - REPLICA 1:1 OF SCREENSHOT 2 */}
      {/* ------------------------------------------------------------------ */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border border-gray-200 space-y-6 relative overflow-hidden">
            
            {/* Modal Header Bar: Google Icon & App Name */}
            <div className="flex items-center gap-2 pb-2">
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.94 1.19 15.23 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span className="text-xs font-bold text-gray-600">Đăng nhập bằng Google</span>
            </div>

            {/* Big Titles (1:1 Screenshot 2) */}
            <div className="space-y-1">
              <h2 className="text-3xl font-normal text-gray-900 tracking-tight">Chọn tài khoản</h2>
              <p className="text-sm text-gray-600 font-medium">Tiếp tục tới <span className="text-indigo-600 font-bold">giftixa.com</span></p>
            </div>

            {/* List of Accounts (1:1 Screenshot 2) */}
            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
              {googleAccounts.map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => handleSelectAccount(acc)}
                  className="w-full flex items-center justify-between py-3.5 px-2 hover:bg-gray-50/80 rounded-xl transition-all text-left group"
                >
                  <div className="flex items-center gap-3.5">
                    {acc.avatar ? (
                      <img src={acc.avatar} alt={acc.name} className="w-9 h-9 rounded-full object-cover border border-gray-200" />
                    ) : (
                      <div className={`w-9 h-9 rounded-full ${acc.color} text-white flex items-center justify-center text-sm font-bold`}>
                        {acc.initial}
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-extrabold text-gray-900 group-hover:text-orange-600">{acc.name}</div>
                      <div className="text-xs text-gray-500 font-normal">{acc.email}</div>
                    </div>
                  </div>
                </button>
              ))}

              {/* Use Another Account Row */}
              {showCustomEmailInput ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!customEmail || !customEmail.includes('@')) return;
                    handleSelectAccount({ name: customEmail.split('@')[0], email: customEmail });
                  }}
                  className="py-3 px-2 space-y-2"
                >
                  <label className="block text-xs font-bold text-gray-700">Nhập địa chỉ Gmail khác:</label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      placeholder="ten.ban@gmail.com"
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium focus:bg-white focus:outline-none focus:border-orange-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-orange-500 text-white rounded-xl text-xs font-bold shrink-0 hover:bg-orange-600"
                    >
                      Tiếp tục
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setShowCustomEmailInput(true)}
                  className="w-full flex items-center gap-3.5 py-3.5 px-2 hover:bg-gray-50/80 rounded-xl transition-all text-left text-gray-800 hover:text-orange-600 font-bold text-xs"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 border border-gray-200">
                    👤
                  </div>
                  <span>Sử dụng một tài khoản khác</span>
                </button>
              )}
            </div>

            {/* Privacy Note (1:1 Screenshot 2) */}
            <p className="text-xs text-gray-500 leading-relaxed">
              Trước khi sử dụng giftixa.com, bạn có thể xem <span className="text-indigo-600 font-bold hover:underline cursor-pointer">Chính sách quyền riêng tư</span> và <span className="text-indigo-600 font-bold hover:underline cursor-pointer">Điều khoản dịch vụ</span> của ứng dụng này.
            </p>

            {/* Footer Row */}
            <div className="flex items-center justify-between pt-2 text-xs text-gray-500 border-t border-gray-100">
              <span className="cursor-pointer hover:underline">Tiếng Việt</span>
              <div className="flex items-center gap-4">
                <span className="cursor-pointer hover:underline">Trợ giúp</span>
                <span className="cursor-pointer hover:underline">Quyền riêng tư</span>
                <span className="cursor-pointer hover:underline">Điều khoản</span>
              </div>
            </div>

            <button
              onClick={() => setShowGoogleModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold p-2"
            >
              ✕
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
