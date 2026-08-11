import React, { useState } from 'react';
import { Link2, Key, Cookie, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';
import { getAdminSessions, saveAdminSession } from '../../services/storage';

export default function AdminShopeeSession() {
  const [sessions, setSessions] = useState(getAdminSessions());
  const [editingId, setEditingId] = useState(null);

  const [appKey, setAppKey] = useState('');
  const [appSecret, setAppSecret] = useState('');
  const [cookieVal, setCookieVal] = useState('');

  const handleEdit = (sess) => {
    setEditingId(sess.id);
    setAppKey(sess.appKey);
    setAppSecret(sess.appSecret);
    setCookieVal("SPC_EC=...; SPC_ST=...; SHopee_session_token=active_valid");
  };

  const handleSave = (sess) => {
    const updated = saveAdminSession({
      ...sess,
      appKey,
      appSecret,
      sessionCookieStatus: "active",
      lastSynced: new Date().toLocaleString("vi-VN")
    });
    setSessions(updated);
    setEditingId(null);
  };

  return (
    <div className="space-y-6 pb-12">
      
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <h1 className="text-xl sm:text-2xl font-black text-gray-900">Quản Lý Shopee & TikTok Session Cookies</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Cấu hình App Key, App Secret & Session Cookies Shopee Affiliate để tự động cào đơn hàng và tạo link SubID
        </p>
      </div>

      <div className="space-y-4">
        {sessions.map(sess => (
          <div key={sess.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                  <Link2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-gray-900">{sess.accountName}</h3>
                  <span className="text-xs text-gray-400 uppercase font-bold">{sess.platform} Affiliate Api</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> HOẠT ĐỘNG
                </span>
                <button
                  onClick={() => handleEdit(sess)}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg"
                >
                  Cấu Hình Cookie
                </button>
              </div>
            </div>

            {editingId === sess.id ? (
              <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">App Key / Partner ID</label>
                  <input
                    type="text"
                    value={appKey}
                    onChange={(e) => setAppKey(e.target.value)}
                    className="w-full p-2 border rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">App Secret Key</label>
                  <input
                    type="password"
                    value={appSecret}
                    onChange={(e) => setAppSecret(e.target.value)}
                    className="w-full p-2 border rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Session Cookie Raw String (Shopee Affiliate)</label>
                  <textarea
                    rows={3}
                    value={cookieVal}
                    onChange={(e) => setCookieVal(e.target.value)}
                    className="w-full p-2 border rounded font-mono text-[11px]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSave(sess)}
                    className="px-4 py-2 bg-orange-500 text-white font-bold rounded-lg"
                  >
                    Lưu & Kiểm Tra Session
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div className="bg-gray-50 p-3 rounded-xl border">
                  <span className="text-gray-400 block text-[10px]">APP KEY</span>
                  <span className="font-bold text-gray-900">{sess.appKey}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border">
                  <span className="text-gray-400 block text-[10px]">LẦN DỰỆT ĐƠN CUỐI</span>
                  <span className="font-bold text-gray-900">{sess.lastSynced}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border">
                  <span className="text-gray-400 block text-[10px]">ĐƠN HÀNG ĐÃ ĐỒNG BỘ</span>
                  <span className="font-bold text-orange-600">{sess.totalOrdersSyncedToday} đơn</span>
                </div>
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}
