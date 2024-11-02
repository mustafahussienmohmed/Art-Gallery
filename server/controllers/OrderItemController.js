import { validationResult } from "express-validator";
import OrderItemModel from "../models/OrderItemModel.js";

class OrderItemController {
  static async getOrderItems(req, res, next) {
    try {
      const orderItems = await OrderItemModel.getAllOrderItems();
      res.json(orderItems);
    } catch (error) {
      next(error);
    }
  }

  static async getOrderItem(req, res, next) {
    const { id } = req.params;
    try {
      const orderItem = await OrderItemModel.getOrderItemById(id);
      if (!orderItem) {
        return res.status(404).json({ message: "Order item not found" });
      }
      res.json(orderItem);
    } catch (error) {
      next(error);
    }
  }

  static async createOrderItem(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors
          .array()
          .map((error) => error.msg)
          .join(", "),
      });
    }

    const { quantity = 1, order_id, product_id } = req.body;

    try {
      const orderItem = await OrderItemModel.createNewOrderItem(
        quantity,
        order_id,
        product_id
      );
      res.status(201).json(orderItem);
    } catch (error) {
      next(error);
    }
  }

  static async updateOrderItem(req, res, next) {
    const { id } = req.params;

    try {
      const orderItem = await OrderItemModel.getOrderItemById(id);
      if (!orderItem) {
        return res.status(404).json({ message: "Order item not found" });
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

      const { quantity, order_id, product_id } = req.body;

      const updatedOrderItem = await OrderItemModel.updateExistingOrderItem(
        id,
        quantity,
        order_id,
        product_id
      );
      if (!updatedOrderItem) {
        return res.status(400).json({ message: "No fields to update" });
      }

      res.json(updatedOrderItem);
    } catch (error) {
      next(error);
    }
  }

  static async deleteOrderItem(req, res, next) {
    const { id } = req.params;

    try {
      const orderItem = await OrderItemModel.getOrderItemById(id);
      if (!orderItem) {
        return res.status(404).json({ message: "Order item not found" });
      }

      const result = await OrderItemModel.deleteExistingOrderItem(id);
      if (!result) {
        return res.status(500).json({ message: "Failed to delete order item" });
      }

      res.json({ message: "Order item deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default OrderItemController;
