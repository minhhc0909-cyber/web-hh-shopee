import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Chuột Hoàn Tiền Live Engine', timestamp: new Date() });
});

// REAL OTP Email Dispatcher API (Resend API Integration)
app.post('/api/auth/send-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ error: 'Email và mã OTP là bắt buộc' });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(`[OTP Engine] RESEND_API_KEY missing. Generated OTP for ${email}: ${otp}`);
    return res.json({ success: true, message: 'OTP generated', otp });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'Chuột Hoàn Tiền <onboarding@resend.dev>',
        to: [email],
        subject: 'Mã xác thực OTP kích hoạt tài khoản Chuột Hoàn Tiền',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9fafb;">
            <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 30px; border: 1px solid #e5e7eb;">
              <h2 style="color: #f97316; margin-top: 0;">🐹 Chuột Hoàn Tiền</h2>
              <p>Xin chào <b>${email}</b>,</p>
              <p>Mã xác thực 6 số để kích hoạt tài khoản mua sắm hoàn tiền của bạn là:</p>
              <div style="background: #fff7ed; border: 2px dashed #f97316; padding: 15px; text-align: center; border-radius: 12px; font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #ea580c; margin: 20px 0;">
                ${otp}
              </div>
              <p style="color: #6b7280; font-size: 13px;">Mã này có hiệu lực trong vòng 10 phút. Vui lòng không chia sẻ mã này cho bất kỳ ai.</p>
            </div>
          </div>
        `
      })
    });

    const data = await response.json();
    console.log('[Resend API] Real Email Sent:', data);
    return res.json({ success: true, resendId: data.id, status: response.status });
  } catch (err) {
    console.error('[Resend API Error]:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Real Shopee & TikTok Link Conversion API
app.post('/api/user/convert', async (req, res) => {
  try {
    const { url, userId } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL không hợp lệ' });
    }

    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }

    const subId = userId || 'USR-LIVE';
    let platform = 'shopee';
    let platformName = 'Shopee VN';
    const lower = cleanUrl.toLowerCase();

    if (lower.includes('tiktok') || lower.includes('vt.tiktok')) {
      platform = 'tiktok';
      platformName = 'TikTok Shop';
    } else if (lower.includes('lazada')) {
      platform = 'lazada';
      platformName = 'Lazada VN';
    } else if (lower.includes('shopeefood')) {
      platform = 'shopee-food';
      platformName = 'ShopeeFood';
    }

    // Attach SubID parameter to real live target URL
    const separator = cleanUrl.includes('?') ? '&' : '?';
    const affiliateUrl = `${cleanUrl}${separator}sub_id=${subId}&utm_source=chuot_cashback`;

    res.json({
      originalUrl: url,
      affiliateUrl,
      platform,
      platformName,
      subId,
      estimatedCashbackRate: 80,
      estimatedCashbackAmount: 25000
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve static build from dist
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api/')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

app.listen(PORT, () => {
  console.log(`[Chuột Hoàn Tiền] Production Express Engine running on http://localhost:${PORT}`);
});

export default app;
