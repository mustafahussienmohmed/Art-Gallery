import { validationResult } from "express-validator";
import CategoryModel from "../models/CategoryModel.js";

class CategoryController {
  static async getCategories(req, res, next) {
    try {
      const categories = await CategoryModel.getAllCategories();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async getCategory(req, res, next) {
    const { id } = req.params;
    try {
      const category = await CategoryModel.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors
          .array()
          .map((error) => error.msg)
          .join(", "),
      });
    }

    const { category_name } = req.body;

    try {
      const category = await CategoryModel.createNewCategory(category_name);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req, res, next) {
    const { id } = req.params;

    try {
      const category = await CategoryModel.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
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

      const { category_name } = req.body;

      const updatedCategory = await CategoryModel.updateExistingCategory(
        id,
        category_name
      );
      if (!updatedCategory) {
        return res.status(400).json({ message: "No fields to update" });
      }

      res.json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    const { id } = req.params;

    try {
      const category = await CategoryModel.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      const result = await CategoryModel.deleteExistingCategory(id);
      if (!result) {
        return res.status(500).json({ message: "Failed to delete category" });
      }

      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default CategoryController;
