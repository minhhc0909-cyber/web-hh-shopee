// Initial state mock database stored in LocalStorage for dynamic persistence

export const INITIAL_USER = {
  id: "USR-982341",
  name: "Nguyễn Văn Hùng",
  email: "vanhung.demo@gmail.com",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
  balance: 450000,
  pendingBalance: 185000,
  totalCashback: 1250000,
  withdrawalPin: "123456",
  bankAccount: {
    bankName: "MB Bank (NH Quân Đội)",
    bankCode: "MB",
    accountNumber: "97042299881122",
    accountName: "NGUYEN VAN HUNG"
  },
  referralCode: "CHUOT-HUNGBN",
  referralsCount: 14,
  referralEarnings: 320000
};

export const INITIAL_ORDERS = [
  {
    id: "ORD-SP8849102",
    platform: "shopee",
    productName: "Tai nghe Bluetooth Không Dây Hifi Stereo chống ồn",
    productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80",
    orderDate: "2026-08-10 14:22",
    price: 350000,
    commissionRate: 10,
    totalCommission: 35000,
    cashbackRate: 80,
    userCashback: 28000,
    status: "approved", // pending, approved, paid, cancelled
    subId: "USR-982341"
  },
  {
    id: "ORD-SP9018471",
    platform: "shopee",
    productName: "Nồi Chiên Không Dầu Điện Tử 6.5L Cao Cấp",
    productImage: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=300&q=80",
    orderDate: "2026-08-09 09:15",
    price: 1290000,
    commissionRate: 8,
    totalCommission: 103200,
    cashbackRate: 80,
    userCashback: 82560,
    status: "pending",
    subId: "USR-982341"
  },
  {
    id: "ORD-TK4481902",
    platform: "tiktok",
    productName: "Áo Thun Form Rộng Unisex Cotton 100%",
    productImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80",
    orderDate: "2026-08-08 19:40",
    price: 180000,
    commissionRate: 15,
    totalCommission: 27000,
    cashbackRate: 80,
    userCashback: 21600,
    status: "paid",
    subId: "USR-982341"
  },
  {
    id: "ORD-LZ7710294",
    platform: "lazada",
    productName: "Chuột Máy Tính Không Dây Sạc Pin Silent Ergonomic",
    productImage: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=300&q=80",
    orderDate: "2026-08-05 11:05",
    price: 250000,
    commissionRate: 12,
    totalCommission: 30000,
    cashbackRate: 80,
    userCashback: 24000,
    status: "paid",
    subId: "USR-982341"
  },
  {
    id: "ORD-SPF551029",
    platform: "shopee-food",
    productName: "Combo 2 Trà Sữa Nướng Táo Đỏ + Trân Châu đường đen",
    productImage: "https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=300&q=80",
    orderDate: "2026-08-03 12:30",
    price: 95000,
    commissionRate: 10,
    totalCommission: 9500,
    cashbackRate: 80,
    userCashback: 7600,
    status: "paid",
    subId: "USR-982341"
  }
];

export const INITIAL_WITHDRAWALS = [
  {
    id: "WDR-881920",
    date: "2026-08-01 16:20",
    amount: 500000,
    bankName: "MB Bank",
    accountNumber: "97042299881122",
    accountName: "NGUYEN VAN HUNG",
    status: "completed", // pending, completed, rejected
    transactionCode: "SEPAY-WDR881920"
  },
  {
    id: "WDR-992015",
    date: "2026-07-20 10:10",
    amount: 300000,
    bankName: "MB Bank",
    accountNumber: "97042299881122",
    accountName: "NGUYEN VAN HUNG",
    status: "completed",
    transactionCode: "SEPAY-WDR992015"
  }
];

export const INITIAL_ADMIN_SESSIONS = [
  {
    id: "SESS-SHOPEE-PRIMARY",
    platform: "shopee",
    accountName: "Shopee Affiliate Main Store",
    appKey: "1098471209384",
    appSecret: "sec_99481ab7c8e91023",
    sessionCookieStatus: "active", // active, expired, warning
    lastSynced: "2026-08-11 17:00",
    totalOrdersSyncedToday: 142
  },
  {
    id: "SESS-TIKTOK-OFFICIAL",
    platform: "tiktok",
    accountName: "TikTok Shop Partner VNH",
    appKey: "tt_app_8819203",
    appSecret: "tt_sec_8849102",
    sessionCookieStatus: "active",
    lastSynced: "2026-08-11 16:30",
    totalOrdersSyncedToday: 89
  }
];

export const LEADERBOARD_DATA = [
  { rank: 1, name: "Hoàng Kim Ngân", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80", cashback: 14850000, orders: 128 },
  { rank: 2, name: "Trần Minh Đức", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80", cashback: 11200000, orders: 94 },
  { rank: 3, name: "Phạm Phương Thảo", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80", cashback: 9800000, orders: 82 },
  { rank: 4, name: "Nguyễn Văn Hùng (Bạn)", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80", cashback: 1250000, orders: 15 },
  { rank: 5, name: "Lê Nhật Anh", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80", cashback: 890000, orders: 11 }
];
