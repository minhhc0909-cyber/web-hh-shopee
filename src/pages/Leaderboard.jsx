import React from 'react';
import { Trophy, Medal, Crown, Flame, Sparkles } from 'lucide-react';
import { getLeaderboard } from '../services/storage';

export default function Leaderboard() {
  const leaders = getLeaderboard();

  return (
    <div className="space-y-6 pb-12">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-6 sm:p-8 rounded-2xl shadow-xl text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-white/20 px-3.5 py-1 rounded-full text-xs font-bold border border-white/30">
          <Trophy className="w-4 h-4 text-amber-200" /> Bảng Xếp Hạng Tháng 8/2026
        </div>
        <h1 className="text-2xl sm:text-4xl font-black">Top Mua Sắm Hoàn Tiền Cao Nhất</h1>
        <p className="text-xs sm:text-sm text-amber-100 max-w-xl mx-auto">
          Vinh danh những thành viên mua sắm thông minh và nhận hoàn tiền nhiều nhất hệ thống Chuột Hoàn Tiền
        </p>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex items-center justify-between font-extrabold text-xs uppercase tracking-wider text-gray-500">
          <span className="w-16">Hạng</span>
          <span className="flex-1">Thành Viên</span>
          <span className="w-28 text-center">Đơn Mua</span>
          <span className="w-36 text-right">Tổng Hoàn Tiền</span>
        </div>

        <div className="divide-y divide-gray-100">
          {leaders.map((item) => {
            const isTop3 = item.rank <= 3;
            return (
              <div
                key={item.rank}
                className={`p-4 flex items-center justify-between text-sm transition-colors ${
                  item.name.includes('(Bạn)') ? 'bg-orange-50/70 border-l-4 border-orange-500' : 'hover:bg-gray-50'
                }`}
              >
                <div className="w-16 font-black flex items-center gap-1">
                  {item.rank === 1 && <Crown className="w-5 h-5 text-amber-500" />}
                  {item.rank === 2 && <Medal className="w-5 h-5 text-slate-400" />}
                  {item.rank === 3 && <Medal className="w-5 h-5 text-amber-700" />}
                  <span className={`text-base ${isTop3 ? 'text-orange-600 font-extrabold' : 'text-gray-500'}`}>
                    #{item.rank}
                  </span>
                </div>

                <div className="flex-1 flex items-center gap-3">
                  <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover border" />
                  <div>
                    <span className="font-extrabold text-gray-900 block">{item.name}</span>
                    <span className="text-xs text-gray-400">Thành viên Verified</span>
                  </div>
                </div>

                <div className="w-28 text-center font-bold text-xs text-gray-600">
                  {item.orders} đơn
                </div>

                <div className="w-36 text-right font-black text-orange-600 text-base">
                  {item.cashback.toLocaleString('vi-VN')} đ
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
