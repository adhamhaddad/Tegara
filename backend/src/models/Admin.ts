import database from '../database';
import Admins from '../types/Admins';
import { hashPass, checkPass } from '../utils/hashPassword';

class Admin {
  async createAdmin(a: Admins): Promise<Admins[]> {
    try {
      const connection = await database.connect();
      const sql = `
        INSERT INTO admins
        (username, first_name, last_name, email, password)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING admin_id, username
        `;
      const result = await connection.query(sql, [
        a.username,
        a.first_name,
        a.last_name,
        a.email,
        hashPass(a.password)
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could'nt create admin. Error ${(err as Error).message}`);
    }
  }

  async getAdmin(username: string): Promise<Admins[]> {
    try {
      const connection = await database.connect();
      const sql = `SELECT admin_id, username, first_name, last_name FROM admins WHERE username=$1`;
      const result = await connection.query(sql, [username]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could'nt get admin. Error ${(err as Error).message}`);
    }
  }

  async updateAdmin(a: Admins): Promise<Admins[]> {
    try {
      const connection = await database.connect();
      const sql = `UPDATE admins SET ${
        Object.keys(a)[1]
      }=$2 WHERE admin_id=$1 RETURNING ${Object.keys(a)[1]}`;
      const result = await connection.query(sql, [
        a.admin_id,
        Object.values(a)[1]
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could'nt update admin ${Object.keys(a)[1]}. Error ${
          (err as Error).message
        }`
      );
    }
  }

  async deleteAdmin(a: Admins): Promise<Admins[]> {
    try {
      const connection = await database.connect();
      const sql = `DELETE FROM admins WHERE admin_id=$1 RETURNING admin_id`;
      const result = await connection.query(sql, [a.admin_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could'nt delete admin. Error ${(err as Error).message}`);
    }
  }

  async adminAuthenticate(a: Admins): Promise<Admins[] | null> {
    try {
      const connection = await database.connect();
      const sql = `SELECT password from admin WHERE ${Object.keys(a)[0]}=$1`;
      const result = await connection.query(sql, [Object.values(a)[0]]);
      if (result.rows.length) {
        const check = checkPass(a.password, result.rows[0].password);
        console.log(check);
        // if (check) {
        //   const admin_SQL = `SELECT user_id, username FROM admins WHERE ${
        //     Object.keys(a)[0]
        //   }=$1`;
        //   const admin_result = await connection.query(admin_SQL, [
        //     Object.values(a)[0]
        //   ]);
        //   connection.release();
        //   return admin_result.rows[0];
        // } else {
        //   connection.release();
        //   throw new Error(`Password is incorrect`);
        // }
      }
      return null;
    } catch (err) {
      throw new Error(
        `Could'nt authenticate admin. Error ${(err as Error).message}`
      );
    }
  }
}
export default Admin;
