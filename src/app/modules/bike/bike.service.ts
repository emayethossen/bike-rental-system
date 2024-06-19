import { TBike } from "./bike.interface";
import { Bike } from "./bike.model";

const createBike = async (bikeData: TBike) => {
  const bike = await Bike.create(bikeData);
  return bike.save();
};

const getAllBikes = async (): Promise<TBike[]> => {
  return Bike.find();
};

const updateBike = async (
  bikeId: string,
  updateData: Partial<TBike>,
): Promise<TBike | null> => {
  return Bike.findByIdAndUpdate(bikeId, updateData, { new: true });
};

const deleteBike = async (bikeId: string): Promise<TBike | null> => {
  return Bike.findByIdAndDelete(bikeId);
};

export const BikeServices = {
  createBike,
  getAllBikes,
  updateBike,
  deleteBike,
};
