import express from "express";
import OrderController from "../controllers/OrderController.js";
import {
  createOrderValidation,
  updateOrderValidation,
} from "../middlewares/orderValidator.js";

const router = express.Router();

router.get("/orders", OrderController.getOrders);
router.get("/orders/:id", OrderController.getOrder);
router.post("/orders", createOrderValidation, OrderController.createOrder);
router.patch("/orders/:id", updateOrderValidation, OrderController.updateOrder);
router.delete("/orders/:id", OrderController.deleteOrder);

export default router;
