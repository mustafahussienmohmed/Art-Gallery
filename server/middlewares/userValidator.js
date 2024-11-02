import { check } from "express-validator";
import UserModel from "../models/UserModel.js";
import AdminModel from "../models/AdminModel.js";

const checkEmailExists = async (email) => {
  const emailExists = await UserModel.emailExists(email);
  if (emailExists) {
    throw new Error("Email already exists");
  }
};

export const createUserValidation = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .bail()
    .custom(async (email) => {
      await checkEmailExists(email);
    }),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  check("address")
    .notEmpty()
    .withMessage("Address is required")
    .bail()
    .isLength({ min: 10 })
    .withMessage("Address must be at least 10 characters long"),

  check("phone_number")
    .notEmpty()
    .withMessage("Phone number is required")
    .bail()
    .matches(/^\+?[0-9]\d{1,14}$/)
    .withMessage("Phone number must be in a valid format"),

  check("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .bail()
    .isIn(["Male", "Female"])
    .withMessage("Gender must be Male or Female"),
];

export const updateUserValidation = [
  check("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  check("email")
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .bail()
    .custom(async (email, { req }) => {
      const user = await UserModel.getUserById(req.params.id);
      const admin = await AdminModel.getAdminById(req.params.id);
      if ((user && user.email !== email) || (admin && admin.email !== email)) {
        await checkEmailExists(email);
      }
    }),

  check("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  check("address")
    .optional()
    .isLength({ min: 10 })
    .withMessage("Address must be at least 10 characters long"),

  check("phone_number")
    .optional()
    .matches(/^\+?[0-9]\d{1,14}$/)
    .withMessage("Phone number must be in a valid format"),

  check("gender")
    .optional()
    .isIn(["Male", "Female"])
    .withMessage("Gender must be Male or Female"),
];
