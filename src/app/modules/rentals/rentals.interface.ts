import { Types } from "mongoose";

export type TRentals = {
  _id?: string;
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime?: Date;
  totalCost?: number;
  isReturned: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
