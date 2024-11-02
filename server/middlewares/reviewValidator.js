import { check } from "express-validator";
import ProductModel from "../models/ProductModel.js";
import UserModel from "../models/UserModel.js";

const checkProductExists = async (product_id) => {
  const product = await ProductModel.getProductById(product_id);
  if (!product) {
    throw new Error("Invalid product ID");
  }
};

const checkUserExists = async (user_id) => {
  const user = await UserModel.getUserById(user_id);
  if (!user) {
    throw new Error("Invalid user ID");
  }
};

export const createReviewValidation = [
  check("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .bail()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5"),

  check("comment")
    .notEmpty()
    .withMessage("Comment is required")
    .bail()
    .isLength({ min: 10 })
    .withMessage("Comment must be at least 10 characters long"),

  check("product_id")
    .notEmpty()
    .withMessage("Product ID is required")
    .bail()
    .isInt()
    .withMessage("Product ID must be a valid integer")
    .bail()
    .custom(async (product_id) => {
      await checkProductExists(product_id);
    }),

  check("user_id")
    .notEmpty()
    .withMessage("User ID is required")
    .bail()
    .isInt()
    .withMessage("User ID must be a valid integer")
    .bail()
    .custom(async (user_id) => {
      await checkUserExists(user_id);
    }),
];

export const updateReviewValidation = [
  check("rating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5"),

  check("comment")
    .optional()
    .isLength({ min: 10 })
    .withMessage("Comment must be at least 10 characters long"),

  check("product_id")
    .optional()
    .isInt()
    .withMessage("Product ID must be a valid integer")
    .bail()
    .custom(async (product_id) => {
      if (product_id) {
        await checkProductExists(product_id);
      }
    }),

  check("user_id")
    .optional()
    .isInt()
    .withMessage("User ID must be a valid integer")
    .bail()
    .custom(async (user_id) => {
      if (user_id) {
        await checkUserExists(user_id);
      }
    }),
];
