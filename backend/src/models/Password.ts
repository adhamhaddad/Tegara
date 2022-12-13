import database from '../database';
import Passwords from '../types/Passwords';
import { hashPass } from '../utils/hashPassword';

class Password {
  async createPassword(p: Passwords): Promise<Passwords[]> {
    try {
      const connection = await database.connect();
      const sql = `
        INSERT INTO passwords
        (user_id, current_password, old_password, last_changed)
        VALUES ($1, $2, $3, $4)`;
      const result = await connection.query(sql, [
        p.user_id,
        hashPass(p.current_password),
        null,
        new Date()
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could'nt create password. Error ${(err as Error).message}`
      );
    }
  }

  async updatePassword(p: Passwords): Promise<Passwords[]> {
    try {
      const connection = await database.connect();
      const sql = `UPDATE passwords SET current_password=$2, old_password=$3, last_changed=$4 WHERE user_id=$1`;
      const result = await connection.query(sql, [
        p.user_id,
        hashPass(p.current_password),
        hashPass(p.old_password),
        new Date()
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could'nt update password. Error ${(err as Error).message}`
      );
    }
  }

  async resetPassword(p: Passwords): Promise<Passwords[]> {
    try {
      const connection = await database.connect();
      const sql = `UPDATE passwords SET current_password=$2, old_password=$3, last_changed=$4 WHERE user_id=$1`;
      const result = await connection.query(sql, [
        p.user_id,
        hashPass(p.current_password),
        null,
        new Date()
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could'nt reset password. Error ${(err as Error).message}`
      );
    }
  }
}
export default Password;
