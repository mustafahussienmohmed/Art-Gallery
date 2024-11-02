import { check } from "express-validator";

export const loginValidation = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email address"),

  check("password").notEmpty().withMessage("Password is required"),
];

export const tokenValidation = [
  check("token").notEmpty().withMessage("Refresh token is required"),
];
