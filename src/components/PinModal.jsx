import React, { useState } from 'react';
import { Lock, ShieldAlert, KeyRound } from 'lucide-react';
import { getStoredUser } from '../services/storage';

export default function PinModal({ isOpen, onClose, onSuccess }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const user = getStoredUser();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === user.withdrawalPin) {
      setError('');
      setPin('');
      onSuccess();
    } else {
      setError('Mã PIN xác thực không chính xác. Vui lòng thử lại!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
        
        <div className="flex items-center gap-3 border-b pb-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-gray-900 text-base">Xác Nhận PIN Rút Tiền</h3>
            <p className="text-xs text-gray-500">Nhập mã PIN 6 số để bảo mật giao dịch</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
              Mã PIN Bảo Mật (Mặc định: 123456)
            </label>
            <input
              type="password"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••••"
              autoFocus
              className="w-full text-center text-2xl tracking-[0.5em] font-mono py-3 border-2 border-gray-200 focus:border-orange-500 rounded-xl focus:outline-none bg-gray-50 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs"
            >
              Hủy Bỏ
            </button>
            <button
              type="submit"
              disabled={pin.length < 6}
              className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-extrabold rounded-xl text-xs shadow-md shadow-orange-500/20"
            >
              Xác Nhận Rút
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
