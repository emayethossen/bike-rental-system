import { Bike } from "../bike/bike.model";
import { TRentals } from "./rentals.interface";
import { Rental } from "./rentals.model";

const createRental = async (
  userId: string,
  bikeId: string,
  startTime: Date,
): Promise<TRentals> => {
  const bike = await Bike.findByIdAndUpdate(bikeId, { isAvailable: false });
  if (!bike) {
    throw new Error("Bike not found");
  }

  const rental = new Rental({ userId, bikeId, startTime });
  await rental.save();
  return rental;
};

const returnRental = async (rentalId: string): Promise<TRentals | null> => {
  const rental = await Rental.findById(rentalId);
  if (!rental) {
    throw new Error("Rental not found");
  }

  if (rental.isReturned) {
    throw new Error("Bike already returned");
  }

  const bike = await Bike.findByIdAndUpdate(rental.bikeId, {
    isAvailable: true,
  });
  if (!bike) {
    throw new Error("Bike not found");
  }

  const currentTime = new Date();
  const rentalDurationHours =
    (currentTime.getTime() - rental.startTime.getTime()) / (1000 * 60 * 60);
  const totalCost = rentalDurationHours * bike.pricePerHour;

  rental.returnTime = currentTime;
  rental.totalCost = totalCost;
  rental.isReturned = true;
  await rental.save();

  return rental;
};

const getRentalsByUser = async (userId: string): Promise<TRentals[]> => {
  return Rental.find({ userId }).populate("bikeId").exec();
};

export const RentalService = {
  createRental,
  returnRental,
  getRentalsByUser,
};
