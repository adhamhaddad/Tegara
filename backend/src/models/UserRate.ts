import database from '../database';
import UR from '../types/UserRates';

class UserRate {
  async createRate(r: UR): Promise<UR[]> {
    try {
      const connection = await database.connect();
      const sql = `INSERT INTO user_rates (client_id, seller_id, rates_count, timedate) VALUES ($1, $2, $3, $4) RETURNING *`;
      const result = await connection.query(sql, [
        r.client_id,
        r.seller_id,
        r.rates_count,
        new Date()
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could'nt create rate. Error ${(err as Error).message}`);
    }
  }

  //! Need Fix
  async getRate(product_id: string): Promise<UR[]> {
    try {
      const connection = await database.connect();
      const sql = `SELECT * FROM user_rates WHERE =$1`;
      const result = await connection.query(sql, [product_id]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could'nt get user rates. Error ${(err as Error).message}`
      );
    }
  }

  async updateRate(r: UR): Promise<UR[]> {
    try {
      const connection = await database.connect();
      const sql = `UPDATE product_rates SET rate_count=$3, timedate=$4 WHERE product_id=$1, AND user_id=$2 RETURNING *`;
      const result = await connection.query(sql, [
        r.client_id,
        r.seller_id,
        r.rates_count,
        new Date()
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could'nt update product rate. Error ${(err as Error).message}`
      );
    }
  }

  async deleteRate(r: UR): Promise<UR[]> {
    try {
      const connection = await database.connect();
      const sql = `DELETE FROM user_rates WHERE product_id=$1 AND user_id=$2 RETURNING *`;
      const result = await connection.query(sql, [r.client_id, r.seller_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could'nt delete the product rate. Error ${(err as Error).message}`
      );
    }
  }
}
export default UserRate;
