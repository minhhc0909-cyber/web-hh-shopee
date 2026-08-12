import React, { useState } from 'react';
import { Users, Copy, Check, Gift, Sparkles, Share2, QrCode, LogIn } from 'lucide-react';
import { getStoredUser } from '../services/storage';
import { Link } from 'react-router-dom';

export default function Referral() {
  const user = getStoredUser();
  const [copied, setCopied] = useState(false);

  const referralCode = user?.referralCode || 'CHUOT-GIFTIXA';
  const referralEarnings = user?.referralEarnings || 0;
  const referralsCount = user?.referralsCount || 0;
  const referralUrl = user ? `https://www.giftixa.com/register?ref=${referralCode}` : 'https://www.giftixa.com/login';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-indigo-800/50">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-xs font-bold border border-purple-400/30">
            <Gift className="w-3.5 h-3.5" /> Chương Trình Giới Thiệu
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Mời Bạn Bè Mua Sắm <br />
            <span className="text-purple-300">Nhận Thêm 5% Hoa Hồng Nữa!</span>
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
            Mỗi khi người bạn được giới thiệu mua hàng qua Chuột Hoàn Tiền, bạn sẽ nhận được thêm 5% tiền hoàn thụ động trọn đời!
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center min-w-[200px] space-y-1">
          <span className="text-xs uppercase font-bold text-purple-200 block">Hoa Hồng Đã Nhận</span>
          <span className="text-2xl font-black text-amber-300">
            {referralEarnings.toLocaleString('vi-VN')} đ
          </span>
          <span className="text-[10px] text-purple-200 block">Đã mời: <b>{referralsCount} bạn bè</b></span>
        </div>
      </div>

      {!user ? (
        /* Guest Callout Box */
        <div className="bg-white rounded-2xl p-8 border border-purple-100 shadow-lg text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto text-2xl">
            🎁
          </div>
          <h2 className="text-xl font-extrabold text-gray-900">Đăng Nhập Để Lấy Link Giới Thiệu Cá Nhân</h2>
          <p className="text-xs text-gray-500 leading-relaxed max-w-md mx-auto">
            Vui lòng Đăng Nhập hoặc Đăng Ký tài khoản để sở hữu Mã Giới Thiệu riêng và bắt đầu kiếm hoa hồng thụ động 5% trọn đời từ bạn bè!
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-purple-600/25 transition-all"
          >
            <LogIn className="w-4 h-4" />
            <span>Đăng Nhập / Đăng Ký Ngay</span>
          </Link>
        </div>
      ) : (
        /* Logged-In User Referral Copy Widget */
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-gray-900">Link Giới Thiệu Của Bạn</h3>
          
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              readOnly
              value={referralUrl}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono font-bold text-indigo-600 focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-extrabold text-xs transition-all shadow-md shrink-0 ${
                copied ? 'bg-emerald-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Đã Chép Link!' : 'Sao Chép Link'}</span>
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500 pt-2">
            <span>Mã giới thiệu: <b className="font-mono text-gray-900">{referralCode}</b></span>
            <span>• Tự động gắn mã giới thiệu khi đăng ký</span>
          </div>
        </div>
      )}

    </div>
  );
}
