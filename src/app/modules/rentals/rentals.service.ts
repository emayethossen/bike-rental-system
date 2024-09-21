
import { Bike } from "../bike/bike.model";
import { TRentals } from "./rentals.interface";
import { Rental } from "./rentals.model";

const createRental = async (
  userId: string, bikeId: string, startTime: Date, paymentStatus: string
): Promise<TRentals> => {
  const bike = await Bike.findById(bikeId);
  if (!bike) {
    throw new Error("Bike not found");
  }
  if (!bike.isAvailable) {
    throw new Error("Bike is already rented out");
  }

  bike.isAvailable = false;
  await bike.save();

  // Create rental
  const rental = new Rental({ userId, bikeId, startTime, paymentStatus });
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

const updatePaymentStatus = async (rentalId: string, status: 'Paid' | 'Unpaid'): Promise<TRentals | null> => {
  return Rental.findByIdAndUpdate(rentalId, { paymentStatus: status }, { new: true });
};

const findById = async (rentalId: string): Promise<TRentals | null> => {
  return Rental.findById(rentalId);
};

export const RentalService = {
  createRental,
  returnRental,
  getRentalsByUser,
  updatePaymentStatus,
  findById,
};
