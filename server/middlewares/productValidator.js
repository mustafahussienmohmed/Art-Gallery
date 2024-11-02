import { check } from "express-validator";
import CategoryModel from "../models/CategoryModel.js";

const checkCategoryExists = async (category_id) => {
  const category = await CategoryModel.getCategoryById(category_id);
  if (!category) {
    throw new Error("Invalid category ID");
  }
};

export const createProductValidation = [
  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

  check("description")
    .notEmpty()
    .withMessage("Description is required")
    .bail()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),

  check("price")
    .notEmpty()
    .withMessage("Price is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  check("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive integer"),

  check("category_id")
    .notEmpty()
    .withMessage("Category ID is required")
    .bail()
    .isInt()
    .withMessage("Category ID must be a valid integer")
    .bail()
    .custom(async (value) => {
      await checkCategoryExists(value);
    }),
];

export const updateProductValidation = [
  check("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

  check("description")
    .optional()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),

  check("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  check("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive integer"),

  check("category_id")
    .optional()
    .isInt()
    .withMessage("Category ID must be a valid integer")
    .bail()
    .custom(async (value) => {
      await checkCategoryExists(value);
    }),
];
