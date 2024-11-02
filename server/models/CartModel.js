import pool from "../config/db.js";

class CartModel {
  static async getAllCarts() {
    try {
      const [carts] = await pool.query("SELECT * FROM cart");
      return carts;
    } catch (error) {
      throw new Error("Error retrieving carts: " + error.message);
    }
  }

  static async getCartById(id) {
    try {
      const [cart] = await pool.query("SELECT * FROM cart WHERE cart_id = ?", [
        id,
      ]);
      return cart[0];
    } catch (error) {
      throw new Error("Error retrieving cart: " + error.message);
    }
  }

  static async createNewCart(quantity, user_id, product_id) {
    try {
      const [result] = await pool.query(
        "INSERT INTO cart (quantity, user_id, product_id) VALUES (?, ?, ?)",
        [quantity, user_id, product_id]
      );
      return this.getCartById(result.insertId);
    } catch (error) {
      throw new Error("Error creating new cart: " + error.message);
    }
  }

  static async updateExistingCart(id, quantity, user_id, product_id) {
    const updates = [];
    const values = [];

    if (quantity) {
      updates.push("quantity = ?");
      values.push(quantity);
    }
    if (user_id) {
      updates.push("user_id = ?");
      values.push(user_id);
    }
    if (product_id) {
      updates.push("product_id = ?");
      values.push(product_id);
    }

    if (updates.length === 0) {
      return null;
    }

    values.push(id);

    try {
      await pool.query(
        `UPDATE cart SET ${updates.join(", ")} WHERE cart_id = ?`,
        values
      );
      return this.getCartById(id);
    } catch (error) {
      throw new Error("Error updating cart: " + error.message);
    }
  }

  static async deleteExistingCart(id) {
    try {
      const [result] = await pool.query("DELETE FROM cart WHERE cart_id = ?", [
        id,
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("Error deleting cart: " + error.message);
    }
  }
}

export default CartModel;
