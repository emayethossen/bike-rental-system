import { Schema, model } from "mongoose";
import { TRentals } from "./rentals.interface";

const RentalSchema = new Schema<TRentals>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bikeId: { type: Schema.Types.ObjectId, ref: "Bike", required: true },
    startTime: { type: Date, required: true },
    returnTime: { type: Date },
    totalCost: { type: Number },
    isReturned: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Rental = model<TRentals>("Rental", RentalSchema);
