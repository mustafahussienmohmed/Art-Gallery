import pool from "../config/db.js";

class ReviewModel {
  static async getAllReviews() {
    try {
      const [reviews] = await pool.query("SELECT * FROM reviews");
      return reviews;
    } catch (error) {
      throw new Error("Error retrieving reviews: " + error.message);
    }
  }

  static async getReviewById(id) {
    try {
      const [review] = await pool.query(
        "SELECT * FROM reviews WHERE review_id = ?",
        [id]
      );
      return review[0];
    } catch (error) {
      throw new Error("Error retrieving review: " + error.message);
    }
  }

  static async createNewReview(rating, comment, product_id, user_id) {
    try {
      const [result] = await pool.query(
        "INSERT INTO reviews (rating, comment, product_id, user_id) VALUES (?, ?, ?, ?)",
        [rating, comment, product_id, user_id]
      );
      return this.getReviewById(result.insertId);
    } catch (error) {
      throw new Error("Error creating new review: " + error.message);
    }
  }

  static async updateExistingReview(id, rating, comment, product_id, user_id) {
    const updates = [];
    const values = [];

    if (rating) {
      updates.push("rating = ?");
      values.push(rating);
    }
    if (comment) {
      updates.push("comment = ?");
      values.push(comment);
    }
    if (product_id) {
      updates.push("product_id = ?");
      values.push(product_id);
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
        `UPDATE reviews SET ${updates.join(", ")} WHERE review_id = ?`,
        values
      );
      return this.getReviewById(id);
    } catch (error) {
      throw new Error("Error updating review: " + error.message);
    }
  }

  static async deleteExistingReview(id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM reviews WHERE review_id = ?",
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("Error deleting review: " + error.message);
    }
  }
}

export default ReviewModel;
