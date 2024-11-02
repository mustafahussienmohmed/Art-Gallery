import pool from "../config/db.js";

class ProductModel {
  static async getAllProducts() {
    try {
      const [products] = await pool.query("SELECT * FROM products");
      return products;
    } catch (error) {
      throw new Error("Error retrieving products: " + error.message);
    }
  }

  static async getProductById(id) {
    try {
      const [product] = await pool.query(
        "SELECT * FROM products WHERE product_id = ?",
        [id]
      );
      return product[0];
    } catch (error) {
      throw new Error("Error retrieving product: " + error.message);
    }
  }

  static async createNewProduct(
    title,
    description,
    price,
    stock,
    image,
    category_id
  ) {
    try {
      const [result] = await pool.query(
        "INSERT INTO products (title, description, price, stock, image, category_id) VALUES (?, ?, ?, ?, ?, ?)",
        [title, description, price, stock, image, category_id]
      );
      return this.getProductById(result.insertId);
    } catch (error) {
      throw new Error("Error creating new product: " + error.message);
    }
  }

  static async updateExistingProduct(
    id,
    title,
    description,
    price,
    stock,
    image,
    category_id
  ) {
    const updates = [];
    const values = [];

    if (title) {
      updates.push("title = ?");
      values.push(title);
    }
    if (description) {
      updates.push("description = ?");
      values.push(description);
    }
    if (price) {
      updates.push("price = ?");
      values.push(price);
    }
    if (stock) {
      updates.push("stock = ?");
      values.push(stock);
    }
    if (image) {
      updates.push("image = ?");
      values.push(image);
    }
    if (category_id) {
      updates.push("category_id = ?");
      values.push(category_id);
    }

    if (updates.length === 0) {
      return null;
    }

    values.push(id);

    try {
      await pool.query(
        `UPDATE products SET ${updates.join(", ")} WHERE product_id = ?`,
        values
      );
      return this.getProductById(id);
    } catch (error) {
      throw new Error("Error updating product: " + error.message);
    }
  }

  static async deleteExistingProduct(id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM products WHERE product_id = ?",
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("Error deleting product: " + error.message);
    }
  }
}

export default ProductModel;
