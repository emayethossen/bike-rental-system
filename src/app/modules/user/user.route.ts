import express from "express";
import { userController } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = express.Router();

// signUp
router.post("/auth/signup", userController.signUp);

// Login
router.post("/auth/login", userController.login);

// Get Profile
router.get("/users/me", authMiddleware, userController.getProfile);

// Update Profile
router.put("/users/me", authMiddleware, userController.updateProfile);

export const UserRoutes = router;
