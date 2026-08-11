import React, { useState } from 'react';
import { Wallet, Landmark, CheckCircle, ShieldCheck, AlertCircle } from 'lucide-react';
import { getStoredUser, createWithdrawalRequest } from '../services/storage';
import PinModal from './PinModal';

export default function WithdrawalModal({ isOpen, onClose, onRefresh }) {
  const user = getStoredUser();
  const [amount, setAmount] = useState('');
  const [showPinModal, setShowPinModal] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const minWithdrawal = 50000;

  const handlePreSubmit = (e) => {
    e.preventDefault();
    const numAmount = Number(amount);
    if (!numAmount || numAmount < minWithdrawal) {
      setError(`Số tiền rút tối thiểu là ${minWithdrawal.toLocaleString('vi-VN')} đ`);
      return;
    }
    if (numAmount > user.balance) {
      setError(`Số dư tài khoản không đủ. Hiện có ${user.balance.toLocaleString('vi-VN')} đ`);
      return;
    }

    setError('');
    setShowPinModal(true);
  };

  const handlePinSuccess = () => {
    setShowPinModal(false);
    try {
      const numAmount = Number(amount);
      createWithdrawalRequest(numAmount, user.bankAccount);
      setSuccessMsg(`Yêu cầu rút ${numAmount.toLocaleString('vi-VN')} đ đã được khởi tạo thành công! Sàn sẽ duyệt trong 5-10 phút qua VietQR.`);
      setTimeout(() => {
        setSuccessMsg('');
        onRefresh();
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-150">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
                ₫
              </div>
              <div>
                <h3 className="font-extrabold text-gray-900 text-base">Rút Tiền Về Ngân Hàng</h3>
                <p className="text-xs text-gray-500">Tự động chuyển tiền qua SePay / VietQR</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl">✕</button>
          </div>

          {/* Account Balance Widget */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-orange-700 font-semibold block uppercase">Số dư khả dụng</span>
              <span className="text-xl font-extrabold text-orange-600">
                {user.balance.toLocaleString('vi-VN')} đ
              </span>
            </div>
            <button
              onClick={() => setAmount(user.balance.toString())}
              className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg shadow-sm"
            >
              Rút Tối Đa
            </button>
          </div>

          {/* Bank Account Info Card */}
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
              <span className="flex items-center gap-1"><Landmark className="w-3.5 h-3.5 text-gray-400" /> Ngân Hàng Nhận Tiền</span>
              <span className="text-emerald-600 font-bold">Đã Liên Kết</span>
            </div>
            <div className="text-sm font-bold text-gray-900">{user.bankAccount.bankName}</div>
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span className="font-mono">{user.bankAccount.accountNumber}</span>
              <span className="font-bold uppercase">{user.bankAccount.accountName}</span>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-50 text-emerald-700 text-xs p-3 rounded-xl border border-emerald-200 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Amount Form */}
          <form onSubmit={handlePreSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Số Tiền Muốn Rút (VNĐ)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Nhập số tiền (VD: 200000)"
                className="w-full text-lg font-mono font-bold px-4 py-3 border-2 border-gray-200 focus:border-orange-500 rounded-xl focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Hạn mức tối thiểu: 50.000 đ</span>
              <span>Phí giao dịch: <b>Miễn phí</b></span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-orange-500/25 transition-all"
            >
              Tiếp Tục Rút Tiền
            </button>
          </form>

        </div>
      </div>

      <PinModal
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
        onSuccess={handlePinSuccess}
      />
    </>
  );
}
