import SSLCommerz from "sslcommerz-lts";
import { Payment } from "./payment.model";

const store_id = "abc66ea3e0839f86";
const store_passwd = "abc66ea3e0839f86@ssl";
const is_live = false;

const sslcz = new SSLCommerz(store_id, store_passwd, is_live);

export class PaymentService {
  static async initiatePayment(data: any) {
    const transactionId = `trans_${Date.now()}`;
    const { amount, customer_name, customer_email, customer_phone } = data;

    const paymentData = {
      store_id,
      store_passwd,
      total_amount: amount || "100",
      currency: "BDT",
      tran_id: transactionId,
      success_url: "http://localhost:5000/api/payment/success",
      fail_url: "http://localhost:5000/api/payment/fail",
      cancel_url: "http://localhost:5000/api/payment/cancel",
      cus_name: customer_name,
      cus_email: customer_email,
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: customer_phone,
      cus_fax: "0908767",
      product_name: "Bike Rental",
      product_category: "Service",
      product_profile: "general",
      shipping_method: "No",
      ship_name: customer_name,
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: "1000",
      ship_country: "Bangladesh",
      multi_card_name: "mastercard, visacard, amexcard",
      value_a: "ref001_A",
      value_b: "ref002_B",
      value_c: "ref003_C",
      value_d: "ref004_D",
    };

    try {
      const response = await sslcz.init(paymentData);
      const paymentURL = response.GatewayPageURL;

      await Payment.create({
        tran_id: transactionId,
        amount: amount || "100", // Store amount as well
        status: "PENDING",
        customer_name,
        customer_email,
        customer_phone,
      });

      return paymentURL;
    } catch (error) {
      throw new Error("SSLCommerz payment initiation failed");
    }
  }

  static async verifyPayment(body: any) {
    const { val_id } = body;

    try {
      const validationResponse = await sslcz.validate(val_id);

      if (validationResponse.status === "VALID") {
        await Payment.updateOne(
          { tran_id: validationResponse.tran_id },
          { status: "COMPLETED", validationData: validationResponse },
        );
      }

      return validationResponse;
    } catch (error) {
      throw new Error("SSLCommerz payment validation failed");
    }
  }
}
