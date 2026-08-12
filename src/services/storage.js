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
  const current = getStoredUser();
  const newUser = { ...current, ...updatedFields };
  localStorage.setItem(KEYS.USER, JSON.stringify(newUser));
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
      accountName: userData.name.toUpperCase()
    },
    referralCode: `CHUOT-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
    referralsCount: 0,
    referralEarnings: 0
  };

  localStorage.setItem(KEYS.USER, JSON.stringify(newUser));
  return newUser;
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

export const createWithdrawalRequest = (amount, bankInfo) => {
  const user = getStoredUser();
  if (user.balance < amount) {
    throw new Error("Số dư không đủ để thực hiện giao dịch này");
  }

  const newWithdrawal = {
    id: `WDR-${Math.floor(100000 + Math.random() * 900000)}`,
    date: new Date().toLocaleString("vi-VN"),
    amount,
    bankName: bankInfo.bankName,
    accountNumber: bankInfo.accountNumber,
    accountName: bankInfo.accountName,
    status: "pending",
    transactionCode: `SEPAY-WDR${Math.floor(100000 + Math.random() * 900000)}`
  };

  const withdrawals = getStoredWithdrawals();
  const updatedWithdrawals = [newWithdrawal, ...withdrawals];
  localStorage.setItem(KEYS.WITHDRAWALS, JSON.stringify(updatedWithdrawals));

  // Deduct balance
  updateStoredUser({ balance: user.balance - amount });

  return newWithdrawal;
};

export const getAdminSessions = () => {
  const data = localStorage.getItem(KEYS.ADMIN_SESSIONS);
  if (!data) {
    localStorage.setItem(KEYS.ADMIN_SESSIONS, JSON.stringify(INITIAL_ADMIN_SESSIONS));
    return INITIAL_ADMIN_SESSIONS;
  }
  return JSON.parse(data);
};

export const saveAdminSession = (session) => {
  const sessions = getAdminSessions();
  const idx = sessions.findIndex(s => s.id === session.id);
  let updated;
  if (idx >= 0) {
    updated = [...sessions];
    updated[idx] = session;
  } else {
    updated = [session, ...sessions];
  }
  localStorage.setItem(KEYS.ADMIN_SESSIONS, JSON.stringify(updated));
  return updated;
};

export const convertProductLink = (inputUrl) => {
  const user = getStoredUser();
  let cleanUrl = inputUrl.trim();
  if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
    cleanUrl = "https://" + cleanUrl;
  }

  let platform = "shopee";
  let platformName = "Shopee VN";

  const lower = cleanUrl.toLowerCase();
  if (lower.includes("tiktok") || lower.includes("vt.tiktok")) {
    platform = "tiktok";
    platformName = "TikTok Shop";
  } else if (lower.includes("lazada")) {
    platform = "lazada";
    platformName = "Lazada VN";
  } else if (lower.includes("shopeefood") || lower.includes("now.vn")) {
    platform = "shopee-food";
    platformName = "ShopeeFood";
  }

  // Preserve real live working product URL & append SubID parameter
  const subId = user.id || "USR-DEFAULT";
  const separator = cleanUrl.includes("?") ? "&" : "?";
  const affiliateUrl = `${cleanUrl}${separator}sub_id=${subId}&utm_source=chuot_cashback`;

  // Estimate cashback (sample math)
  const estimatedPrice = 250000;
  const estCommissionRate = platform === "shopee" ? 10 : platform === "tiktok" ? 15 : 12;
  const estTotalComm = (estimatedPrice * estCommissionRate) / 100;
  const estUserCashback = estTotalComm * 0.8; // 80% to user

  const record = {
    id: `CONV-${Date.now()}`,
    originalUrl: inputUrl,
    affiliateUrl,
    platform,
    platformName,
    subId,
    estimatedCashback: estUserCashback,
    createdAt: new Date().toLocaleString("vi-VN")
  };

  const history = JSON.parse(localStorage.getItem(KEYS.CONVERTED_LINKS) || "[]");
  localStorage.setItem(KEYS.CONVERTED_LINKS, JSON.stringify([record, ...history.slice(0, 19)]));

  return record;
};


export const getLeaderboard = () => LEADERBOARD_DATA;
