import { check } from "express-validator";
import UserModel from "../models/UserModel.js";
import ProductModel from "../models/ProductModel.js";

const checkUserExists = async (user_id) => {
  const user = await UserModel.getUserById(user_id);
  if (!user) {
    throw new Error("Invalid user ID");
  }
};

const checkProductExists = async (product_id) => {
  const product = await ProductModel.getProductById(product_id);
  if (!product) {
    throw new Error("Invalid product ID");
  }
};

export const createCartValidation = [
  check("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer"),

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
];

export const updateCartValidation = [
  check("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer"),

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
];
