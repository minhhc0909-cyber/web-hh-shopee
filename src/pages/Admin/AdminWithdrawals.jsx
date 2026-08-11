import React, { useState } from 'react';
import { Wallet, CheckCircle2, XCircle, Landmark, RefreshCw, QrCode } from 'lucide-react';
import { getStoredWithdrawals } from '../../services/storage';

export default function AdminWithdrawals() {
  const [withdrawals, setWithdrawals] = useState(getStoredWithdrawals());

  const handleApprove = (id) => {
    const updated = withdrawals.map(w => w.id === id ? { ...w, status: 'completed' } : w);
    setWithdrawals(updated);
    localStorage.setItem('chuot_withdrawals', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6 pb-12">
      
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">Quản Lý Yêu Cầu Rút Tiền</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Duyệt chuyển tiền trực tiếp cho khách hàng qua cổng VietQR SePay
          </p>
        </div>

        <span className="bg-orange-100 text-orange-700 font-extrabold text-xs px-3 py-1.5 rounded-full border border-orange-200">
          {withdrawals.filter(w => w.status === 'pending').length} Yêu cầu cần duyệt
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-bold uppercase border-b">
              <tr>
                <th className="p-4">Mã Giao Dịch</th>
                <th className="p-4">Thời gian</th>
                <th className="p-4">Số tiền rút</th>
                <th className="p-4">Thông tin Ngân hàng</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-right">Thao tác Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {withdrawals.map((wdr) => (
                <tr key={wdr.id} className="hover:bg-gray-50">
                  <td className="p-4 font-mono font-bold text-gray-900">{wdr.id}</td>
                  <td className="p-4 text-gray-500">{wdr.date}</td>
                  <td className="p-4 font-extrabold text-orange-600 text-sm">
                    {wdr.amount.toLocaleString('vi-VN')} đ
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-gray-900">{wdr.bankName}</div>
                    <div className="font-mono text-gray-600">{wdr.accountNumber}</div>
                    <div className="font-bold uppercase text-gray-500">{wdr.accountName}</div>
                  </td>
                  <td className="p-4">
                    {wdr.status === 'completed' ? (
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đã Duyệt
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-200">
                        Chờ Duyệt
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {wdr.status === 'pending' ? (
                      <button
                        onClick={() => handleApprove(wdr.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm"
                      >
                        Duyệt Chuyển Tiền
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 font-mono">SEPAY-DONE</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
