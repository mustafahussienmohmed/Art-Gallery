import { check } from "express-validator";
import UserModel from "../models/UserModel.js";

const checkUserExists = async (user_id) => {
  const user = await UserModel.getUserById(user_id);
  if (!user) {
    throw new Error("Invalid user ID");
  }
};

export const createOrderValidation = [
  check("total_amount")
    .notEmpty()
    .withMessage("Total amount is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("Total amount must be a positive number"),

  check("status")
    .optional()
    .isIn(["Pending", "Shipped", "Delivered", "Cancelled"])
    .withMessage(
      "Status must be one of: Pending, Shipped, Delivered, Cancelled"
    ),

  check("user_id")
    .notEmpty()
    .withMessage("User ID is required")
    .bail()
    .isInt()
    .withMessage("User ID must be a valid integer")
    .bail()
    .custom(async (user_id) => {
      await checkUserExists(user_id);
    }),
];

export const updateOrderValidation = [
  check("total_amount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Total amount must be a positive number"),

  check("status")
    .optional()
    .isIn(["Pending", "Shipped", "Delivered", "Cancelled"])
    .withMessage(
      "Status must be one of: Pending, Shipped, Delivered, Cancelled"
    ),

  check("user_id")
    .optional()
    .isInt()
    .withMessage("User ID must be a valid integer")
    .bail()
    .custom(async (user_id) => {
      if (user_id) {
        await checkUserExists(user_id);
      }
    }),
];
