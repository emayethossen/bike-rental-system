import mongoose, { Schema, Document } from 'mongoose';

interface IPayment extends Document {
  tran_id: string;
  amount: number;
  status: string;
  customer_name: string,
  customer_email: string,
  customer_phone: string,
  validationData?: object;
  createdAt: Date;
}

const PaymentSchema: Schema = new Schema({
  tran_id: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  customer_name: { type: String, required: true },
  customer_email: { type: String, required: true },
  customer_phone: { type: String, required: true },
  status: { type: String, required: true, default: 'PENDING' },
  validationData: { type: Schema.Types.Mixed, required: false },
  createdAt: { type: Date, default: Date.now },
});

export const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);
