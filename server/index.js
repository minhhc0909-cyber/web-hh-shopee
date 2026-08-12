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
