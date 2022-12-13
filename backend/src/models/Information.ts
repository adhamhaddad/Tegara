import database from '../database';
import Info from '../types/Information';

class Inforamtion {
  async createInfo(i: Info): Promise<Info[]> {
    try {
      const connection = await database.connect();
      const sql = `
        INSERT INTO information
        (user_id, street, country, city, id_number)
        VALUES ($1, $2, $3, $4 $5)
        RETURNING *`;
      const result = await connection.query(sql, [
        i.user_id,
        i.street,
        i.country,
        i.city,
        i.id_number
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could'nt create Info. Error ${(err as Error).message}`);
    }
  }

  async getInfo(username: string): Promise<Info[]> {
    try {
      const connection = await database.connect();
      const sql = `SELECT DISTINCT i.* FROM information i, users u
      WHERE i.user_id=u.user_id AND u.username=$1`;
      const result = await connection.query(sql, [username]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could'nt get Info. Error ${(err as Error).message}`);
    }
  }

  async updateInfo(i: Info): Promise<Info[]> {
    try {
      const connection = await database.connect();
      const sql = `
        UPDATE information SET
        ${Object.keys(i)[1]}=$2 WHERE user_id=$1
        RETURNING ${Object.keys(i)[1]}`;
      const result = await connection.query(sql, [
        i.user_id,
        Object.values(i)[1]
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could'nt update Info ${Object.keys(i)[1]}. Error ${
          (err as Error).message
        }`
      );
    }
  }

  async deleteInfo(i: Info): Promise<Info[]> {
    try {
      const connection = await database.connect();
      const sql = `DELETE FROM information WHERE user_id=$1 RETURNING *`;
      const result = await connection.query(sql, [i.user_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could'nt delete Info. Error ${(err as Error).message}`);
    }
  }
}
export default Inforamtion;
