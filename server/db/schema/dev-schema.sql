DROP TABLE IF EXISTS users
CASCADE;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  creator BOOLEAN,
  avatar TEXT,
  created_at TIMESTAMP DEFAULT current_timestamp
);

DROP TABLE IF EXISTS nft_base
CASCADE;

CREATE TABLE nft_base
(
  id SERIAL PRIMARY KEY NOT NULL,
  nft_name VARCHAR(255) NOT NULL,
  nft_description TEXT,
  nft_image TEXT NOT NULL,
  creator_id VARCHAR(255),
  creator_name VARCHAR(255) NOT NULL,
  edition_size INTEGER NOT NULL,
  royalty_rate SMALLINT NOT NULL,
);

CREATE TABLE nft_item
(
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id VARCHAR(255) NOT NULL,
  nft_base_id VARCHAR(255) NOT NULL,
  edition_number INTEGER NOT NULL,
  for_sale BOOLEAN NOT NULL,
  sale_price NUMERIC(16, 2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE transactions
(
  id SERIAL PRIMARY KEY NOT NULL,
  nft_item_id VARCHAR(255) NOT NULL,
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

CREATE TABLE item_tag
(
  id SERIAL PRIMARY KEY NOT NULL,
  nft_base_id VARCHAR(255) NOT NULL,
  tag_id VARCHAR(255) NOT NULL,
);

CREATE TABLE tags
(
  tag VARCHAR(255) NOT NULL
);

