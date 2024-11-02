import { validationResult } from "express-validator";
import AdminModel from "../models/AdminModel.js";

class AdminController {
  static async getAdmins(req, res, next) {
    try {
      const admins = await AdminModel.getAllAdmins();
      res.json(admins);
    } catch (error) {
      next(error);
    }
  }

  static async getAdmin(req, res, next) {
    const { id } = req.params;
    try {
      const admin = await AdminModel.getAdminById(id);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      res.json(admin);
    } catch (error) {
      next(error);
    }
  }

  static async createAdmin(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors
          .array()
          .map((error) => error.msg)
          .join(", "),
      });
    }

    const { name, email, password, address, phone_number, gender } = req.body;

    try {
      const admin = await AdminModel.createNewAdmin(
        name,
        email,
        password,
        address,
        phone_number,
        gender
      );
      res.status(201).json(admin);
    } catch (error) {
      next(error);
    }
  }

  static async updateAdmin(req, res, next) {
    const { id } = req.params;

    try {
      const admin = await AdminModel.getAdminById(id);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
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

      const { name, email, password, address, phone_number, gender } = req.body;

      const updatedAdmin = await AdminModel.updateExistingAdmin(
        id,
        name,
        email,
        password,
        address,
        phone_number,
        gender
      );
      if (!updatedAdmin) {
        return res.status(400).json({ message: "No fields to update" });
      }

      res.json(updatedAdmin);
    } catch (error) {
      next(error);
    }
  }

  static async deleteAdmin(req, res, next) {
    const { id } = req.params;

    try {
      const admin = await AdminModel.getAdminById(id);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      const result = await AdminModel.deleteExistingAdmin(id);
      if (!result) {
        return res.status(500).json({ message: "Failed to delete admin" });
      }

      res.json({ message: "Admin deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default AdminController;
