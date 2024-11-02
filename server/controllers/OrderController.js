import { validationResult } from "express-validator";
import OrderModel from "../models/OrderModel.js";

class OrderController {
  static async getOrders(req, res, next) {
    try {
      const orders = await OrderModel.getAllOrders();
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }

  static async getOrder(req, res, next) {
    const { id } = req.params;
    try {
      const order = await OrderModel.getOrderById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      next(error);
    }
  }

  static async createOrder(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors
          .array()
          .map((error) => error.msg)
          .join(", "),
      });
    }

    const { total_amount, status = "Pending", user_id } = req.body;

    try {
      const order = await OrderModel.createNewOrder(
        total_amount,
        status,
        user_id
      );
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }

  static async updateOrder(req, res, next) {
    const { id } = req.params;

    try {
      const order = await OrderModel.getOrderById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
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

      const { total_amount, status, user_id } = req.body;

      const updatedOrder = await OrderModel.updateExistingOrder(
        id,
        total_amount,
        status,
        user_id
      );
      if (!updatedOrder) {
        return res.status(400).json({ message: "No fields to update" });
      }

      res.json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }

  static async deleteOrder(req, res, next) {
    const { id } = req.params;

    try {
      const order = await OrderModel.getOrderById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      const result = await OrderModel.deleteExistingOrder(id);
      if (!result) {
        return res.status(500).json({ message: "Failed to delete order" });
      }

      res.json({ message: "Order deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default OrderController;
