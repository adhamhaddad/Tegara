import { Pool } from 'pg';
import configs from '../configs';

const database = new Pool({
  host: configs.db_host,
  port: Number(configs.db_port),
  database: configs.db_name,
  user: configs.db_username,
  password: configs.db_password
});
export default database;
