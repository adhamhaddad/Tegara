import dotenv from 'dotenv';

dotenv.config();

const configs = {
  host: process.env.HOST,
  port: process.env.PORT,
  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  db_name: process.env.DB_NAME,
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  token: process.env.SECRET_TOKEN,
  salt: process.env.SALT_ROUNDS,
  peper: process.env.SECRET_PEPER
};
export default configs;
