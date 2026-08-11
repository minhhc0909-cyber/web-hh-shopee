import React, { useState } from 'react';
import { 
  Wallet, 
  ShoppingBag, 
  TrendingUp, 
  ArrowUpRight, 
  Users, 
  Clock, 
  CheckCircle2, 
  Plus, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { getStoredUser, getStoredOrders } from '../services/storage';
import OrderCard from '../components/OrderCard';
import WithdrawalModal from '../components/WithdrawalModal';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(getStoredUser());
  const [orders] = useState(getStoredOrders());
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const refreshUser = () => {
    setUser(getStoredUser());
  };

  const recentOrders = orders.slice(0, 4);

  return (
    <div className="space-y-6 pb-12">
      
      {/* User Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-orange-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-slate-800">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-14 h-14 rounded-full border-2 border-orange-500 object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black">{user.name}</h1>
              <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">VIP Level 1</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">ID Thành Viên: <span className="font-mono text-orange-400 font-bold">{user.id}</span></p>
          </div>
        </div>

        <button
          onClick={() => setIsWithdrawOpen(true)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow-lg shadow-orange-500/30"
        >
          <Wallet className="w-4 h-4" />
          <span>Rút Tiền Về Ngân Hàng</span>
        </button>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Available Balance */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Số Dư Khả Dụng</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              ₫
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600">
            {user.balance.toLocaleString('vi-VN')} đ
          </div>
          <div className="text-[11px] text-gray-400 flex items-center justify-between pt-1 border-t">
            <span>Sẵn sàng rút về VietQR</span>
            <button onClick={() => setIsWithdrawOpen(true)} className="text-orange-600 font-bold hover:underline">Rút ngay →</button>
          </div>
        </div>

        {/* Pending Commission */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Hoa Hồng Chờ Duyệt</span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600">
            {user.pendingBalance.toLocaleString('vi-VN')} đ
          </div>
          <div className="text-[11px] text-gray-400 pt-1 border-t">
            Đơn hàng đang chờ sàn Shopee/TikTok xác nhận
          </div>
        </div>

        {/* Total Lifetime Cashback */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Tổng Tiền Đã Hoàn</span>
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900">
            {user.totalCashback.toLocaleString('vi-VN')} đ
          </div>
          <div className="text-[11px] text-gray-400 pt-1 border-t">
            Tích lũy từ khi tham gia hệ thống
          </div>
        </div>

      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link to="/" className="bg-white p-4 rounded-xl border border-gray-200 hover:border-orange-400 transition-all flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-xs text-gray-900 block">Tạo Link Mới</span>
            <span className="text-[10px] text-gray-400">Chuyển Shopee/TikTok</span>
          </div>
        </Link>

        <Link to="/orders" className="bg-white p-4 rounded-xl border border-gray-200 hover:border-orange-400 transition-all flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-xs text-gray-900 block">Quản Lý Đơn</span>
            <span className="text-[10px] text-gray-400">Xem tất cả đơn hàng</span>
          </div>
        </Link>

        <Link to="/referral" className="bg-white p-4 rounded-xl border border-gray-200 hover:border-orange-400 transition-all flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-xs text-gray-900 block">Mời Bạn Bè</span>
            <span className="text-[10px] text-gray-400">Nhận 5% hoa hồng F1</span>
          </div>
        </Link>

        <Link to="/leaderboard" className="bg-white p-4 rounded-xl border border-gray-200 hover:border-orange-400 transition-all flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-xs text-gray-900 block">Bảng Xếp Hạng</span>
            <span className="text-[10px] text-gray-400">Top người hoàn tiền</span>
          </div>
        </Link>
      </div>

      {/* Recent Orders List */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <h3 className="font-extrabold text-base text-gray-900">Đơn Hàng Vừa Ghi Nhận</h3>
            <p className="text-xs text-gray-500">Hiển thị các đơn hàng gần nhất được gắn mã {user.id}</p>
          </div>
          <Link to="/orders" className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1">
            <span>Xem Tất Cả</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recentOrders.map(ord => (
            <OrderCard key={ord.id} order={ord} />
          ))}
        </div>
      </div>

      <WithdrawalModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        onRefresh={refreshUser}
      />

    </div>
  );
}
