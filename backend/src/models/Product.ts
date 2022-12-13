import database from '../database';
import Products from '../types/Products';

class Product {
  async createProduct(p: Products): Promise<Products[]> {
    try {
      const connection = await database.connect();
      const sql = `
        INSERT INTO products
        (user_id, product_name, product_image, product_price, product_quantity, timedate)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`;
      const result = await connection.query(sql, [
        p.user_id,
        p.product_name,
        p.product_image,
        p.product_price,
        p.product_quantity,
        new Date()
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could'nt create product. Error ${(err as Error).message}`
      );
    }
  }

  async getProduct(product_id: string): Promise<Products[]> {
    try {
      const connection = await database.connect();
      const sql = `SELECT * FROM products WHERE product_id=$1`;
      const result = await connection.query(sql, [product_id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could'nt get product. Error ${(err as Error).message}`);
    }
  }

  async getProducts(user_id: string): Promise<Products[]> {
    try {
      const connection = await database.connect();
      const sql = `SELECT * FROM products WHERE user_id=$1`;
      const result = await connection.query(sql, [user_id]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could'nt get products. Error ${(err as Error).message}`);
    }
  }

  async updateProduct(p: Products): Promise<Products[]> {
    try {
      const connection = await database.connect();
      const sql = `
        UPDATE products SET ${Object.keys(p)[1]}
        RETURNING *`;
      const result = await connection.query(sql, [
        p.user_id,
        p.product_name,
        p.product_image,
        p.product_price,
        p.product_quantity,
        new Date()
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could'nt create product. Error ${(err as Error).message}`
      );
    }
  }

  async deleteProduct(p: Products): Promise<Products[]> {
    try {
      const connection = await database.connect();
      const sql = `
        INSERT INTO products
        (user_id, product_name, product_image, product_price, product_quantity, timedate)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`;
      const result = await connection.query(sql, [
        p.user_id,
        p.product_name,
        p.product_image,
        p.product_price,
        p.product_quantity,
        new Date()
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could'nt create product. Error ${(err as Error).message}`
      );
    }
  }
}
export default Product;
