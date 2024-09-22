import { Types } from "mongoose";

export type TRentals = {
  _id?: string;
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime?: Date;
  totalCost?: number;
  isReturned: boolean;
  paymentStatus: "Paid" | "Unpaid";
  createdAt?: Date;
  updatedAt?: Date;
};
