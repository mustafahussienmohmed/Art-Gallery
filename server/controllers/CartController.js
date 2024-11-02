import { validationResult } from "express-validator";
import CartModel from "../models/CartModel.js";

class CartController {
  static async getCarts(req, res, next) {
    try {
      const carts = await CartModel.getAllCarts();
      res.json(carts);
    } catch (error) {
      next(error);
    }
  }

  static async getCart(req, res, next) {
    const { id } = req.params;
    try {
      const cart = await CartModel.getCartById(id);
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      res.json(cart);
    } catch (error) {
      next(error);
    }
  }

  static async createCart(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors
          .array()
          .map((error) => error.msg)
          .join(", "),
      });
    }

    const { quantity = 1, user_id, product_id } = req.body;

    try {
      const cart = await CartModel.createNewCart(quantity, user_id, product_id);
      res.status(201).json(cart);
    } catch (error) {
      next(error);
    }
  }

  static async updateCart(req, res, next) {
    const { id } = req.params;

    try {
      const cart = await CartModel.getCartById(id);
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
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

      const { quantity, user_id, product_id } = req.body;

      const updatedCart = await CartModel.updateExistingCart(
        id,
        quantity,
        user_id,
        product_id
      );
      if (!updatedCart) {
        return res.status(400).json({ message: "No fields to update" });
      }

      res.json(updatedCart);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCart(req, res, next) {
    const { id } = req.params;

    try {
      const cart = await CartModel.getCartById(id);
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      const result = await CartModel.deleteExistingCart(id);
      if (!result) {
        return res.status(500).json({ message: "Failed to delete cart" });
      }

      res.json({ message: "Cart deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default CartController;
