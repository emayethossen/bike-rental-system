import express from "express";
import { userController } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminMiddleware } from "../../middlewares/admin.middleware";

const router = express.Router();

// signUp
router.post("/auth/signup", userController.signUp);

// Login
router.post("/auth/login", userController.login);

// Get Profile
router.get("/users/me", authMiddleware, userController.getProfile);

// Update Profile
router.put("/users/me", authMiddleware, userController.updateProfile);

// Admin-Specific Routes

// Get all users (Admin only)
router.get(
  "/admin/users",
  authMiddleware,
  adminMiddleware,
  userController.getAllUsers,
);

// Promote a user to admin (Admin only)
router.post(
  "/admin/users/:id/promote",
  authMiddleware,
  adminMiddleware,
  userController.promoteUserToAdmin,
);

// Delete a user (Admin only)
router.delete(
  "/admin/users/:id",
  authMiddleware,
  adminMiddleware,
  userController.deleteUser,
);

export const UserRoutes = router;
