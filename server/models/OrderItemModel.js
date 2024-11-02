import pool from "../config/db.js";

class OrderItemModel {
  static async getAllOrderItems() {
    try {
      const [orderItems] = await pool.query("SELECT * FROM order_items");
      return orderItems;
    } catch (error) {
      throw new Error("Error retrieving order items: " + error.message);
    }
  }

  static async getOrderItemById(id) {
    try {
      const [orderItem] = await pool.query(
        "SELECT * FROM order_items WHERE order_item_id = ?",
        [id]
      );
      return orderItem[0];
    } catch (error) {
      throw new Error("Error retrieving order item: " + error.message);
    }
  }

  static async createNewOrderItem(quantity, order_id, product_id) {
    try {
      const [result] = await pool.query(
        "INSERT INTO order_items (quantity, order_id, product_id) VALUES (?, ?, ?)",
        [quantity, order_id, product_id]
      );
      return this.getOrderItemById(result.insertId);
    } catch (error) {
      throw new Error("Error creating new order item: " + error.message);
    }
  }

  static async updateExistingOrderItem(id, quantity, order_id, product_id) {
    const updates = [];
    const values = [];

    if (quantity) {
      updates.push("quantity = ?");
      values.push(quantity);
    }
    if (order_id) {
      updates.push("order_id = ?");
      values.push(order_id);
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
        `UPDATE order_items SET ${updates.join(", ")} WHERE order_item_id = ?`,
        values
      );
      return this.getOrderItemById(id);
    } catch (error) {
      throw new Error("Error updating order item: " + error.message);
    }
  }

  static async deleteExistingOrderItem(id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM order_items WHERE order_item_id = ?",
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("Error deleting order item: " + error.message);
    }
  }
}

export default OrderItemModel;
