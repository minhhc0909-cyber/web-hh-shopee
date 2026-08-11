import React from 'react';
import { ShieldCheck, Users, ShoppingBag, Wallet, ArrowRightLeft, RefreshCcw, TrendingUp } from 'lucide-react';
import { getAdminSessions, getStoredOrders, getStoredWithdrawals } from '../../services/storage';

export default function AdminDashboard() {
  const sessions = getAdminSessions();
  const orders = getStoredOrders();
  const withdrawals = getStoredWithdrawals();

  const totalPlatformOrders = 12450;
  const totalCommissionSystem = 145000000;
  const totalUserCashback = totalCommissionSystem * 0.8;
  const systemNetProfit = totalCommissionSystem * 0.2;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Admin Title */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex items-center justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-orange-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded">
            <ShieldCheck className="w-3.5 h-3.5" /> Quản Trị Hệ Thống
          </div>
          <h1 className="text-2xl font-black">Cổng Quản Trị Chuột Hoàn Tiền Admin</h1>
          <p className="text-xs text-slate-400">Giám sát phiên làm việc Shopee/TikTok Session, đối soát hoa hồng và duyệt rút tiền</p>
        </div>

        <button
          onClick={() => alert("Đã phát lệnh đồng bộ toàn bộ đơn hàng từ Shopee & TikTok API!")}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md"
        >
          <RefreshCcw className="w-4 h-4" />
          <span>Sync Đơn Ngay</span>
        </button>
      </div>

      {/* Admin Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-gray-500 uppercase">Tổng Đơn Hàng</span>
          <div className="text-2xl font-black text-slate-900">{totalPlatformOrders.toLocaleString()} đơn</div>
          <div className="text-[11px] text-gray-400">Tích lũy hệ thống</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-gray-500 uppercase">Doanh Thu Hoa Hồng Sàn</span>
          <div className="text-2xl font-black text-blue-600">{totalCommissionSystem.toLocaleString('vi-VN')} đ</div>
          <div className="text-[11px] text-gray-400">Từ Shopee, TikTok, Lazada</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-gray-500 uppercase">Đã Trả Khách (80%)</span>
          <div className="text-2xl font-black text-orange-600">{totalUserCashback.toLocaleString('vi-VN')} đ</div>
          <div className="text-[11px] text-gray-400">Số dư hoàn cho người dùng</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-xs font-bold text-gray-500 uppercase">Lợi Nhuận Ròng (20%)</span>
          <div className="text-2xl font-black text-emerald-600">{systemNetProfit.toLocaleString('vi-VN')} đ</div>
          <div className="text-[11px] text-gray-400">Doanh thu sàn giữ lại</div>
        </div>

      </div>

      {/* Admin Sessions Status Grid */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 space-y-4">
        <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5 text-orange-500" /> Trạng Thái Session Sàn Affiliate
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sessions.map(sess => (
            <div key={sess.id} className="p-4 rounded-xl border border-gray-200 space-y-2 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-gray-900 uppercase">{sess.platform} - {sess.accountName}</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-extrabold rounded-full border border-emerald-200">
                  {sess.sessionCookieStatus.toUpperCase()}
                </span>
              </div>
              <div className="text-xs text-gray-500 space-y-1 font-mono">
                <div>App Key: {sess.appKey}</div>
                <div>Lần Sync gần nhất: {sess.lastSynced}</div>
                <div>Đơn hàng hôm nay: <b className="text-gray-900">{sess.totalOrdersSyncedToday} đơn</b></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
