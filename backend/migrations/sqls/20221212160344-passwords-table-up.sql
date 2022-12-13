CREATE TABLE IF NOT EXISTS passwords (
    user_id uuid NOT NULL,
    current_password TEXT NOT NULL,
    old_password TEXT,
    last_changed VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);