import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import logger from "../utils/logger.js";
import bcryptjs from "bcryptjs";
import { getJsonUsers, saveJsonUsers } from "../config/database.js";
import mongoose from "mongoose";
import crypto from "crypto";
import { sendPasswordResetEmail } from "../services/emailService.js";


const router = express.Router();
let useJsonDb = false;

// Check if MongoDB is connected
const isMongoConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Hash password helper
const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

// Compare password helper
const comparePassword = async (password, hash) => {
  return await bcryptjs.compare(password, hash);
};

/**
 * Register a new user
 * POST /api/auth/register
 */
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "error",
        message: "Passwords do not match",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: "error",
        message: "Password must be at least 6 characters long",
      });
    }

    const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret_key_here_change_in_production_12345";

    if (isMongoConnected()) {
      // MongoDB path
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(409).json({
          status: "error",
          message: "Email already registered",
        });
      }

      const user = new User({
        fullName: fullName.trim(),
        email: email.toLowerCase(),
        password,
      });

      await user.save();

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        jwtSecret,
        { expiresIn: "7d" }
      );

      logger.info(`New user registered: ${user.email}`);

      res.status(201).json({
        status: "success",
        message: "User registered successfully",
        token,
        user: user.getPublicData(),
      });
    } else {
      // JSON file path
      const users = getJsonUsers();
      
      if (users.some((u) => u.email === email.toLowerCase())) {
        return res.status(409).json({
          status: "error",
          message: "Email already registered",
        });
      }

      const hashedPassword = await hashPassword(password);
      const newUser = {
        id: Date.now().toString(),
        fullName: fullName.trim(),
        email: email.toLowerCase(),
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      saveJsonUsers(users);

      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        jwtSecret,
        { expiresIn: "7d" }
      );

      logger.info(`New user registered (JSON): ${newUser.email}`);

      res.status(201).json({
        status: "success",
        message: "User registered successfully",
        token,
        user: {
          id: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          createdAt: newUser.createdAt,
        },
      });
    }
  } catch (error) {
    logger.error("Registration error:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Registration failed",
    });
  }
});

/**
 * Login user
 * POST /api/auth/login
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email and password are required",
      });
    }

    const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret_key_here_change_in_production_12345";

    if (isMongoConnected()) {
      // MongoDB path
      const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

      if (!user) {
        return res.status(401).json({
          status: "error",
          message: "Invalid email or password",
        });
      }

      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        return res.status(401).json({
          status: "error",
          message: "Invalid email or password",
        });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        jwtSecret,
        { expiresIn: "7d" }
      );

      logger.info(`User logged in: ${user.email}`);

      res.json({
        status: "success",
        message: "Login successful",
        token,
        user: user.getPublicData(),
      });
    } else {
      // JSON file path
      const users = getJsonUsers();
      const user = users.find((u) => u.email === email.toLowerCase());

      if (!user) {
        return res.status(401).json({
          status: "error",
          message: "Invalid email or password",
        });
      }

      const isPasswordMatch = await comparePassword(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({
          status: "error",
          message: "Invalid email or password",
        });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        jwtSecret,
        { expiresIn: "7d" }
      );

      logger.info(`User logged in (JSON): ${user.email}`);

      res.json({
        status: "success",
        message: "Login successful",
        token,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    }
  } catch (error) {
    logger.error("Login error:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Login failed",
    });
  }
});

/**
 * Get current user (requires auth token)
 * GET /api/auth/me
 */
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "No token provided",
      });
    }

    const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret_key_here_change_in_production_12345";
    const decoded = jwt.verify(token, jwtSecret);

    if (isMongoConnected()) {
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }

      res.json({
        status: "success",
        user: user.getPublicData(),
      });
    } else {
      const users = getJsonUsers();
      const user = users.find((u) => u.id === decoded.userId);

      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }

      res.json({
        status: "success",
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    }
  } catch (error) {
    logger.error("Get user error:", error);
    res.status(401).json({
      status: "error",
      message: "Invalid or expired token",
    });
  }
});

/**
 * Forgot password - send reset email
 * POST /api/auth/forgot-password
 */
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({
        status: "error",
        message: "Email is required",
      });
    }

    if (isMongoConnected()) {
      // MongoDB path
      const user = await User.findOne({ email: email.toLowerCase() });

      if (!user) {
        // Don't reveal if email exists or not for security
        return res.json({
          status: "success",
          message: "If an account with that email exists, a password reset link has been sent.",
        });
      }

      // Generate a reset token
      const resetToken = crypto.randomBytes(20).toString("hex");
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      await user.save();

      // Send email
      await sendPasswordResetEmail(user.email, resetToken, user.fullName);

      logger.info(`Password reset requested for: ${email}`);

      res.json({
        status: "success",
        message: "If an account with that email exists, a password reset link has been sent.",
      });
    } else {
      // JSON file path fallback
      const users = getJsonUsers();
      const userIndex = users.findIndex((u) => u.email === email.toLowerCase());

      if (userIndex === -1) {
        return res.json({
          status: "success",
          message: "If an account with that email exists, a password reset link has been sent.",
        });
      }

      const resetToken = crypto.randomBytes(20).toString("hex");
      users[userIndex].resetPasswordToken = resetToken;
      users[userIndex].resetPasswordExpires = Date.now() + 3600000; // 1 hour

      saveJsonUsers(users);

      // In JSON mode, we still try to send the email if credentials are set
      try {
        await sendPasswordResetEmail(users[userIndex].email, resetToken, users[userIndex].fullName);
      } catch (error) {
        logger.error("Failed to send reset email in JSON mode:", error);
      }

      logger.info(`Password reset requested for (JSON): ${email}`);

      res.json({
        status: "success",
        message: "If an account with that email exists, a password reset link has been sent.",
      });
    }
  } catch (error) {
    logger.error("Forgot password error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to process request",
    });
  }
});

/**
 * Reset password
 * POST /api/auth/reset-password/:token
 */
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "error",
        message: "Passwords do not match",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: "error",
        message: "Password must be at least 6 characters long",
      });
    }

    if (isMongoConnected()) {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({
          status: "error",
          message: "Password reset token is invalid or has expired",
        });
      }

      // Set the new password
      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      logger.info(`Password reset success for: ${user.email}`);

      res.json({
        status: "success",
        message: "Password has been reset successfully",
      });
    } else {
      // JSON file path fallback
      const users = getJsonUsers();
      const userIndex = users.findIndex(
        (u) =>
          u.resetPasswordToken === token &&
          u.resetPasswordExpires > Date.now()
      );

      if (userIndex === -1) {
        return res.status(400).json({
          status: "error",
          message: "Password reset token is invalid or has expired",
        });
      }

      const hashedPassword = await hashPassword(password);
      users[userIndex].password = hashedPassword;
      users[userIndex].resetPasswordToken = undefined;
      users[userIndex].resetPasswordExpires = undefined;

      saveJsonUsers(users);

      logger.info(`Password reset success for (JSON): ${users[userIndex].email}`);

      res.json({
        status: "success",
        message: "Password has been reset successfully",
      });
    }
  } catch (error) {
    logger.error("Reset password error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to reset password",
    });
  }
});

/**
 * Update user profile
 * PUT /api/auth/profile
 */
router.put("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ status: "error", message: "Unauthorized" });

    const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret_key_here_change_in_production_12345";
    const decoded = jwt.verify(token, jwtSecret);
    const { fullName } = req.body;

    if (!fullName) {
      return res.status(400).json({ status: "error", message: "Full name is required" });
    }

    if (isMongoConnected()) {
      const user = await User.findById(decoded.userId);
      if (!user) return res.status(404).json({ status: "error", message: "User not found" });

      user.fullName = fullName.trim();
      await user.save();

      res.json({
        status: "success",
        message: "Profile updated successfully",
        user: user.getPublicData(),
      });
    } else {
      const users = getJsonUsers();
      const userIndex = users.findIndex((u) => u.id === decoded.userId);
      if (userIndex === -1) return res.status(404).json({ status: "error", message: "User not found" });

      users[userIndex].fullName = fullName.trim();
      saveJsonUsers(users);

      res.json({
        status: "success",
        message: "Profile updated successfully",
        user: {
          id: users[userIndex].id,
          fullName: users[userIndex].fullName,
          email: users[userIndex].email,
        },
      });
    }
  } catch (error) {
    logger.error("Profile update error:", error);
    res.status(500).json({ status: "error", message: "Failed to update profile" });
  }
});

/**
 * Change user password
 * PUT /api/auth/change-password
 */
router.put("/change-password", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ status: "error", message: "Unauthorized" });

    const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret_key_here_change_in_production_12345";
    const decoded = jwt.verify(token, jwtSecret);
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ status: "error", message: "All fields are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ status: "error", message: "New password must be at least 6 characters" });
    }

    if (isMongoConnected()) {
      const user = await User.findById(decoded.userId).select("+password");
      if (!user) return res.status(404).json({ status: "error", message: "User not found" });

      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ status: "error", message: "Incorrect current password" });
      }

      user.password = newPassword;
      await user.save();

      res.json({ status: "success", message: "Password changed successfully" });
    } else {
      const users = getJsonUsers();
      const userIndex = users.findIndex((u) => u.id === decoded.userId);
      if (userIndex === -1) return res.status(404).json({ status: "error", message: "User not found" });

      const isMatch = await comparePassword(currentPassword, users[userIndex].password);
      if (!isMatch) {
        return res.status(400).json({ status: "error", message: "Incorrect current password" });
      }

      users[userIndex].password = await hashPassword(newPassword);
      saveJsonUsers(users);

      res.json({ status: "success", message: "Password changed successfully" });
    }
  } catch (error) {
    logger.error("Change password error:", error);
    res.status(500).json({ status: "error", message: "Failed to change password" });
  }
});

/**
 * Delete user account
 * DELETE /api/auth/me
 */
router.delete("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ status: "error", message: "Unauthorized" });

    const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret_key_here_change_in_production_12345";
    const decoded = jwt.verify(token, jwtSecret);

    if (isMongoConnected()) {
      const user = await User.findByIdAndDelete(decoded.userId);
      if (!user) return res.status(404).json({ status: "error", message: "User not found" });

      logger.info(`User account deleted: ${user.email}`);

      res.json({
        status: "success",
        message: "Account deleted permanently",
      });
    } else {
      const users = getJsonUsers();
      const userIndex = users.findIndex((u) => u.id === decoded.userId);
      if (userIndex === -1) return res.status(404).json({ status: "error", message: "User not found" });

      const deletedEmail = users[userIndex].email;
      users.splice(userIndex, 1);
      saveJsonUsers(users);

      logger.info(`User account deleted (JSON): ${deletedEmail}`);

      res.json({
        status: "success",
        message: "Account deleted permanently",
      });
    }
  } catch (error) {
    logger.error("Account deletion error:", error);
    res.status(500).json({ 
      status: "error", 
      message: "Failed to delete account",
      error: error.message 
    });
  }
});



export default router;


