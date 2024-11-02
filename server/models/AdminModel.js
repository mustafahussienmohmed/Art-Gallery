import bcrypt from "bcrypt";
import pool from "../config/db.js";

class AdminModel {
  static async getAllAdmins() {
    try {
      const [admins] = await pool.query(
        "SELECT * FROM users WHERE is_admin = 1"
      );
      return admins;
    } catch (error) {
      throw new Error("Error retrieving admins: " + error.message);
    }
  }

  static async getAdminById(id) {
    try {
      const [admin] = await pool.query(
        "SELECT * FROM users WHERE user_id = ? AND is_admin = 1",
        [id]
      );
      return admin[0];
    } catch (error) {
      throw new Error("Error retrieving admin: " + error.message);
    }
  }

  static async createNewAdmin(
    name,
    email,
    password,
    address,
    phone_number,
    gender
  ) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await pool.query(
        "INSERT INTO users (name, email, password, address, phone_number, gender, is_admin) VALUES (?, ?, ?, ?, ?, ?, 1)",
        [name, email, hashedPassword, address, phone_number, gender]
      );
      return this.getAdminById(result.insertId);
    } catch (error) {
      throw new Error("Error creating new admin: " + error.message);
    }
  }

  static async updateExistingAdmin(
    id,
    name,
    email,
    password,
    address,
    phone_number,
    gender
  ) {
    const updates = [];
    const values = [];

    if (name) {
      updates.push("name = ?");
      values.push(name);
    }
    if (email) {
      updates.push("email = ?");
      values.push(email);
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.push("password = ?");
      values.push(hashedPassword);
    }
    if (address) {
      updates.push("address = ?");
      values.push(address);
    }
    if (phone_number) {
      updates.push("phone_number = ?");
      values.push(phone_number);
    }
    if (gender) {
      updates.push("gender = ?");
      values.push(gender);
    }

    if (updates.length === 0) {
      return null;
    }

    values.push(id);

    try {
      await pool.query(
        `UPDATE users SET ${updates.join(
          ", "
        )} WHERE user_id = ? AND is_admin = 1`,
        values
      );
      return this.getAdminById(id);
    } catch (error) {
      throw new Error("Error updating admin: " + error.message);
    }
  }

  static async deleteExistingAdmin(id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM users WHERE user_id = ? AND is_admin = 1",
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("Error deleting admin: " + error.message);
    }
  }
}

export default AdminModel;
