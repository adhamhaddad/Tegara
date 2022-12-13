CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS products (
    product_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_image TEXT NOT NULL,
    product_price VARCHAR(50) NOT NULL,
    product_quantity VARCHAR(20) NOT NULL,
    timedate VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);