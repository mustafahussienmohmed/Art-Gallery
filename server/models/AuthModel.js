import pool from "../config/db.js";

class AuthModel {
  static async getUserByEmail(email) {
    try {
      const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      return user[0];
    } catch (error) {
      throw new Error("Error retrieving user by email: " + error.message);
    }
  }

  static async saveRefreshToken(token, user_id) {
    try {
      await pool.query(
        "INSERT INTO refresh_tokens (token, user_id) VALUES (?, ?)",
        [token, user_id]
      );
    } catch (error) {
      throw new Error("Error saving refresh token: " + error.message);
    }
  }

  static async getRefreshToken(token) {
    try {
      const [result] = await pool.query(
        "SELECT * FROM refresh_tokens WHERE token = ?",
        [token]
      );
      return result[0];
    } catch (error) {
      throw new Error("Error retrieving refresh token: " + error.message);
    }
  }

  static async deleteRefreshToken(token) {
    try {
      const [result] = await pool.query(
        "DELETE FROM refresh_tokens WHERE token = ?",
        [token]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("Error deleting refresh token: " + error.message);
    }
  }
}

export default AuthModel;
