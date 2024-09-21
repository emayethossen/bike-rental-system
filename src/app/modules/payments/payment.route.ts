import { Router } from 'express';
import { PaymentController } from './payment.controller';

const router = Router();

// Initiate payment
router.post('/payment/initiate', PaymentController.initiatePayment);

// SSLCOMMERZ IPN handler (POST request from SSLCOMMERZ)
// router.post('/payment/ipn', PaymentController.handleIPN);

router.post('/payment/success', PaymentController.handleSuccess)

export default router;
