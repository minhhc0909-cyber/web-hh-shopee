import React from 'react';
import { Navigate } from 'react-router-dom';
import { ShieldAlert, Lock, ArrowLeft } from 'lucide-react';
import { getStoredUser } from '../services/storage';

export default function ProtectedRoute({ children, requiredRole = 'admin', isAdminMode }) {
  const user = getStoredUser();

  // Check if role is admin or admin mode is active
  const hasAccess = user.role === requiredRole || isAdminMode;

  if (!hasAccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center space-y-4 border border-gray-200 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          
          <h2 className="text-xl font-extrabold text-gray-900">Truy Cập Bị Từ Chối (403 Forbidden)</h2>
          
          <p className="text-xs text-gray-500 leading-relaxed">
            Khu vực <b>Phân Hệ Quản Trị Admin</b> chỉ dành riêng cho tài khoản có quyền Quản Trị Viên (<code className="bg-gray-100 px-1 py-0.5 rounded text-rose-600 font-bold">role: "admin"</code>). Tài khoản hiện tại của bạn là người dùng thông thường.
          </p>

          <div className="bg-orange-50 p-3.5 rounded-xl border border-orange-200 text-xs text-orange-800 text-left space-y-1">
            <span className="font-bold block flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" /> Hướng Dẫn Thao Tác Thử Nghiệm:
            </span>
            <span>Bấm nút <b>"Vào Admin"</b> ở góc phải thanh Nav để chuyển sang quyền Quản Trị.</span>
          </div>

          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold rounded-xl transition-all shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay Về Trang Chủ Người Dùng</span>
          </a>
        </div>
      </div>
    );
  }

  return children;
}
