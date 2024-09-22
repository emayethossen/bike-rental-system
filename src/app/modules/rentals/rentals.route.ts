import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { rentalController } from "./rentals.controller";
import { adminMiddleware } from "../../middlewares/admin.middleware";

const router = express.Router();

router.post("/rentals", authMiddleware, rentalController.createRental);

router.put(
  "/rentals/:id/return",
  authMiddleware,
  adminMiddleware,
  rentalController.returnRental,
);

router.get("/rentals", authMiddleware, rentalController.getRentalsByUser);

// In rental routes
router.get(
  "/admin/rentals",
  authMiddleware,
  adminMiddleware,
  rentalController.getAllRentalsForAdmin,
);

export const RentalRoutes = router;
