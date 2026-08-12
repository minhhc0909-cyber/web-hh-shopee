import {
  INITIAL_USER,
  INITIAL_ORDERS,
  INITIAL_WITHDRAWALS,
  INITIAL_ADMIN_SESSIONS,
  LEADERBOARD_DATA
} from "./mockData";

const KEYS = {
  USER: "chuot_user",
  ORDERS: "chuot_orders",
  WITHDRAWALS: "chuot_withdrawals",
  ADMIN_SESSIONS: "chuot_admin_sessions",
  CONVERTED_LINKS: "chuot_converted_links"
};

// Supabase REST Endpoint & Anon Public Key for project obmhvocpyhrofcmhltco (giftixa-db)
const SUPABASE_PROJECT_URL = "https://obmhvocpyhrofcmhltco.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ibWh2b2NweWhyb2ZjbWhsdGNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1MDEzMzgsImV4cCI6MjEwMjA3NzMzOH0.81WqnXGUFkDgWeTdIYC1VJjd60qlXmk6gFJdh3YZq9E";


export const syncUserToSupabaseDirect = async (user) => {
  if (!user || !user.email) return;

  const payload = {
    id: user.id || `USR-${Math.floor(100000 + Math.random() * 900000)}`,
    name: user.name || user.email.split('@')[0],
    email: user.email,
    password: user.password || 'google_authenticated',
    role: user.role || 'user',
    avatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    balance: user.balance || 0,
    pending_balance: user.pendingBalance || 0,
    total_cashback: user.totalCashback || 0,
    withdrawal_pin: user.withdrawalPin || '123456'
  };

  try {
    const headers = {
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    };

    // 1. Send directly to Supabase REST API users table (UPSERT into PostgreSQL)
    fetch(`${SUPABASE_PROJECT_URL}/rest/v1/users`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    }).then(res => {
      console.log(`[Supabase Engine] Synced user ${user.email} into Database. Status: ${res.status}`);
    }).catch(e => console.log('[Supabase Direct Sync Note]:', e.message));

    // 2. Sync with Express server
    fetch('/api/user/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...user, supabaseKey: SUPABASE_ANON_KEY })
    }).catch(e => console.log('[Backend Sync Note]:', e.message));
  } catch (err) {
    console.log('[Supabase Sync Error]:', err);
  }
};




export const getStoredUser = () => {
  const data = localStorage.getItem(KEYS.USER);
  if (!data) {
    return null;
  }
  return JSON.parse(data);
};

export const logoutUser = () => {
  localStorage.removeItem(KEYS.USER);
  return null;
};

export const updateStoredUser = (updatedFields) => {
  const current = getStoredUser() || {};
  const newUser = { ...current, ...updatedFields };
  localStorage.setItem(KEYS.USER, JSON.stringify(newUser));

  // Direct sync to Supabase Database
  syncUserToSupabaseDirect(newUser);

  return newUser;
};

export const registerUser = (userData) => {
  const newUser = {
    id: `USR-${Math.floor(100000 + Math.random() * 900000)}`,
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: "user",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    balance: 0,
    pendingBalance: 0,
    totalCashback: 0,
    withdrawalPin: userData.pin || "123456",
    bankAccount: {
      bankName: "MB Bank (NH Quân Đội)",
      bankCode: "MB",
      accountNumber: "97042299881122",
      accountName: (userData.name || '').toUpperCase()
    },
    referralCode: `CHUOT-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
    referralsCount: 0,
    referralEarnings: 0
  };

  localStorage.setItem(KEYS.USER, JSON.stringify(newUser));

  // Direct sync new user to Supabase Database
  syncUserToSupabaseDirect(newUser);

  return newUser;
};

export const convertProductLink = (url, userId) => {
  const cleanUrl = (url || '').trim();
  const rawId = userId || '888999';
  const subId1 = rawId.replace(/[^0-9a-zA-Z]/g, '') || '888999';

  let platform = 'shopee';
  let platformName = 'Shopee VN';
  const lower = cleanUrl.toLowerCase();

  if (lower.includes('tiktok') || lower.includes('vt.tiktok')) {
    platform = 'tiktok';
    platformName = 'TikTok Shop';
  } else if (lower.includes('lazada')) {
    platform = 'lazada';
    platformName = 'Lazada VN';
  }

  // Parse shopId & itemId if present
  let shopId = null;
  let itemId = null;
  const m1 = cleanUrl.match(/i\.(\d+)\.(\d+)/);
  if (m1) {
    shopId = m1[1];
    itemId = m1[2];
  } else {
    const m2 = cleanUrl.match(/\/product\/(\d+)\/(\d+)/) || cleanUrl.match(/\/(\d+)\/(\d+)/);
    if (m2) {
      shopId = m2[1];
      itemId = m2[2];
    }
  }

  const separator = cleanUrl.includes('?') ? '&' : '?';
  let affiliateUrl = lower.includes('shopee')
    ? `${cleanUrl}${separator}sub_id1=${subId1}&mmp_pid=an_17349710562&utm_source=an_17349710562`
    : `${cleanUrl}${separator}sub_id=${subId1}&utm_source=chuot_cashback`;

  // Precise Shopee Commission Estimation: 10% capped at 20k + Shop Extra 5% -> 80% user cashback
  const samplePrice = 150000;
  const shopeeCommission = Math.min(samplePrice * 0.10, 20000); // 10% capped at 20,000 VND
  const shopCommission = samplePrice * 0.05; // 5% Shop Extra
  const totalCommission = shopeeCommission + shopCommission;
  const estimatedCashback = Math.round(totalCommission * 0.80);

  return {
    originalUrl: url,
    affiliateUrl,
    resolvedUrl: cleanUrl,
    shopId,
    itemId,
    platform,
    platformName,
    subId: subId1,
    subId1: subId1,
    estimatedCashbackRate: 80,
    estimatedCashback: estimatedCashback,
    estimatedCashbackAmount: estimatedCashback,
    shopeeCommission: Math.round(shopeeCommission),
    shopCommission: Math.round(shopCommission),
    totalCommission: Math.round(totalCommission)
  };
};









export const getStoredOrders = () => {
  const data = localStorage.getItem(KEYS.ORDERS);
  if (!data) {
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
    return INITIAL_ORDERS;
  }
  return JSON.parse(data);
};

export const addStoredOrder = (newOrder) => {
  const orders = getStoredOrders();
  const updated = [newOrder, ...orders];
  localStorage.setItem(KEYS.ORDERS, JSON.stringify(updated));
  return updated;
};

export const getStoredWithdrawals = () => {
  const data = localStorage.getItem(KEYS.WITHDRAWALS);
  if (!data) {
    localStorage.setItem(KEYS.WITHDRAWALS, JSON.stringify(INITIAL_WITHDRAWALS));
    return INITIAL_WITHDRAWALS;
  }
  return JSON.parse(data);
};

export const addStoredWithdrawal = (withdrawal) => {
  const list = getStoredWithdrawals();
  const updated = [withdrawal, ...list];
  localStorage.setItem(KEYS.WITHDRAWALS, JSON.stringify(updated));
  return updated;
};

export const createWithdrawalRequest = (amount, bankInfo) => {
  const user = getStoredUser();
  if (!user) return { success: false, message: 'Chưa đăng nhập' };

  const newWithdrawal = {
    id: `WDR-${Date.now()}`,
    userId: user.id,
    userName: user.name,
    amount: Number(amount),
    bankInfo: bankInfo || user.bankAccount,
    status: 'PENDING',
    createdAt: new Date().toISOString()
  };

  addStoredWithdrawal(newWithdrawal);
  updateStoredUser({ balance: Math.max(0, (user.balance || 0) - Number(amount)) });

  return { success: true, withdrawal: newWithdrawal };
};

export const updateWithdrawalStatus = (id, newStatus) => {
  const list = getStoredWithdrawals();
  const updated = list.map(item => {
    if (item.id === id) {
      return { ...item, status: newStatus };
    }
    return item;
  });
  localStorage.setItem(KEYS.WITHDRAWALS, JSON.stringify(updated));
  return updated;
};

export const getAdminSessions = () => {
  const data = localStorage.getItem(KEYS.ADMIN_SESSIONS);
  if (!data) {
    localStorage.setItem(KEYS.ADMIN_SESSIONS, JSON.stringify(INITIAL_ADMIN_SESSIONS));
    return INITIAL_ADMIN_SESSIONS;
  }
  return JSON.parse(data);
};

export const saveAdminSession = (newSession) => {
  const sessions = getAdminSessions();
  const updated = [newSession, ...sessions];
  localStorage.setItem(KEYS.ADMIN_SESSIONS, JSON.stringify(updated));
  return updated;
};

export const getLeaderboard = () => {
  return LEADERBOARD_DATA;
};

export const getLeaderboardData = () => {
  return LEADERBOARD_DATA;
};
