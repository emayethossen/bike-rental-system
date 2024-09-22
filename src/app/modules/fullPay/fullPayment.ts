import express, { Request, Response } from "express";
import SSLCommerz from "sslcommerz-lts";
import { Rental } from "../rentals/rentals.model"; // Assuming you have this model

const router = express.Router();

// SSLCOMMERZ credentials
const store_id = "abc66ea3e0839f86";
const store_passwd = "abc66ea3e0839f86@ssl";
const is_live = false; // Use sandbox for testing

// Route to create SSLCOMMERZ payment session
router.post("/sslcommerz", async (req: Request, res: Response) => {
  const { rentalId, totalAmount } = req.body;

  const paymentData = {
    store_id,
    store_passwd,
    total_amount: totalAmount,
    currency: "BDT",
    tran_id: `rental_${rentalId}`,
    success_url: "http://localhost:5000/api/payment/success",
    fail_url: "http://localhost:5000/api/payment/fail",
    cancel_url: "http://localhost:5000/api/payment/cancel",
    ipn_url: "http://localhost:5000/payment/ipn",
    product_profile: "bike-rental",
    product_name: "Bike Rental",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Customer Address",
    cus_phone: "Customer Phone",
    shipping_method: "NO",
    multi_card_name: "mastercard",
  };

  try {
    const sslcommerz = new SSLCommerz(store_id, store_passwd, is_live);
    const response = await sslcommerz.init(paymentData);

    if (response?.GatewayPageURL) {
      return res.status(200).json({ paymentUrl: response.GatewayPageURL });
    } else {
      return res.status(500).json({ error: "Failed to initiate payment" });
    }
  } catch (error) {
    // console.error('SSLCOMMERZ error:', error);
    return res
      .status(500)
      .json({ error: "Server error during payment initiation" });
  }
});

// Success callback route
router.post("/success", async (req: Request, res: Response) => {
  const { tran_id } = req.body;

  try {
    const rentalId = tran_id.split("_")[1]; // Extract the rental ID from transaction ID
    await Rental.findByIdAndUpdate(rentalId, { paymentStatus: "Paid" });

    // Redirect to the frontend success page
    res.redirect("http://localhost:3000/payment/success");
  } catch (error) {
    // console.error('Error updating rental payment status:', error);
    res.redirect("http://localhost:3000/payment/fail");
  }
});

// Failure callback route
router.post("/fail", (req: Request, res: Response) => {
  // const { tran_id } = req.body;

  // Log the failure or take actions like notifying the user
  res.redirect("http://localhost:3000/payment/fail");
});

// Cancel callback route
router.post("/cancel", (req: Request, res: Response) => {
  // const { tran_id } = req.body;

  // Handle the canceled transaction
  res.redirect("http://localhost:3000/payment/cancel");
});

export default router;
