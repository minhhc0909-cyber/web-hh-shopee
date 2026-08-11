import React from 'react';
import { ShieldCheck, MessageCircle, Heart, Lock, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-xl">
                🐹
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">Chuột Hoàn Tiền</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Nền tảng chuyển đổi link affiliate hoàn tiền mua sắm hàng đầu Việt Nam cho Shopee, TikTok Shop & Lazada. Nhận tới 80% hoa hồng trực tiếp về ngân hàng.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 bg-slate-800 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5" /> Thường trực 24/7
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Liên Kết Nhanh</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/" className="hover:text-orange-400 transition-colors">Công cụ chuyển link Shopee</a></li>
              <li><a href="/orders" className="hover:text-orange-400 transition-colors">Theo dõi đơn hàng hoàn tiền</a></li>
              <li><a href="/withdrawal" className="hover:text-orange-400 transition-colors">Rút tiền về ngân hàng (VietQR)</a></li>
              <li><a href="/referral" className="hover:text-orange-400 transition-colors">Chương trình Giới thiệu nhận 5%</a></li>
              <li><a href="/leaderboard" className="hover:text-orange-400 transition-colors">Bảng xếp hạng hoàn tiền cao nhất</a></li>
            </ul>
          </div>

          {/* Supported Platforms */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Sàn Được Hỗ Trợ</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 bg-slate-800/80 p-2 rounded-lg border border-slate-700/60">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span className="font-medium text-white">Shopee VN & ShopeeFood</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/80 p-2 rounded-lg border border-slate-700/60">
                <span className="w-2 h-2 rounded-full bg-slate-100"></span>
                <span className="font-medium text-white">TikTok Shop Việt Nam</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/80 p-2 rounded-lg border border-slate-700/60">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span className="font-medium text-white">Lazada Vietnam</span>
              </div>
            </div>
          </div>

          {/* Community & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Cộng Đồng & Hỗ Trợ</h4>
            <p className="text-xs text-slate-400">Tham gia nhóm Zalo để nhận thông báo mã giảm giá & cập nhật hoa hồng đợt mới nhất.</p>
            <a
              href="https://zalo.me"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Tham Gia Nhóm Zalo Hỗ Trợ</span>
            </a>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © 2026 Chuột Hoàn Tiền (chuot-hoantien.com). All rights reserved. 
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-emerald-400" /> Mã hóa SSL 256-bit</span>
            <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-400" /> Tối ưu bởi Antigravity Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
