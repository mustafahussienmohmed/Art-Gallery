import bcrypt from "bcrypt";
import pool from "../config/db.js";

class UserModel {
  static async emailExists(email) {
    try {
      const [result] = await pool.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      return result.length > 0;
    } catch (error) {
      throw new Error("Error checking email existence: " + error.message);
    }
  }

  static async getAllUsers() {
    try {
      const [users] = await pool.query(
        "SELECT * FROM users WHERE is_admin = 0"
      );
      return users;
    } catch (error) {
      throw new Error("Error retrieving users: " + error.message);
    }
  }

  static async getUserById(id) {
    try {
      const [user] = await pool.query(
        "SELECT * FROM users WHERE user_id = ? AND is_admin = 0",
        [id]
      );
      return user[0];
    } catch (error) {
      throw new Error("Error retrieving user: " + error.message);
    }
  }

  static async createNewUser(
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
        "INSERT INTO users (name, email, password, address, phone_number, gender) VALUES (?, ?, ?, ?, ?, ?)",
        [name, email, hashedPassword, address, phone_number, gender]
      );
      return this.getUserById(result.insertId);
    } catch (error) {
      throw new Error("Error creating new user: " + error.message);
    }
  }

  static async updateExistingUser(
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
        )} WHERE user_id = ? AND is_admin = 0`,
        values
      );
      return this.getUserById(id);
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  static async deleteExistingUser(id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM users WHERE user_id = ? AND is_admin = 0",
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }
}

export default UserModel;
