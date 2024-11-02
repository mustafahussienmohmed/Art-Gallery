import express from "express";
import CategoryController from "../controllers/CategoryController.js";
import {
  createCategoryValidation,
  updateCategoryValidation,
} from "../middlewares/categoryValidator.js";

const router = express.Router();

router.get("/categories", CategoryController.getCategories);
router.get("/categories/:id", CategoryController.getCategory);
router.post(
  "/categories",
  createCategoryValidation,
  CategoryController.createCategory
);
router.patch(
  "/categories/:id",
  updateCategoryValidation,
  CategoryController.updateCategory
);
router.delete("/categories/:id", CategoryController.deleteCategory);

export default router;
