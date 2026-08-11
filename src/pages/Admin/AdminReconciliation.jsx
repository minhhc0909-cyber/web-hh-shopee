import React, { useState } from 'react';
import { ArrowRightLeft, CheckCircle2, FileSpreadsheet, RefreshCw, AlertCircle } from 'lucide-react';

export default function AdminReconciliation() {
  const [selectedBatch, setSelectedBatch] = useState('2026-08-BATCH-01');

  const batchItems = [
    { id: '2026-08-BATCH-01', period: 'Kỳ 01/08 - 07/08/2026', platform: 'Shopee VN', ordersCount: 1420, grossComm: 42500000, userCashbackTotal: 34000000, status: 'reconciled' },
    { id: '2026-08-BATCH-02', period: 'Kỳ 01/08 - 07/08/2026', platform: 'TikTok Shop', ordersCount: 890, grossComm: 31200000, userCashbackTotal: 24960000, status: 'reconciled' },
    { id: '2026-08-BATCH-03', period: 'Kỳ 08/08 - 14/08/2026', platform: 'Shopee VN', ordersCount: 1650, grossComm: 52000000, userCashbackTotal: 41600000, status: 'pending' },
    { id: '2026-08-BATCH-04', period: 'Kỳ 01/08 - 07/08/2026', platform: 'ShopeeFood', ordersCount: 450, grossComm: 9800000, userCashbackTotal: 7840000, status: 'reconciled' }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">Phân Hệ Đối Soát Hoa Hồng Sàn</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Đối soát tệp doanh số báo cáo từ Shopee, TikTok Shop & Lazada để kết toán hoàn tiền cho khách hàng
          </p>
        </div>

        <button
          onClick={() => alert("Đã mở trình tải file Excel báo cáo hoa hồng từ Shopee Affiliate Portal!")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Upload File Đối Soát Excel</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b font-extrabold text-sm text-gray-900 flex items-center justify-between">
          <span>Các Đợt Đối Soát Gần Đây</span>
          <span className="text-xs text-gray-400 font-normal">Cập nhật tự động 24h/lần</span>
        </div>

        <div className="divide-y divide-gray-100">
          {batchItems.map((item) => (
            <div key={item.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50">
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-gray-900">{item.platform}</span>
                  <span className="font-mono text-xs text-gray-500">({item.id})</span>
                </div>
                <div className="text-xs text-gray-500">{item.period} • <b className="text-gray-900">{item.ordersCount} đơn hàng</b></div>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Tổng hoa hồng sàn</span>
                  <span className="text-sm font-black text-gray-900">{item.grossComm.toLocaleString('vi-VN')} đ</span>
                </div>

                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Hoàn tiền khách (80%)</span>
                  <span className="text-sm font-black text-orange-600">{item.userCashbackTotal.toLocaleString('vi-VN')} đ</span>
                </div>

                <div>
                  {item.status === 'reconciled' ? (
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Đã Kết Toán
                    </span>
                  ) : (
                    <button
                      onClick={() => alert(`Đã kích hoạt duyệt kết toán kỳ ${item.id}!`)}
                      className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-lg shadow-sm"
                    >
                      Duyệt Kết Toán
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
