import pool from "../config/db.js";

class OrderModel {
  static async getAllOrders() {
    try {
      const [orders] = await pool.query("SELECT * FROM orders");
      return orders;
    } catch (error) {
      throw new Error("Error retrieving orders: " + error.message);
    }
  }

  static async getOrderById(id) {
    try {
      const [order] = await pool.query(
        "SELECT * FROM orders WHERE order_id = ?",
        [id]
      );
      return order[0];
    } catch (error) {
      throw new Error("Error retrieving order: " + error.message);
    }
  }

  static async createNewOrder(total_amount, status, user_id) {
    try {
      const [result] = await pool.query(
        "INSERT INTO orders (total_amount, status, user_id) VALUES (?, ?, ?)",
        [total_amount, status, user_id]
      );
      return this.getOrderById(result.insertId);
    } catch (error) {
      throw new Error("Error creating new order: " + error.message);
    }
  }

  static async updateExistingOrder(id, total_amount, status, user_id) {
    const updates = [];
    const values = [];

    if (total_amount) {
      updates.push("total_amount = ?");
      values.push(total_amount);
    }
    if (status) {
      updates.push("status = ?");
      values.push(status);
    }
    if (user_id) {
      updates.push("user_id = ?");
      values.push(user_id);
    }

    if (updates.length === 0) {
      return null;
    }

    values.push(id);

    try {
      await pool.query(
        `UPDATE orders SET ${updates.join(", ")} WHERE order_id = ?`,
        values
      );
      return this.getOrderById(id);
    } catch (error) {
      throw new Error("Error updating order: " + error.message);
    }
  }

  static async deleteExistingOrder(id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM orders WHERE order_id = ?",
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("Error deleting order: " + error.message);
    }
  }
}

export default OrderModel;
