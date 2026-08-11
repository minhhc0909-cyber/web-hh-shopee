import React from 'react';
import LinkConverter from '../components/LinkConverter';
import { 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  CheckCircle, 
  HelpCircle,
  ShoppingBag,
  ArrowRight,
  Gift
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const steps = [
    {
      num: "01",
      title: "Dán Link Sản Phẩm",
      desc: "Sao chép link bất kỳ từ Shopee, TikTok Shop hoặc Lazada dán vào công cụ Chuột Hoàn Tiền."
    },
    {
      num: "02",
      title: "Tạo Link Hoàn Tiền",
      desc: "Hệ thống tự động nhúng mã định danh cá nhân (SubID) và trả về link mua sắm mới."
    },
    {
      num: "03",
      title: "Nhận 80% Hoa Hồng",
      desc: "Đặt hàng qua link vừa tạo, tiền hoàn sẽ được ghi nhận và rút thẳng về Ngân Hàng VietQR."
    }
  ];

  const faqs = [
    {
      q: "Chuột Hoàn Tiền hoạt động như thế nào?",
      a: "Khi bạn tạo link qua Chuột Hoàn Tiền và mua hàng, sàn Shopee/TikTok/Lazada sẽ trả tiền hoa hồng Affiliate cho hệ thống. Chúng tôi trích tới 80% số tiền hoa hồng này hoàn lại cho bạn."
    },
    {
      q: "Tôi có phải trả thêm phí nào không?",
      a: "Hoàn toàn MIỄN PHÍ. Giá sản phẩm trên Shopee/TikTok vẫn giữ nguyên 100%, bạn vẫn dùng được đầy đủ voucher giảm giá, mã miễn phí vận chuyển của sàn."
    },
    {
      q: "Bao lâu thì tôi nhận được tiền hoàn?",
      a: "Đơn hàng sẽ xuất hiện ở trạng thái Chờ duyệt sau 5-15 phút khi vừa đặt thành công. Sau khi sàn chuyển sang trạng thái Hoàn thành, tiền sẽ được cộng vào Số dư khả dụng để bạn rút về Ngân hàng."
    },
    {
      q: "Số tiền rút tối thiểu là bao nhiêu?",
      a: "Chỉ từ 50.000 VNĐ là bạn có thể rút về tài khoản tất cả các Ngân hàng tại Việt Nam (MB, VCB, TCB...) hoàn toàn miễn phí giao dịch."
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      
      {/* Hero Section */}
      <section className="relative pt-6 pb-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-orange-100/80 text-orange-700 px-3.5 py-1.5 rounded-full text-xs font-extrabold border border-orange-200 shadow-xs">
            <Sparkles className="w-4 h-4 text-orange-600 animate-spin" />
            <span>Nền Tảng Hoàn Tiền Affiliate #1 Việt Nam</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            Mua Sắm Shopee & TikTok Shop <br className="hidden sm:inline" />
            <span className="gradient-text">Nhận Hoàn Tiền Đến 80%</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Không cần cài ứng dụng rườm rà. Chỉ cần dán link sản phẩm, tạo link hoàn tiền và rút tiền trực tiếp về bất kỳ Ngân hàng nào qua VietQR tự động.
          </p>
        </div>

        {/* Link Converter Main Engine Widget */}
        <div className="max-w-4xl mx-auto mt-8">
          <LinkConverter />
        </div>
      </section>

      {/* Ticker Stats */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 text-center space-y-1 shadow-xs">
            <span className="text-2xl sm:text-3xl font-black text-orange-600">80%</span>
            <span className="text-xs text-gray-500 font-semibold block uppercase">Tỷ lệ hoàn tiền</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200 text-center space-y-1 shadow-xs">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">2.5 Tỷ+</span>
            <span className="text-xs text-gray-500 font-semibold block uppercase">Đã chi trả người dùng</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200 text-center space-y-1 shadow-xs">
            <span className="text-2xl sm:text-3xl font-black text-orange-600">120K+</span>
            <span className="text-xs text-gray-500 font-semibold block uppercase">Đơn hàng hoàn tiền</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200 text-center space-y-1 shadow-xs">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600">24/7</span>
            <span className="text-xs text-gray-500 font-semibold block uppercase">Rút tiền VietQR tự động</span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Cách Thức Đơn Giản Trong 3 Bước</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Chỉ mất 5 giây thao tác trước khi bấm Mua hàng</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3 relative overflow-hidden group hover:border-orange-400 transition-all shadow-xs">
              <span className="text-4xl font-black text-orange-100 group-hover:text-orange-200 transition-colors absolute top-4 right-4">
                {s.num}
              </span>
              <h3 className="font-extrabold text-base text-gray-900 relative z-10">{s.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed relative z-10">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 pt-4">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 space-y-6">
          <div className="flex items-center gap-2 border-b pb-4">
            <HelpCircle className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-extrabold text-gray-900">Câu Hỏi Thường Gặp (FAQ)</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-xl space-y-1.5 border border-gray-100">
                <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                  {faq.q}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed pl-3.5">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
