CREATE TABLE IF NOT EXISTS information (
    user_id uuid NOT NULL,
    street VARCHAR(255),
    country VARCHAR(255),
    ciry VARCHAR(255),
    id_number VARCHAR(255) UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);