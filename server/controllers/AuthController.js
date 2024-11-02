import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import AuthModel from "../models/AuthModel.js";

class AuthController {
  static generateAccessToken(user) {
    const { user_id, is_admin } = user;
    return jwt.sign({ user_id, is_admin }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
  }

  static generateRefreshToken(user) {
    const { user_id } = user;
    return jwt.sign({ user_id }, process.env.REFRESH_TOKEN_SECRET);
  }

  static async login(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors
          .array()
          .map((error) => error.msg)
          .join(", "),
      });
    }

    const { email, password } = req.body;

    try {
      const user = await AuthModel.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const accessToken = AuthController.generateAccessToken(user);
      const refreshToken = AuthController.generateRefreshToken(user);

      await AuthModel.saveRefreshToken(refreshToken, user.user_id);

      res.json({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  }

  static async refreshToken(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors
          .array()
          .map((error) => error.msg)
          .join(", "),
      });
    }

    const refreshToken = req.body.token;

    try {
      const result = await AuthModel.getRefreshToken(refreshToken);
      if (!result) {
        return res
          .status(403)
          .json({ message: "Invalid or expired refresh token" });
      }

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, user) => {
          if (error) {
            return res
              .status(403)
              .json({ message: "Invalid or expired refresh token" });
          }

          const accessToken = AuthController.generateAccessToken(user);
          res.json({ accessToken });
        }
      );
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors
          .array()
          .map((error) => error.msg)
          .join(", "),
      });
    }

    const refreshToken = req.body.token;

    try {
      const token = await AuthModel.getRefreshToken(refreshToken);
      if (!token) {
        return res.status(404).json({ message: "Refresh token not found" });
      }

      const result = await AuthModel.deleteRefreshToken(refreshToken);
      if (!result) {
        return res.status(500).json({ message: "Failed to delete token" });
      }

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
