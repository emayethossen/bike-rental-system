import express from "express";
import { bikeController } from "./bike.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminMiddleware } from "../../middlewares/admin.middleware";

const router = express.Router();

// Create a bike
router.post(
  "/bikes",
  authMiddleware,
  adminMiddleware,
  bikeController.createBike,
);

// Get all bikes
router.get("/bikes", bikeController.getAllBikes);

// Get a single bike by ID
router.get("/bikes/:id", bikeController.getBikeById);

// Update a bike
router.put(
  "/bikes/:id",
  authMiddleware,
  adminMiddleware,
  bikeController.updateBike,
);

// Delete a bike
router.delete(
  "/bikes/:id",
  authMiddleware,
  adminMiddleware,
  bikeController.deleteBike,
);

// Update bike availability
router.patch(
  "/bikes/:id/availability",
  authMiddleware, // Require authentication
  // adminMiddleware, // Require admin access
  bikeController.updateBikeAvailability, // Controller method for updating availability
);

export const BikeRoutes = router;
