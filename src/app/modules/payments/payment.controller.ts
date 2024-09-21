import { Request, Response } from 'express';
import { paymentValidation } from './payment.validation';
import { PaymentService } from './payment.service';
import { Rental } from '../rentals/rentals.model';
import { Bike } from '../bike/bike.model';

export class PaymentController {
  // Initiates a payment request
  static async initiatePayment(req: Request, res: Response) {
    const validationResult = paymentValidation(req.body);

    // If validation fails, return error message
    if (!validationResult.success) {
      return res.status(400).json({ error: validationResult.error.errors[0].message });
    }

    try {
      const paymentUrl = await PaymentService.initiatePayment(req.body);
      return res.status(200).json(paymentUrl);
    } catch (err) {
      console.error('Payment initiation error:', err);
      return res.status(500).json({ error: 'Payment initiation failed' });
    }
  }

  // Handles the payment success callback from SSLCOMMERZ
  static async handleSuccess(req: Request, res: Response) {
    try {
      // Extract data sent from SSLCOMMERZ
      const { value_a: userId, value_b: bikeId, value_c: startTime, amount, status } = req.body;

      // Check for the required fields and validate payment status
      if (!userId || !bikeId || !startTime || status !== 'VALID') {
        return res.status(400).json({ error: 'Missing required booking information or invalid payment status.' });
      }

      // Convert startTime to a valid Date object
      const startTimeDate = new Date(startTime);
      if (isNaN(startTimeDate.getTime())) {
        return res.status(400).json({ error: 'Invalid start time value' });
      }

      // Check if the bike exists and is available
      const bike = await Bike.findById(bikeId);
      if (!bike) {
        return res.status(404).json({ error: `Bike with ID ${bikeId} not found.` });
      }

      if (!bike.isAvailable) {
        return res.status(400).json({ error: 'Bike is already rented out.' });
      }

      // Create the rental in the database
      const newRental = await Rental.create({
        userId,
        bikeId,
        startTime: startTimeDate.toISOString(),
        paymentStatus: 'Unpaid',
        isReturned: false,
        amountPaid: amount,
      });

      // Update the bike availability to false
      bike.isAvailable = false;
      await bike.save();

      // Send a successful response
      return res.status(200).json({
        message: 'Rental successfully created!',
        rental: newRental,
      });
    } catch (error) {
      console.error('Error during rental creation:', error);
      return res.status(500).json({ error: 'Failed to create rental.' });
    }
  }
}
