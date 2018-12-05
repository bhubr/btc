create table exchange(
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  ccxt_id VARCHAR(30),
  name VARCHAR(128),
  ccxt_logo VARCHAR(255),
  country VARCHAR(48),
  website VARCHAR(128),
  fees_doc VARCHAR(255)
);

create table market(
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  symbol VARCHAR(10),
  exchange_id INTEGER NOT NULL,
  base VARCHAR(5),
  quote VARCHAR(5),
  active BOOLEAN
);

create table crypto(
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  symbol VARCHAR(5),
  name VARCHAR(40),
  slug VARCHAR(40),
  circulating_supply DECIMAL(20,8),
  total_supply DECIMAL(20,8),
  max_supply DECIMAL(20,8),
  whitepaper VARCHAR(255),
  explorer VARCHAR(255),
  source_code VARCHAR(255)
);
