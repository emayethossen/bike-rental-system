import { Request, Response } from "express";
import { rentalValidation } from "./rentals.validation";
import { RentalService } from "./rentals.service";
import { Bike } from "../bike/bike.model";

export const rentalController = {
  createRental: async (req: Request, res: Response) => {
    try {
      console.log('Request Body:', req.body);  // Log request body
  
      const userId = req.user?._id;
      if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
  
      // Log the received startTime from the frontend
      console.log('Received startTime:', req.body.startTime);
  
      const { bikeId, startTime } = rentalValidation.rentalValidationSchema.parse({
        ...req.body,
        startTime: req.body.startTime || new Date().toISOString(),
      });
  
      // Log the converted startTime
      const startTimeDate = new Date(startTime);
      console.log('Converted startTime:', startTimeDate);
  
      if (isNaN(startTimeDate.getTime())) {
        console.log('Invalid startTime:', startTime);
        return res.status(400).json({ success: false, message: "Invalid start time value" });
      }
  
      const paymentStatus = 'Unpaid';
  
      const rental = await RentalService.createRental(
        userId,
        bikeId,
        startTimeDate,
        paymentStatus
      );
  
      res.status(201).json({
        success: true,
        statusCode: 201,
        message: "Rental created successfully",
        data: rental,
      });
    } catch (err: any) {
      console.error('Error creating rental:', err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errorMessages: [{ path: "", message: err.message }],
      });
    }
  },
  

  confirmPayment: async (req: Request, res: Response) => {
    try {
      const { transactionid, rentalId } = req.query;

      if (!transactionid || !rentalId) {
        return res.status(400).json({ success: false, message: "Missing parameters" });
      }

      const rental = await RentalService.findById(rentalId as string);
      if (!rental) {
        return res.status(404).json({ success: false, message: "Rental not found" });
      }

      await RentalService.updatePaymentStatus(rentalId as string, 'Paid');

      res.status(200).json({
        success: true,
        message: "Payment confirmed successfully",
      });
    } catch (err: any) {
      console.error('Error confirming payment:', err);
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
    } catch (err: any) {
      console.error('Error returning rental:', err);
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
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      const rentals = await RentalService.getRentalsByUser(userId);

      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Rentals retrieved successfully",
        data: rentals,
      });
    } catch (err: any) {
      console.error('Error retrieving rentals:', err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errorMessages: [{ path: "", message: err.message }],
      });
    }
  },

  // confirmPayment: async (req: Request, res: Response) => {
  //   try {
  //     const { transactionid, rentalId } = req.query;

  //     // Ensure both transaction ID and rental ID are present
  //     if (!transactionid || !rentalId) {
  //       return res.status(400).json({ success: false, message: "Missing parameters" });
  //     }

  //     // Find the rental by rental ID
  //     const rental = await RentalService.findById(rentalId as string);
  //     if (!rental) {
  //       return res.status(404).json({ success: false, message: "Rental not found" });
  //     }

  //     // Confirm that payment is successfully completed
  //     // Update payment status in the rental to "Paid"
  //     await RentalService.updatePaymentStatus(rentalId as string, 'Paid');

  //     res.status(200).json({
  //       success: true,
  //       message: "Payment confirmed successfully",
  //     });
  //   } catch (err: any) {
  //     console.error('Error confirming payment:', err);
  //     res.status(500).json({
  //       success: false,
  //       message: "Internal Server Error",
  //       errorMessages: [{ path: "", message: err.message }],
  //     });
  //   }
  // },
};
