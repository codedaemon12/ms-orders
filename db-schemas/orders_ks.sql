CREATE KEYSPACE IF NOT EXISTS orders_ks WITH REPLICATION = {
  'class': 'SimpleStrategy',
  'replication_factor': 1
};

USE orders_ks;

CREATE TABLE orders_ks.customers (
    customer_id uuid PRIMARY KEY,
    addr_line1 text,
    addr_line2 text,
    city text,
    created_at timestamp,
    cust_state text,
    first_name text,
    last_name text,
    updated_at timestamp,
    zip_code text
) 

CREATE INDEX customers_last_name_idx ON orders_ks.customers (last_name);

CREATE INDEX customers_zip_code_idx ON orders_ks.customers (zip_code);

CREATE TABLE orders_ks.orders (
    id uuid PRIMARY KEY,
    created_at timestamp,
    customer_id uuid,
    item text,
    price decimal,
    quantity int
)