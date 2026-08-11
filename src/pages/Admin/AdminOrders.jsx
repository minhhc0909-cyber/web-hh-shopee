import React, { useState } from 'react';
import { ShoppingBag, RefreshCcw, Search, Filter } from 'lucide-react';
import { getStoredOrders } from '../../services/storage';
import OrderCard from '../../components/OrderCard';

export default function AdminOrders() {
  const [orders] = useState(getStoredOrders());
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncOrders = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert("Đã kết nối Shopee Open API & cào thêm 12 đơn hàng mới vào hệ thống!");
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12">
      
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">Quản Lý Tất Cả Đơn Hàng Sàn</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Xem toàn bộ đơn hàng phát sinh từ Shopee, TikTok Shop, Lazada đã gắn SubID
          </p>
        </div>

        <button
          onClick={handleSyncOrders}
          disabled={isSyncing}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow-lg shadow-orange-500/25 flex items-center gap-2"
        >
          <RefreshCcw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Đang sync đơn...' : 'Đồng Bộ Đơn Từ Sàn'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.map(ord => (
          <OrderCard key={ord.id} order={ord} />
        ))}
      </div>

    </div>
  );
}
