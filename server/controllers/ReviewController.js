import { validationResult } from "express-validator";
import ReviewModel from "../models/ReviewModel.js";

class ReviewController {
  static async getReviews(req, res, next) {
    try {
      const reviews = await ReviewModel.getAllReviews();
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  }

  static async getReview(req, res, next) {
    const { id } = req.params;
    try {
      const review = await ReviewModel.getReviewById(id);
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
      res.json(review);
    } catch (error) {
      next(error);
    }
  }

  static async createReview(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors
          .array()
          .map((error) => error.msg)
          .join(", "),
      });
    }

    const { rating, comment, product_id, user_id } = req.body;

    try {
      const review = await ReviewModel.createNewReview(
        rating,
        comment,
        product_id,
        user_id
      );
      res.status(201).json(review);
    } catch (error) {
      next(error);
    }
  }

  static async updateReview(req, res, next) {
    const { id } = req.params;

    try {
      const review = await ReviewModel.getReviewById(id);
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors
            .array()
            .map((error) => error.msg)
            .join(", "),
        });
      }

      const { rating, comment, product_id, user_id } = req.body;

      const updatedReview = await ReviewModel.updateExistingReview(
        id,
        rating,
        comment,
        product_id,
        user_id
      );
      if (!updatedReview) {
        return res.status(400).json({ message: "No fields to update" });
      }

      res.json(updatedReview);
    } catch (error) {
      next(error);
    }
  }

  static async deleteReview(req, res, next) {
    const { id } = req.params;

    try {
      const review = await ReviewModel.getReviewById(id);
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }

      const result = await ReviewModel.deleteExistingReview(id);
      if (!result) {
        return res.status(500).json({ message: "Failed to delete review" });
      }

      res.json({ message: "Review deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default ReviewController;
