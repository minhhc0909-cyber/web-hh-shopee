import React, { useState } from 'react';
import { Wallet, Landmark, ShieldCheck, History, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { getStoredUser, getStoredWithdrawals, updateStoredUser } from '../services/storage';
import WithdrawalModal from '../components/WithdrawalModal';
import { Link } from 'react-router-dom';

export default function Withdrawal() {
  const [user, setUser] = useState(getStoredUser());
  const [withdrawals, setWithdrawals] = useState(getStoredWithdrawals());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBank, setEditingBank] = useState(false);

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-gray-200 text-center space-y-4 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto text-2xl">
            🔒
          </div>
          <h2 className="text-xl font-extrabold text-gray-900">Vui Lòng Đăng Nhập</h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            Tính năng Rút Tiền Ngân Hàng VietQR yêu cầu bạn Đăng Nhập hoặc Đăng Ký tài khoản để thực hiện giao dịch rút tiền.
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

  // Bank Form State
  const [bankName, setBankName] = useState(user.bankAccount?.bankName || '');
  const [accountNumber, setAccountNumber] = useState(user.bankAccount?.accountNumber || '');
  const [accountName, setAccountName] = useState(user.bankAccount?.accountName || '');


  const refreshData = () => {
    setUser(getStoredUser());
    setWithdrawals(getStoredWithdrawals());
  };

  const handleSaveBank = (e) => {
    e.preventDefault();
    const updated = updateStoredUser({
      bankAccount: {
        bankName,
        accountNumber,
        accountName
      }
    });
    setUser(updated);
    setEditingBank(false);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">Rút Tiền Về Ngân Hàng</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Hỗ trợ chuyển tiền tự động 24/7 qua VietQR / SePay đến hơn 40 Ngân hàng Việt Nam
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-lg shadow-orange-500/25 flex items-center gap-2"
        >
          <Wallet className="w-4 h-4" />
          <span>Tạo Yêu Cầu Rút Tiền</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Col: Balance & Linked Bank */}
        <div className="space-y-4">
          
          {/* Balance Card */}
          <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white p-6 rounded-2xl shadow-lg space-y-3">
            <span className="text-xs uppercase font-bold text-orange-100 block">Số Dư Khả Dụng</span>
            <div className="text-3xl font-black">{user.balance.toLocaleString('vi-VN')} đ</div>
            <div className="text-xs text-orange-100 pt-2 border-t border-orange-400/40">
              Hạn mức rút tối thiểu: 50.000 đ/giao dịch
            </div>
          </div>

          {/* Linked Bank Card */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-orange-500" /> Tài Khoản Ngân Hàng
              </span>
              <button
                onClick={() => setEditingBank(!editingBank)}
                className="text-xs font-bold text-orange-600 hover:underline"
              >
                {editingBank ? 'Hủy' : 'Chỉnh sửa'}
              </button>
            </div>

            {editingBank ? (
              <form onSubmit={handleSaveBank} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Tên Ngân Hàng</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full border p-2 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Số Tài Khoản</label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full border p-2 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Tên Chủ Tài Khoản</label>
                  <input
                    type="text"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="w-full border p-2 rounded-lg uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-orange-500 text-white font-bold rounded-lg"
                >
                  Lưu Thay Đổi
                </button>
              </form>
            ) : (
              <div className="space-y-1.5 text-xs">
                <div className="font-bold text-gray-900 text-sm">{user.bankAccount.bankName}</div>
                <div className="font-mono text-gray-600 text-base font-bold">{user.bankAccount.accountNumber}</div>
                <div className="font-bold text-gray-700 uppercase">{user.bankAccount.accountName}</div>
              </div>
            )}
          </div>

        </div>

        {/* Right Col: Withdrawal Logs History Table */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-gray-200 space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
              <History className="w-5 h-5 text-orange-500" /> Lịch Sử Rút Tiền
            </h3>
            <span className="text-xs text-gray-500">{withdrawals.length} giao dịch</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-bold uppercase border-b">
                <tr>
                  <th className="p-3">Mã GD</th>
                  <th className="p-3">Thời gian</th>
                  <th className="p-3">Số tiền</th>
                  <th className="p-3">Ngân hàng</th>
                  <th className="p-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {withdrawals.map((wdr) => (
                  <tr key={wdr.id} className="hover:bg-gray-50">
                    <td className="p-3 font-mono font-bold text-gray-900">{wdr.id}</td>
                    <td className="p-3 text-gray-500">{wdr.date}</td>
                    <td className="p-3 font-extrabold text-orange-600">
                      -{wdr.amount.toLocaleString('vi-VN')} đ
                    </td>
                    <td className="p-3">
                      <div>{wdr.bankName}</div>
                      <div className="font-mono text-[10px] text-gray-400">{wdr.accountNumber}</div>
                    </td>
                    <td className="p-3">
                      {wdr.status === 'completed' ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Thành công
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                          <Clock className="w-3 h-3" /> Chờ duyệt
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <WithdrawalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={refreshData}
      />

    </div>
  );
}
