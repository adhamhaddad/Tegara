import database from '../database';
import PR from '../types/ProductRates';

class ProductRate {
  async createRate(r: PR): Promise<PR[]> {
    try {
      const connection = await database.connect();
      const sql = `INSERT INTO product_rates (user_id, product_id, rates_count, timedate) VALUES ($1, $2, $3, $4) RETURNING *`;
      const result = await connection.query(sql, [
        r.user_id,
        r.product_id,
        new Date()
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could'nt create rate. Error ${(err as Error).message}`);
    }
  }

  async getRate(product_id: string): Promise<PR[]> {
    try {
      const connection = await database.connect();
      const sql = `SELECT * FROM product_rates WHERE product_id=$1`;
      const result = await connection.query(sql, [product_id]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could'nt get product rates. Error ${(err as Error).message}`
      );
    }
  }

  async updateRate(r: PR): Promise<PR[]> {
    try {
      const connection = await database.connect();
      const sql = `UPDATE product_rates SET rate_count=$3, timedate=$4 WHERE product_id=$1, AND user_id=$2 RETURNING *`;
      const result = await connection.query(sql, [
        r.user_id,
        r.product_id,
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

  async deleteRate(r: PR): Promise<PR[]> {
    try {
      const connection = await database.connect();
      const sql = `DELETE FROM product_rates WHERE product_id=$1 AND user_id=$2 RETURNING *`;
      const result = await connection.query(sql, [r.product_id, r.user_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could'nt delete the product rate. Error ${(err as Error).message}`
      );
    }
  }
}
export default ProductRate;
