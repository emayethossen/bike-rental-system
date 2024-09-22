import { Router } from "express";
import { PaymentController } from "./payment.controller";

const router = Router();

// Initiate payment
router.post("/payment/initiate", PaymentController.initiatePayment);

router.post("/payment/success", PaymentController.handleSuccess);

export default router;
