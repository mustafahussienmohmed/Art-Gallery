import express from "express";
import CartController from "../controllers/CartController.js";
import {
  createCartValidation,
  updateCartValidation,
} from "../middlewares/cartValidator.js";

const router = express.Router();

router.get("/carts", CartController.getCarts);
router.get("/carts/:id", CartController.getCart);
router.post("/carts", createCartValidation, CartController.createCart);
router.patch("/carts/:id", updateCartValidation, CartController.updateCart);
router.delete("/carts/:id", CartController.deleteCart);

export default router;
