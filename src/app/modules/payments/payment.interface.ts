export interface PaymentRequest {
  total_amount: number;
  currency: string;
  tran_id: string;
  success_url: string;
  fail_url: string;
  cancel_url: string;
  ipn_url: string;
  product_profile: string;
  cus_name: string;
  cus_email: string;
  cus_phone: string;
  shipping_method?: string;
  num_of_item?: number;
  product_name?: string;
  product_category?: string;
}

export interface PaymentResponse {
  status: string;
  gatewayPageURL: string;
  sessionkey: string;
}

export interface PaymentValidation {
  status: string;
  tran_id: string;
  val_id: string;
  amount: string;
  currency: string;
  bank_tran_id: string;
  card_type: string;
  card_no: string;
  store_amount: string;
  risk_level: string;
  validated_on: string;
}
