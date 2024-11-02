import pool from "../config/db.js";

class CategoryModel {
  static async categoryExists(category_name) {
    try {
      const [result] = await pool.query(
        "SELECT * FROM categories WHERE category_name = ?",
        [category_name]
      );
      return result.length > 0;
    } catch (error) {
      throw new Error("Error checking category existence: " + error.message);
    }
  }

  static async getAllCategories() {
    try {
      const [categories] = await pool.query("SELECT * FROM categories");
      return categories;
    } catch (error) {
      throw new Error("Error retrieving categories: " + error.message);
    }
  }

  static async getCategoryById(id) {
    try {
      const [category] = await pool.query(
        "SELECT * FROM categories WHERE category_id = ?",
        [id]
      );
      return category[0];
    } catch (error) {
      throw new Error("Error retrieving category: " + error.message);
    }
  }

  static async createNewCategory(category_name) {
    try {
      const [result] = await pool.query(
        "INSERT INTO categories (category_name) VALUES (?)",
        [category_name]
      );
      return this.getCategoryById(result.insertId);
    } catch (error) {
      throw new Error("Error creating new category: " + error.message);
    }
  }

  static async updateExistingCategory(id, category_name) {
    const updates = [];
    const values = [];

    if (category_name) {
      updates.push("category_name = ?");
      values.push(category_name);
    }

    if (updates.length === 0) {
      return null;
    }

    values.push(id);

    try {
      await pool.query(
        `UPDATE categories SET ${updates.join(", ")} WHERE category_id = ?`,
        values
      );
      return this.getCategoryById(id);
    } catch (error) {
      throw new Error("Error updating category: " + error.message);
    }
  }

  static async deleteExistingCategory(id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM categories WHERE category_id = ?",
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("Error deleting category: " + error.message);
    }
  }
}

export default CategoryModel;
