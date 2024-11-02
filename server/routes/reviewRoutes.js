import express from "express";
import ReviewController from "../controllers/ReviewController.js";
import {
  createReviewValidation,
  updateReviewValidation,
} from "../middlewares/reviewValidator.js";

const router = express.Router();

router.get("/reviews", ReviewController.getReviews);
router.get("/reviews/:id", ReviewController.getReview);
router.post("/reviews", createReviewValidation, ReviewController.createReview);
router.patch(
  "/reviews/:id",
  updateReviewValidation,
  ReviewController.updateReview
);
router.delete("/reviews/:id", ReviewController.deleteReview);

export default router;
