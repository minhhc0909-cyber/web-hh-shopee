import React, { useState } from 'react';
import { ShoppingBag, Search, Filter, RefreshCw, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { getStoredOrders, getStoredUser } from '../services/storage';
import OrderCard from '../components/OrderCard';
import { Link } from 'react-router-dom';

export default function Orders() {
  const user = getStoredUser();
  const [orders] = useState(getStoredOrders());
  const [activeTab, setActiveTab] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-gray-200 text-center space-y-4 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto text-2xl">
            🔒
          </div>
          <h2 className="text-xl font-extrabold text-gray-900">Vui Lòng Đăng Nhập</h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            Tính năng Quản Lý Đơn Hàng yêu cầu bạn Đăng Nhập hoặc Đăng Ký tài khoản để theo dõi lịch sử hoàn tiền cá nhân.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-orange-500/25 transition-all"
          >
            Đăng Nhập / Đăng Ký Ngay
          </Link>
        </div>
      </div>
    );
  }


  const filteredOrders = orders.filter(ord => {
    // Status filter
    if (activeTab === 'pending' && ord.status !== 'pending') return false;
    if (activeTab === 'approved' && ord.status !== 'approved') return false;
    if (activeTab === 'paid' && ord.status !== 'paid') return false;
    if (activeTab === 'cancelled' && ord.status !== 'cancelled') return false;

    // Platform filter
    if (platformFilter !== 'all' && ord.platform !== platformFilter) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = ord.productName.toLowerCase().includes(q);
      const matchId = ord.id.toLowerCase().includes(q);
      if (!matchName && !matchId) return false;
    }

    return true;
  });

  const totalCalculatedCashback = filteredOrders.reduce((sum, item) => sum + item.userCashback, 0);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">Quản Lý Đơn Hàng Hoàn Tiền</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Theo dõi tất cả đơn hàng đã mua qua link Affiliate của bạn trên Shopee, TikTok & Lazada
          </p>
        </div>

        <div className="bg-orange-50 px-4 py-2 rounded-xl border border-orange-200">
          <span className="text-[11px] text-orange-700 font-semibold uppercase block">Tổng tiền hoàn trong danh sách</span>
          <span className="text-lg font-black text-orange-600">
            {totalCalculatedCashback.toLocaleString('vi-VN')} đ
          </span>
        </div>
      </div>

      {/* Controls & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-4">
        
        {/* Status Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-gray-100 no-scrollbar">
          {[
            { id: 'all', label: 'Tất Cả' },
            { id: 'pending', label: 'Chờ Sàn Duyệt' },
            { id: 'approved', label: 'Đã Ghi Nhận' },
            { id: 'paid', label: 'Đã Hoàn Tiền' },
            { id: 'cancelled', label: 'Đã Hủy' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Platform Filter Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên sản phẩm hoặc Mã đơn..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs font-medium focus:bg-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-xs font-bold rounded-xl px-3 py-2 text-gray-700 focus:outline-none focus:border-orange-500"
            >
              <option value="all">Tất cả sàn</option>
              <option value="shopee">Shopee VN</option>
              <option value="tiktok">TikTok Shop</option>
              <option value="lazada">Lazada</option>
              <option value="shopee-food">ShopeeFood</option>
            </select>
          </div>

        </div>

      </div>

      {/* Orders Grid */}
      {filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOrders.map(ord => (
            <OrderCard key={ord.id} order={ord} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center space-y-3 border border-gray-200">
          <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto text-xl">
            📦
          </div>
          <h3 className="font-bold text-gray-800 text-base">Không tìm thấy đơn hàng nào</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Vui lòng kiểm tra lại bộ lọc hoặc dán link sản phẩm để thực hiện mua sắm nhận hoàn tiền ngay!
          </p>
        </div>
      )}

    </div>
  );
}
