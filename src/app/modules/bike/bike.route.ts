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

export const BikeRoutes = router;
