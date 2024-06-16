import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

// signUp
router.post("/auth/signup", userController.signUp);

// Login
router.post("/auth/login", userController.login);

// Get Profile
router.get("/users/me", userController.getProfile);

// Update Profile
router.put("/users/me", userController.updateProfile);

export const UserRoutes = router;
