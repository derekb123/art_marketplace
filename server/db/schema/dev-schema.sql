DROP TABLE IF EXISTS users
CASCADE;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  creator BOOLEAN,
  avatar TEXT,
  created_at TIMESTAMP DEFAULT current_timestamp
);

DROP TABLE IF EXISTS assets
CASCADE;

CREATE TABLE assets (
	id SERIAL PRIMARY KEY NOT NULL,
	title VARCHAR(255) NOT NULL,
	asset_description TEXT,
	asset_image TEXT NOT NULL,
	creator_id INTEGER,
	owner_id INTEGER,
	size VARCHAR(255),
	likes INT,
	views INT,
	category VARCHAR(255),
  created_at TIMESTAMP DEFAULT current_timestamp,
  list_price NUMERIC(16, 2) DEFAULT 0.00,
  high_bid NUMERIC(16, 2) DEFAULT 0.00,
  offers_made INT DEFAULT 0
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

