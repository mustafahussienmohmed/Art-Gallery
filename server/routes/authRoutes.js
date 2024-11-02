import express from "express";
import AuthController from "../controllers/AuthController.js";
import {
  loginValidation,
  tokenValidation,
} from "../middlewares/authValidator.js";

const router = express.Router();

router.post("/login", loginValidation, AuthController.login);
router.post("/token", tokenValidation, AuthController.refreshToken);
router.delete("/logout", tokenValidation, AuthController.logout);

export default router;
