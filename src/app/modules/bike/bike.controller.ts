import { Request, Response } from "express";
import { BikeServices } from "./bike.service";
import { bikeValidation } from "./bike.validation";
import { TBike } from "./bike.interface";
import { Bike } from "./bike.model";

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

  getBikeById: async (req: Request, res: Response) => { // <-- New method for getting bike by ID
    try {
      const bikeId = req.params.id;
      const result = await BikeServices.getBikeById(bikeId);

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Bike not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Bike details retrieved successfully",
        data: result,
      });
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

  // Update bike availability
  // updateBikeAvailability: async (req: Request, res: Response) => {
  //   const { id } = req.params;
  //   const { availability } = req.body;

  //   try {
  //     const updatedBike = await Bike.findByIdAndUpdate(
  //       id,
  //       { availability },
  //       { new: true }
  //     );

  //     if (!updatedBike) {
  //       return res.status(404).json({ error: "Bike not found" });
  //     }

  //     res.status(200).json({
  //       message: "Bike availability updated successfully",
  //       data: updatedBike,
  //     });
  //   } catch (error) {
  //     console.error("Error updating bike availability:", error);
  //     res.status(500).json({ error: "An error occurred while updating bike availability" });
  //   }
  // },

  updateBikeAvailability: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { isAvailable } = req.body; // Get isAvailable from the request body

    try {
      const bike = await Bike.findById(id); // Find the bike by ID
      if (!bike) {
        return res.status(404).json({ message: 'Bike not found' });
      }

      // Update the isAvailable field
      bike.isAvailable = isAvailable;
      await bike.save(); // Save the changes to the database

      res.status(200).json({ message: 'Bike availability updated successfully', bike });
    } catch (error) {
      console.error('Error updating bike availability:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

};
