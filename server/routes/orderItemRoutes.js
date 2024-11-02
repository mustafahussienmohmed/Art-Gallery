import express from "express";
import OrderItemController from "../controllers/OrderItemController.js";
import {
  createOrderItemValidation,
  updateOrderItemValidation,
} from "../middlewares/orderItemValidator.js";

const router = express.Router();

router.get("/order-items", OrderItemController.getOrderItems);
router.get("/order-items/:id", OrderItemController.getOrderItem);
router.post(
  "/order-items",
  createOrderItemValidation,
  OrderItemController.createOrderItem
);
router.patch(
  "/order-items/:id",
  updateOrderItemValidation,
  OrderItemController.updateOrderItem
);
router.delete("/order-items/:id", OrderItemController.deleteOrderItem);

export default router;
