DROP TABLE IF EXISTS users
CASCADE;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  creator BOOLEAN DEFAULT false,
  avatar TEXT,
  created_at TIMESTAMP DEFAULT current_timestamp,
  token_version INT DEFAULT 0
);

DROP TABLE IF EXISTS assets
CASCADE;

CREATE TABLE assets (
	id SERIAL PRIMARY KEY NOT NULL,
	title VARCHAR(255) NOT NULL,
	asset_description TEXT,
	asset_media TEXT NOT NULL,
	creator_id INTEGER,
	owner_id INTEGER,
  list_price NUMERIC(16, 2),
	likes INT DEFAULT 0,
	views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT current_timestamp,
  accepting_offers BOOLEAN DEFAULT false
);

DROP TABLE IF EXISTS bids
CASCADE;

CREATE TABLE bids (
  id SERIAL PRIMARY KEY NOT NULL,
  asset_id VARCHAR(255) NOT NULL,
  bidder_id VARCHAR(255) NOT NULL,
  bid_price NUMERIC(16, 2) DEFAULT 0.00
);

DROP TABLE IF EXISTS transactions
CASCADE;

CREATE TABLE transactions
(
  id SERIAL PRIMARY KEY NOT NULL,
  asset_item_id VARCHAR(255) NOT NULL,
  buyer_id VARCHAR(255) NOT NULL,
  seller_id VARCHAR(255) NOT NULL,
  trans_type VARCHAR(255) NOT NULL,
  payment_method VARCHAR(255) NOT NULL,
  sale_price NUMERIC(16, 2) DEFAULT 0.00,
  royalty_price NUMERIC(16, 2) DEFAULT 0.00,
  tax_price NUMERIC(16, 2) DEFAULT 0.00,
  site_fee NUMERIC(16, 2) DEFAULT 0.00,
  trans_fee NUMERIC(16, 2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT current_timestamp
);

DROP TABLE IF EXISTS asset_tags
CASCADE;

CREATE TABLE asset_tags
(
  id SERIAL PRIMARY KEY NOT NULL,
  asset_id VARCHAR(255) NOT NULL,
  tag_id INTEGER[]
);

DROP TABLE IF EXISTS tags
CASCADE;

CREATE TABLE tags
(
  id SERIAL PRIMARY KEY NOT NULL,
  tag VARCHAR(255) NOT NULL
);

