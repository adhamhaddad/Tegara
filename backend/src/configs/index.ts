import dotenv from 'dotenv';

dotenv.config();

const configs = {
  host: process.env.HOST,
  port: Number(process.env.PORT),
  db_host: process.env.DB_HOST,
  db_port: Number(process.env.DB_PORT),
  db_name: process.env.DB_NAME,
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  token: process.env.SECRET_TOKEN,
  salt: Number(process.env.SALT_ROUNDS),
  peper: String(process.env.SECRET_PEPER)
};
export default configs;
