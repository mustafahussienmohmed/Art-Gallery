import express from "express";
import ProductController from "../controllers/ProductController.js";
import { uploadImage } from "../middlewares/uploadImage.js";
import {
  createProductValidation,
  updateProductValidation,
} from "../middlewares/productValidator.js";

const router = express.Router();

router.get("/products", ProductController.getProducts);
router.get("/products/:id", ProductController.getProduct);
router.post(
  "/products",
  uploadImage,
  createProductValidation,
  ProductController.createProduct
);
router.patch(
  "/products/:id",
  uploadImage,
  updateProductValidation,
  ProductController.updateProduct
);
router.delete("/products/:id", ProductController.deleteProduct);

export default router;
