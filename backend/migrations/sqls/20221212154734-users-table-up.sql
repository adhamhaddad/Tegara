CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS users (
    user_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(200) NOT NULL UNIQUE,
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    joined VARCHAR(255) NOT NULL,
    isClient BIT NOT NULL
);