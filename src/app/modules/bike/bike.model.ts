import { Schema, model } from "mongoose";
import { TBike } from "./bike.interface";

const BikeSchema = new Schema<TBike>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    cc: { type: Number, required: true },
    year: { type: Number, required: true },
    model: { type: String, required: true },
    brand: { type: String, required: true },
  },
  { timestamps: true },
);

export const Bike = model<TBike>("Bike", BikeSchema);
