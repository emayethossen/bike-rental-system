import { Request, Response } from "express";
import { BikeServices } from "./bike.service";
import { bikeValidation } from "./bike.validation";
import { TBike } from "./bike.interface";

export const bikeController = {
  createBike: async (req: Request, res: Response) => {
    try {
      const bikeData = bikeValidation.bikeValidationSchema.parse(req.body);
      const result = await BikeServices.createBike(bikeData);

      res.status(201).json({
        success: true,
        message: "Bike added successfully",
        data: result,
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

  getAllBikes: async (req: Request, res: Response) => {
    try {
      const result = await BikeServices.getAllBikes();
      res.status(200).json({
        success: true,
        message: "Bikes retrieved successfully",
        data: result,
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

  updateBike: async (req: Request, res: Response) => {
    try {
      const bikeId = req.params.id;
      const updateData = req.body as Partial<TBike>;

      const result = await BikeServices.updateBike(bikeId, updateData);

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Bike not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Bike updated successfully",
        data: result,
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

  deleteBike: async (req: Request, res: Response) => {
    try {
      const bikeId = req.params.id;

      const result = await BikeServices.deleteBike(bikeId);

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Bike not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Bike deleted successfully",
        data: result,
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
