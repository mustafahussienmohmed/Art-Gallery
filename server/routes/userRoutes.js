import express from "express";
import UserController from "../controllers/UserController.js";
import {
  createUserValidation,
  updateUserValidation,
} from "../middlewares/userValidator.js";

const router = express.Router();

router.get("/users", UserController.getUsers);
router.get("/users/:id", UserController.getUser);
router.post("/users", createUserValidation, UserController.createUser);
router.patch("/users/:id", updateUserValidation, UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

export default router;
