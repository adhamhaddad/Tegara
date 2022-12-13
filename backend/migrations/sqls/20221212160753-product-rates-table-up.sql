CREATE TABLE IF NOT EXISTS user_rates (
    user_id uuid NOT NULL,
    product_id uuid NOT NULL,
    rates_count VARCHAR(5) NOT NULL,
    timedate VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE ON UPDATE CASCADE
);