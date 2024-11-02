import { check } from "express-validator";
import OrderModel from "../models/OrderModel.js";
import ProductModel from "../models/ProductModel.js";

const checkOrderExists = async (order_id) => {
  const order = await OrderModel.getOrderById(order_id);
  if (!order) {
    throw new Error("Invalid order ID");
  }
};

const checkProductExists = async (product_id) => {
  const product = await ProductModel.getProductById(product_id);
  if (!product) {
    throw new Error("Invalid product ID");
  }
};

export const createOrderItemValidation = [
  check("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer"),

  check("order_id")
    .notEmpty()
    .withMessage("Order ID is required")
    .bail()
    .isInt()
    .withMessage("Order ID must be a valid integer")
    .bail()
    .custom(async (order_id) => {
      await checkOrderExists(order_id);
    }),

  check("product_id")
    .notEmpty()
    .withMessage("Product ID is required")
    .bail()
    .isInt()
    .withMessage("Product ID must be a valid integer")
    .bail()
    .custom(async (product_id) => {
      await checkProductExists(product_id);
    }),
];

export const updateOrderItemValidation = [
  check("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer"),

  check("order_id")
    .optional()
    .isInt()
    .withMessage("Order ID must be a valid integer")
    .bail()
    .custom(async (order_id) => {
      if (order_id) {
        await checkOrderExists(order_id);
      }
    }),

  check("product_id")
    .optional()
    .isInt()
    .withMessage("Product ID must be a valid integer")
    .bail()
    .custom(async (product_id) => {
      if (product_id) {
        await checkProductExists(product_id);
      }
    }),
];
