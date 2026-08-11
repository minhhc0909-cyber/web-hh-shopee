import React from 'react';
import { ShoppingBag, Clock, CheckCircle2, XCircle, ArrowUpRight, Copy } from 'lucide-react';

export default function OrderCard({ order }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Đã Ghi Nhận
          </span>
        );
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Đã Hoàn Tiền
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 text-xs font-bold px-2.5 py-1 rounded-full border border-rose-200">
            <XCircle className="w-3.5 h-3.5" /> Đã Hủy
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> Đang Chờ Sàn Duyệt
          </span>
        );
    }
  };

  const getPlatformLabel = (platform) => {
    switch (platform) {
      case 'tiktok':
        return { label: 'TikTok Shop', color: 'bg-slate-900 text-white' };
      case 'lazada':
        return { label: 'Lazada', color: 'bg-indigo-600 text-white' };
      case 'shopee-food':
        return { label: 'ShopeeFood', color: 'bg-red-500 text-white' };
      default:
        return { label: 'Shopee', color: 'bg-orange-500 text-white' };
    }
  };

  const plat = getPlatformLabel(order.platform);

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 hover:border-orange-300 transition-all hover:shadow-md space-y-3">
      
      <div className="flex items-center justify-between text-xs border-b pb-2.5">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded text-[11px] font-extrabold ${plat.color}`}>
            {plat.label}
          </span>
          <span className="font-mono text-gray-500 font-bold">{order.id}</span>
        </div>
        <div>{getStatusBadge(order.status)}</div>
      </div>

      <div className="flex items-start gap-3">
        <img
          src={order.productImage}
          alt={order.productName}
          className="w-16 h-16 rounded-lg object-cover border border-gray-100 shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug">
            {order.productName}
          </h4>
          <div className="text-xs text-gray-500 mt-1">Ngày mua: {order.orderDate}</div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
        <div>
          <span className="text-gray-500 block text-[11px]">Giá sản phẩm</span>
          <span className="font-bold text-gray-900">{order.price.toLocaleString('vi-VN')} đ</span>
        </div>

        <div className="text-right">
          <span className="text-gray-500 block text-[11px]">Tiền hoàn của bạn (80%)</span>
          <span className="font-extrabold text-sm text-orange-600">
            +{order.userCashback.toLocaleString('vi-VN')} đ
          </span>
        </div>
      </div>

    </div>
  );
}
