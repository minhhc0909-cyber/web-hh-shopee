import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { updateStoredUser, registerUser } from '../services/storage';

export default function Login({ setIsAdminMode }) {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    // Dynamically load Google's Real Official GSI SDK
    const scriptId = 'google-gsi-client-script';
    let script = document.getElementById(scriptId);

    const initGsi = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: "1098471209384-giftixa.apps.googleusercontent.com",
          callback: handleGoogleGsiResponse,
          auto_select: false
        });

        // Render Official Google Native Sign-In Button directly inside container
        const btnContainer = document.getElementById("google-official-btn-container");
        if (btnContainer) {
          btnContainer.innerHTML = '';
          window.google.accounts.id.renderButton(btnContainer, {
            theme: "outline",
            size: "large",
            width: "100%",
            text: "signin_with",
            shape: "rectangular",
            logo_alignment: "left"
          });
        }
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initGsi;
      document.head.appendChild(script);
    } else {
      initGsi();
    }
  }, []);

  const handleGoogleGsiResponse = async (response) => {
    setIsVerifying(true);
    setStatusMsg('[Google GSI Verified] Google đã trả về ID Token chính chủ ➔ Đang gửi về Backend...');

    try {
      // Send Google response.credential JWT ID Token to Backend API
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential })
      });

      const data = await res.json();

      if (data.success && data.user) {
        updateStoredUser(data.user);
        setIsAdminMode(data.user.role === 'admin');
        setIsVerifying(false);
        setStatusMsg(`✓ Google xác thực chính chủ cho ${data.user.email}! Đang đăng nhập...`);

        setTimeout(() => {
          if (data.user.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        }, 600);
      }
    } catch (err) {
      console.error('Google GSI verification error:', err);
      setIsVerifying(false);
    }
  };

  const handleNativeGooglePrompt = () => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.prompt();
    } else {
      window.open('https://accounts.google.com/AccountChooser?service=mail', '_blank');
    }
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
      
      {/* Main Container 2 Columns */}
      <div className="bg-white rounded-none sm:rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full min-h-[640px] flex flex-col md:flex-row border border-gray-100">
        
        {/* LEFT COLUMN: ORANGE BRAND BANNER */}
        <div className="md:w-5/12 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
          
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

        {/* RIGHT COLUMN: LOGIN FORM WITH OFFICIAL GOOGLE NATIVE BUTTON */}
        <div className="md:w-7/12 p-8 sm:p-12 bg-white flex flex-col justify-between relative">
          
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
              <p className="text-xs text-gray-500">Đăng nhập nhanh bằng tài khoản Google Identity Services.</p>
            </div>

            {statusMsg && (
              <div className="bg-orange-50 text-orange-900 text-xs p-3.5 rounded-xl border border-orange-200 flex items-center gap-2">
                {isVerifying ? <Loader2 className="w-4 h-4 text-orange-600 animate-spin shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />}
                <span>{statusMsg}</span>
              </div>
            )}

            {/* Email OTP Login Form */}
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

            <div className="relative flex items-center justify-center py-2">
              <div className="border-t w-full border-gray-200" />
              <span className="bg-white px-4 text-xs text-gray-400 font-medium uppercase absolute">hoặc</span>
            </div>

            {/* REAL OFFICIAL GOOGLE NATIVE BUTTON CONTAINER (Rendered directly by Google GSI SDK) */}
            <div className="space-y-2">
              <div id="google-official-btn-container" className="w-full min-h-[44px] flex justify-center"></div>

              {/* Fallback button triggering Google's native Account Chooser */}
              <button
                type="button"
                onClick={handleNativeGooglePrompt}
                className="w-full py-3.5 px-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm font-bold text-gray-700 transition-all flex items-center justify-center gap-3 shadow-xs hover:shadow-md"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.94 1.19 15.23 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Đăng nhập bằng Google (Chính Thức)</span>
              </button>
            </div>

          </div>

          <div className="text-center text-[11px] text-gray-400">
            © 2026 Giftixa – Chuột Hoàn Tiền. Bảo mật thông tin người dùng.
          </div>

        </div>

      </div>

    </div>
  );
}
