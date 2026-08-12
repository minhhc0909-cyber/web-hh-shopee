import React, { useState } from 'react';
import { 
  Clipboard, 
  Sparkles, 
  Copy, 
  Check, 
  QrCode, 
  ArrowRight, 
  ShoppingBag, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { convertProductLink, getStoredUser } from '../services/storage';

export default function LinkConverter() {
  const [url, setUrl] = useState('');
  const [detectedPlatform, setDetectedPlatform] = useState(null);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  const user = getStoredUser();

  const handleInputChange = (val) => {
    setUrl(val);
    const lower = val.toLowerCase();
    if (lower.includes('shopeefood') || lower.includes('now.vn')) {
      setDetectedPlatform('shopee-food');
    } else if (lower.includes('shopee') || lower.includes('shope.ee')) {
      setDetectedPlatform('shopee');
    } else if (lower.includes('tiktok') || lower.includes('vt.tiktok')) {
      setDetectedPlatform('tiktok');
    } else if (lower.includes('lazada')) {
      setDetectedPlatform('lazada');
    } else {
      setDetectedPlatform(null);
    }
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        handleInputChange(text);
      }
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const handleConvert = (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsConverting(true);
    setTimeout(() => {
      const converted = convertProductLink(url);
      setResult(converted);
      setIsConverting(false);
    }, 600);
  };

  const handleCopyLink = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.affiliateUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl shadow-orange-500/5 border border-gray-100 relative overflow-hidden">
      {/* Top Accent Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              Chuyển Link Nhận Hoàn Tiền 80%
            </h2>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              Tự Động 24/7
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Dán link mua hàng Shopee, TikTok Shop hoặc Lazada để hệ thống tự tạo link chứa mã định danh <b>({user?.id || 'GUEST'})</b>
          </p>
        </div>

        {/* Platform Icons Badge */}
        <div className="flex items-center gap-1.5 bg-gray-50 p-1.5 rounded-xl border border-gray-200">
          <span className="px-2 py-1 bg-orange-100 text-orange-700 font-extrabold text-[11px] rounded-lg">Shopee</span>
          <span className="px-2 py-1 bg-slate-900 text-white font-extrabold text-[11px] rounded-lg">TikTok</span>
          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 font-extrabold text-[11px] rounded-lg">Lazada</span>
        </div>
      </div>

      {/* Converter Input Form */}
      <form onSubmit={handleConvert} className="space-y-4">
        <div className="relative">
          <div className="flex items-center gap-2 bg-gray-50 border-2 border-gray-200 focus-within:border-orange-500 focus-within:bg-white rounded-xl p-2 transition-all">
            
            {/* Clipboard Paste Button */}
            <button
              type="button"
              onClick={handlePasteClipboard}
              className="flex items-center gap-1.5 bg-white hover:bg-gray-100 text-gray-700 text-xs font-bold px-3 py-2.5 rounded-lg border border-gray-200 shadow-xs transition-colors"
              title="Dán từ Clipboard"
            >
              <Clipboard className="w-4 h-4 text-orange-500" />
              <span className="hidden sm:inline">Dán nhanh</span>
            </button>

            {/* Input Text Field */}
            <input
              type="text"
              value={url}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Dán link sản phẩm (Shopee, TikTok, Lazada)..."
              className="w-full bg-transparent text-sm sm:text-base font-mono text-gray-900 focus:outline-none px-2"
            />

            {/* Platform Detected Badge */}
            {detectedPlatform && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-md bg-orange-100 text-orange-700 border border-orange-200 animate-pulse">
                <Check className="w-3.5 h-3.5" />
                {detectedPlatform.toUpperCase()}
              </span>
            )}

            {/* Submit Conversion Button */}
            <button
              type="submit"
              disabled={isConverting || !url.trim()}
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-extrabold text-sm px-5 py-3 rounded-xl transition-all shadow-lg shadow-orange-500/25 shrink-0"
            >
              {isConverting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Đang tạo...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Tạo Link Hoàn Tiền</span>
                </>
              )}
            </button>

          </div>
        </div>
      </form>

      {/* Conversion Result Box */}
      {result && (
        <div className="mt-6 p-5 bg-orange-50/70 border border-orange-200 rounded-xl space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="font-extrabold text-sm text-gray-900">
                Đã chuyển đổi thành công ({result.platformName})
              </span>
            </div>
            <span className="text-xs font-mono text-gray-500">SubID: {result.subId}</span>
          </div>

          {/* Generated Affiliate Link Output */}
          <div className="flex flex-col sm:flex-row items-center gap-2 bg-white p-3 rounded-xl border border-orange-200">
            <input
              type="text"
              readOnly
              value={result.affiliateUrl}
              className="w-full bg-transparent text-sm font-mono font-bold text-orange-600 outline-none px-2"
            />

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopyLink}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg font-extrabold text-xs transition-all shadow-sm ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Đã Chép!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Sao Chép Link</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowQrModal(true)}
                className="flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold border border-gray-200"
                title="Tạo mã QR mua hàng"
              >
                <QrCode className="w-4 h-4" />
              </button>

              <a
                href={result.affiliateUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold border border-gray-200"
                title="Mở link mua ngay"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Estimated Cashback Math */}
          <div className="flex flex-wrap items-center justify-between text-xs text-gray-600 pt-1">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Ước tính nhận hoàn: <b className="text-orange-600 text-sm">~{result.estimatedCashback.toLocaleString('vi-VN')} đ</b> (80% hoa hồng)</span>
            </div>
            <span className="text-[11px] text-gray-400">Đơn hàng sẽ được ghi nhận vào hệ thống sau 5-15 phút</span>
          </div>

        </div>
      )}

      {/* QR Modal */}
      {showQrModal && result && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-gray-900 text-base">Mã QR Mua Hàng Hoàn Tiền</h3>
              <button onClick={() => setShowQrModal(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 inline-block">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(result.affiliateUrl)}`}
                alt="QR Code"
                className="w-48 h-48 mx-auto"
              />
            </div>

            <p className="text-xs text-gray-500">
              Quét mã QR bằng ứng dụng Shopee/TikTok/Camera điện thoại để mở sản phẩm và đặt hàng nhận hoàn tiền ngay.
            </p>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-2.5 rounded-xl text-xs"
            >
              Đóng Cửa Sổ
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
