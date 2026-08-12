-- SQL Schema cho Hệ Thống Chuột Hoàn Tiền (Giftixa.com)

-- 1. Bảng Người Dùng (Users)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    avatar TEXT,
    balance BIGINT DEFAULT 0,
    pending_balance BIGINT DEFAULT 0,
    total_cashback BIGINT DEFAULT 0,
    withdrawal_pin VARCHAR(10) DEFAULT '123456',
    bank_name VARCHAR(100),
    bank_account_number VARCHAR(100),
    bank_account_name VARCHAR(100),
    referral_code VARCHAR(50) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng Đơn Hàng Hoàn Tiền (Orders)
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(100) PRIMARY KEY,
    user_id VARCHAR(50) REFERENCES users(id),
    platform VARCHAR(50) NOT NULL,
    product_name TEXT NOT NULL,
    product_image TEXT,
    order_date VARCHAR(100),
    price BIGINT NOT NULL,
    commission_rate INT DEFAULT 10,
    total_commission BIGINT NOT NULL,
    cashback_rate INT DEFAULT 80,
    user_cashback BIGINT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Bảng Lệnh Rút Tiền Ngân Hàng (Withdrawals)
CREATE TABLE IF NOT EXISTS withdrawals (
    id VARCHAR(100) PRIMARY KEY,
    user_id VARCHAR(50) REFERENCES users(id),
    amount BIGINT NOT NULL,
    bank_name VARCHAR(100) NOT NULL,
    account_number VARCHAR(100) NOT NULL,
    account_name VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    transaction_code VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Thêm tài khoản Admin và User mặc định
INSERT INTO users (id, name, email, password, role, balance, withdrawal_pin, referral_code)
VALUES 
('ADM-000001', 'Quản Trị Viên (System Admin)', 'admin@chuot-hoantien.com', 'admin123', 'admin', 15400000, '654321', 'ADMIN-MASTER'),
('USR-982341', 'Nguyễn Văn Hùng (Người Dùng)', 'user@chuot-hoantien.com', '123456', 'user', 450000, '123456', 'CHUOT-HUNGBN')
ON CONFLICT (email) DO NOTHING;
