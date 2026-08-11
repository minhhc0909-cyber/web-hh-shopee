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

// API Status
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Chuột Hoàn Tiền Backend Engine', timestamp: new Date() });
});

// Auth Endpoints
app.post('/api/auth/google', (req, res) => {
  res.json({
    token: 'jwt_demo_token_user_982341',
    user: {
      id: 'USR-982341',
      name: 'Nguyễn Văn Hùng',
      email: 'vanhung.demo@gmail.com',
      balance: 450000
    }
  });
});

// Link Converter API (Supports Shopee, ShopeeFood, TikTok, Lazada)
app.post('/api/user/convert', (req, res) => {
  const { url, userId } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL không hợp lệ' });
  }

  const subId = userId || 'USR-982341';
  let platform = 'shopee';

  const lower = url.toLowerCase();
  if (lower.includes('tiktok')) platform = 'tiktok';
  else if (lower.includes('lazada')) platform = 'lazada';
  else if (lower.includes('shopeefood')) platform = 'shopee-food';

  const randomHash = Math.random().toString(36).substring(2, 9);
  const affiliateUrl = `https://${platform === 'shopee' ? 'shope.ee' : platform === 'tiktok' ? 'vt.tiktok.com' : 's.lazada.vn'}/${randomHash}?sub_id=${subId}`;

  res.json({
    originalUrl: url,
    affiliateUrl,
    platform,
    subId,
    estimatedCashbackRate: 80,
    estimatedCashbackAmount: 28000
  });
});

// User Balance & Orders
app.get('/api/user/balance', (req, res) => {
  res.json({ balance: 450000, pendingBalance: 185000, totalCashback: 1250000 });
});

// Admin Platform Sessions
app.get('/api/admin/platform-sessions', (req, res) => {
  res.json([
    { id: 'SESS-SHOPEE-PRIMARY', platform: 'shopee', accountName: 'Shopee Main Store', sessionCookieStatus: 'active', lastSynced: '2026-08-11 17:00' },
    { id: 'SESS-TIKTOK-OFFICIAL', platform: 'tiktok', accountName: 'TikTok Shop Partner', sessionCookieStatus: 'active', lastSynced: '2026-08-11 16:30' }
  ]);
});

// Serve static compiled frontend from dist
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api/')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
} else {
  app.get('/', (req, res) => {
    res.send(`
      <div style="font-family: sans-serif; text-align: center; padding: 50px;">
        <h1 style="color: #f97316;">🐹 Chuột Hoàn Tiền Backend Server API</h1>
        <p>Máy chủ Backend đang hoạt động bình thường trên cổng 5000.</p>
        <p>Vui lòng mở giao diện Web tại: <a href="http://localhost:3000" style="color: #ea580c; font-weight: bold;">http://localhost:3000</a></p>
      </div>
    `);
  });
}

app.listen(PORT, () => {
  console.log(`[Chuột Hoàn Tiền] Express Backend Engine is running on http://localhost:${PORT}`);
});

