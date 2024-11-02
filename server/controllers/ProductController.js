import { promises as fs } from "fs";
import { validationResult } from "express-validator";
import ProductModel from "../models/ProductModel.js";

class ProductController {
  static async handleImageDeletion(image) {
    if (image) {
      const imagePath = `../client/public/images/${image.filename}`;
      try {
        await fs.unlink(imagePath);
      } catch (err) {
        console.error("Error deleting image:", err);
      }
    }
  }

  static async handleOldImageDeletion(image) {
    if (
      image &&
      !image.startsWith("http://") &&
      !image.startsWith("https://")
    ) {
      try {
        await fs.unlink(`../client/public/images/${image}`);
      } catch (err) {
        console.error("Error deleting old product image:", err);
      }
    }
  }

  static async getProducts(req, res, next) {
    try {
      const products = await ProductModel.getAllProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  static async getProduct(req, res, next) {
    const { id } = req.params;
    try {
      const product = await ProductModel.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  static async createProduct(req, res, next) {
    const errors = validationResult(req);
    const image = req.file;

    if (!errors.isEmpty()) {
      await ProductController.handleImageDeletion(image);
      return res.status(400).json({
        message: errors
          .array()
          .map((error) => error.msg)
          .join(", "),
      });
    }

    const { title, description, price, stock = 1, category_id } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    try {
      const product = await ProductModel.createNewProduct(
        title,
        description,
        price,
        stock,
        image.filename,
        category_id
      );
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    const { id } = req.params;

    try {
      const product = await ProductModel.getProductById(id);
      if (!product) {
        await ProductController.handleImageDeletion(req.file);
        return res.status(404).json({ message: "Product not found" });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        await ProductController.handleImageDeletion(req.file);
        return res.status(400).json({
          message: errors
            .array()
            .map((error) => error.msg)
            .join(", "),
        });
      }

      const { title, description, price, stock, category_id } = req.body;
      const image = req.file ? req.file.filename : null;

      if (image) {
        await ProductController.handleOldImageDeletion(product.image);
      }

      const updatedProduct = await ProductModel.updateExistingProduct(
        id,
        title,
        description,
        price,
        stock,
        image,
        category_id
      );
      if (!updatedProduct) {
        return res.status(400).json({ message: "No fields to update" });
      }

      res.json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    const { id } = req.params;

    try {
      const product = await ProductModel.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      await ProductController.handleOldImageDeletion(product.image);

      const result = await ProductModel.deleteExistingProduct(id);
      if (!result) {
        return res.status(500).json({ message: "Failed to delete product" });
      }

      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
