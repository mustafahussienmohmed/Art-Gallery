import { check } from "express-validator";
import CategoryModel from "../models/CategoryModel.js";

const checkCategoryExists = async (category_name) => {
  const categoryExists = await CategoryModel.categoryExists(category_name);
  if (categoryExists) {
    throw new Error("Category name already exists");
  }
};

export const createCategoryValidation = [
  check("category_name")
    .notEmpty()
    .withMessage("Category name is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Category name must be at least 3 characters long")
    .bail()
    .custom(async (category_name) => {
      await checkCategoryExists(category_name);
    }),
];

export const updateCategoryValidation = [
  check("category_name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Category name must be at least 3 characters long")
    .bail()
    .custom(async (category_name, { req }) => {
      const category = await CategoryModel.getCategoryById(req.params.id);
      if (category && category.category_name !== category_name) {
        await checkCategoryExists(category_name);
      }
    }),
];
