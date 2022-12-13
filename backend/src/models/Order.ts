import database from '../database';
import Orders from '../types/Orders';

class Order {
  async createOrder(o: Orders): Promise<Orders[]> {
    try {
      const connection = await database.connect();
      const sql = `
        INSERT INTO orders (user_id, product_id, timedate, count)
        VALUES ($1, $2, $3, $4)
        RETURNING *`;
      const result = await connection.query(sql, [
        o.user_id,
        o.product_id,
        o.timedate,
        o.count
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could'nt create order. Error ${(err as Error).message}`);
    }
  }

  async getOrder(order_id: string): Promise<Orders[]> {
    try {
      const connection = await database.connect();
      const sql = `SELECT * FROM orders WHERE order_id=$1`;
      const result = await connection.query(sql, [order_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could'nt get order. Error ${(err as Error).message}`);
    }
  }

  async getOrders(user_id: string): Promise<Orders[]> {
    try {
      const connection = await database.connect();
      const sql = `SELECT * FROM orders WHERE user_id=$1`;
      const result = await connection.query(sql, [user_id]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could'nt update order. Error ${(err as Error).message}`);
    }
  }

  async updateOrder(o: Orders): Promise<Orders[]> {
    try {
      const connection = await database.connect();
      const sql = `UPDATE orders SET count=$3 WHERE order_id=$1 AND user_id=$2 RETURNING *`;
      const result = await connection.query(sql, [
        o.order_id,
        o.user_id,
        o.count
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could'nt update order. Error ${(err as Error).message}`);
    }
  }

  async deleteOrder(o: Orders): Promise<Orders[]> {
    try {
      const connection = await database.connect();
      const sql = `DELETE FROM orders WHERE order_id=$1 RETURNING *`;
      const result = await connection.query(sql, [o.order_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could'nt delete order. Error ${(err as Error).message}`);
    }
  }
}
export default Order;
