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

// Supabase REST Endpoint for project obmhwocpyhrofcmhltco (giftixa-db)
const SUPABASE_PROJECT_URL = "https://obmhwocpyhrofcmhltco.supabase.co";

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
    // 1. Send to Supabase REST API users table (UPSERT by email/id)
    fetch(`${SUPABASE_PROJECT_URL}/rest/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(payload)
    }).then(res => {
      console.log(`[Supabase PDF Engine] Synced user ${user.email} into Database. Status: ${res.status}`);
    }).catch(e => console.log('[Supabase Direct Sync Note]:', e.message));

    // 2. Sync with Express server
    fetch('/api/user/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
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
  }

  const separator = cleanUrl.includes('?') ? '&' : '?';
  const affiliateUrl = `${cleanUrl}${separator}sub_id=${subId}&utm_source=chuot_cashback`;

  return {
    originalUrl: url,
    affiliateUrl,
    platform,
    platformName,
    subId,
    estimatedCashbackRate: 80,
    estimatedCashbackAmount: 25000
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
