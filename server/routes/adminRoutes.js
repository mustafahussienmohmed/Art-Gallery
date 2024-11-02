import express from "express";
import AdminController from "../controllers/AdminController.js";
import {
  createUserValidation,
  updateUserValidation,
} from "../middlewares/userValidator.js";

const router = express.Router();

router.get("/admins", AdminController.getAdmins);
router.get("/admins/:id", AdminController.getAdmin);
router.post("/admins", createUserValidation, AdminController.createAdmin);
router.patch("/admins/:id", updateUserValidation, AdminController.updateAdmin);
router.delete("/admins/:id", AdminController.deleteAdmin);

export default router;
