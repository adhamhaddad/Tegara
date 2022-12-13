CREATE TABLE IF NOT EXISTS user_rates (
    client_id uuid NOT NULL,
    seller_id uuid NOT NULL,
    timedate VARCHAR(255) NOT NULL,
    FOREIGN KEY (client_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (seller_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);