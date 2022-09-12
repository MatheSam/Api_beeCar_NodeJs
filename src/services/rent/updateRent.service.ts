import AppDataSource from "../../data-source";
import { Cars } from "../../entities/cars.entity";
import { Rent } from "../../entities/rent.entity";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { IRentRequest } from "../../interfaces/rent";
import { calcRent } from "../../utils";

const updateRentService = async (
  rentId: string,
  { carId, finalDate, finalHour }: IRentRequest
): Promise<Rent> => {
  const rentRepository = AppDataSource.getRepository(Rent);

  const trueRent = await rentRepository.findOneBy({ id: rentId });

  if (!trueRent || new Date(trueRent!.finalDate) < new Date(finalDate)) {
    throw new AppError("Rent expired or not found", 404);
  }

  if (carId) {
    const carRepository = AppDataSource.getRepository(Cars);
    const car = await carRepository.findOneBy({ id: carId });
    if (!car) {
      throw new AppError("Car not found", 404);
    }

    const newTotal = (finalDate: string, finalHour: string) =>
      calcRent(
        trueRent!.initialDate.toString(),
        trueRent!.initialHour.toString(),
        finalDate,
        finalHour,
        car!.categories.pricePerDay,
        car!.categories.pricePerMouth
      );
    const newRent = await rentRepository.update(trueRent!?.id, {
      cars: car || trueRent?.cars,
      finalDate: finalDate || trueRent!?.finalDate,
      finalHour: finalHour || trueRent!?.finalHour,
      totalValue: newTotal(finalDate, finalHour) || trueRent!?.totalValue,
    });
    const finalRent = await rentRepository.findOneBy({ id: trueRent?.id });
    return finalRent!;
  }

  const newTotal = (finalDate: string, finalHour: string) =>
    calcRent(
      trueRent!.initialDate.toString(),
      trueRent!.initialHour.toString(),
      finalDate,
      finalHour,
      trueRent!.cars.categories.pricePerDay,
      trueRent!.cars.categories.pricePerMouth
    );
  await rentRepository.update(trueRent!?.id, {
    cars: trueRent!.cars,
    finalDate: finalDate || trueRent!?.finalDate,
    finalHour: finalHour || trueRent!?.finalHour,
    totalValue: newTotal(finalDate, finalHour) || trueRent!?.totalValue,
  });
  const finalRent = await rentRepository.findOneBy({ id: trueRent?.id });
  return finalRent!;
};

export default updateRentService;
