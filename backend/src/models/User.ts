import database from '../database';
import Users from '../types/Users';
import { hashPass, checkPass } from '../utils/hashPassword';

class User {
  async createUser(u: Users): Promise<Users[]> {
    try {
      const connection = await database.connect();
      const sql = `
        INSERT INTO users
        (username, first_name, last_name, email, joined, isClient)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING user_id
        `;
      const result = await connection.query(sql, [
        u.username,
        u.first_name,
        u.last_name,
        u.email,
        new Date(),
        u.isClient
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could'nt create user. Error ${(err as Error).message}`);
    }
  }

  async getUser(username: string): Promise<Users[]> {
    try {
      const connection = await database.connect();
      const sql = `SELECT * FROM users WHERE username=$1`;
      const result = await connection.query(sql, [username]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could'nt get user. Error ${(err as Error).message}`);
    }
  }

  async updateUser(u: Users): Promise<Users[]> {
    try {
      const connection = await database.connect();
      const sql = `UPDATE users SET ${
        Object.keys(u)[1]
      }=$2 WHERE user_id=$1 RETURNING ${Object.keys(u)[1]}`;
      const result = await connection.query(sql, [
        u.user_id,
        Object.values(u)[1]
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could'nt update users ${Object.keys(u)[1]}. Error ${
          (err as Error).message
        }`
      );
    }
  }

  async deleteUser(u: Users): Promise<Users[]> {
    try {
      const connection = await database.connect();
      const sql = `DELETE FROM users WHERE user_id=$1 RETURNING user_id`;
      const result = await connection.query(sql, [u.user_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could'nt delete user. Error ${(err as Error).message}`);
    }
  }

  async userAuthenticate(u: Users): Promise<Users[] | null> {
    try {
      const connection = await database.connect();
      const sql = `
      SELECT DISTINCT p.password
      from passwords p, users u
      WHERE u.${Object.keys(u)[0]}=$1`;
      const result = await connection.query(sql, [Object.values(u)[0]]);
      if (result.rows.length) {
        const check = checkPass(Object.values(u)[1], result.rows[0].password);
        if (check) {
          const admin_SQL = `SELECT user_id, username FROM admins WHERE ${
            Object.keys(u)[0]
          }=$1`;
          const admin_result = await connection.query(admin_SQL, [
            Object.values(u)[0]
          ]);
          connection.release();
          return admin_result.rows[0];
        } else {
          connection.release();
          throw new Error(`Password is incorrect`);
        }
      }
      return null;
    } catch (err) {
      throw new Error(
        `Could'nt authenticate user. Error ${(err as Error).message}`
      );
    }
  }
}
export default User;
