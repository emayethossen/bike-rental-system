import { Request, Response } from "express";
import { rentalValidation } from "./rentals.validation";
import { RentalService } from "./rentals.service";

export const rentalController = {
  createRental: async (req: Request, res: Response) => {
    try {
      const userId = req.user?._id;
      if (!userId) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      const { bikeId, startTime } =
        rentalValidation.rentalValidationSchema.parse(req.body);
      const rental = await RentalService.createRental(
        userId,
        bikeId,
        new Date(startTime),
      );

      res.status(201).json({
        success: true,
        statusCode: 200,
        message: "Rental created successfully",
        data: rental,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errorMessages: [{ path: "", message: err.message }],
      });
    }
  },

  returnRental: async (req: Request, res: Response) => {
    try {
      const rentalId = req.params.id;
      const rental = await RentalService.returnRental(rentalId);

      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Bike returned successfully",
        data: rental,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errorMessages: [{ path: "", message: err.message }],
      });
    }
  },

  getRentalsByUser: async (req: Request, res: Response) => {
    try {
      const userId = req.user?._id;
      if (!userId) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      const rentals = await RentalService.getRentalsByUser(userId);

      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Rentals retrieved successfully",
        data: rentals,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errorMessages: [{ path: "", message: err.message }],
      });
    }
  },
};
