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
  const carRepository = AppDataSource.getRepository(Cars);
  const userRepository = AppDataSource.getRepository(Users);

  const trueRent = await rentRepository.findOneBy({ id: rentId });

  const user = await userRepository.findOneBy({ id: trueRent?.users.id });

  if (!trueRent) {
    throw new AppError("Rent not found", 404);
  }

  if (new Date(trueRent.initialDate) >= new Date(finalDate)) {
    throw new AppError("Rent expired or not found", 404);
  }

  if (new Date() >= new Date(finalDate)) {
    throw new AppError("Not allowed to change date in the same day", 403);
  }

  if (user?.cards?.length === 0) {
    throw new AppError("You must to have a credit card", 403);
  }
  if (user?.cards?.some((card) => new Date(card.validate) <= new Date())) {
    throw new AppError("Some card are expired or invalid", 403);
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
    await rentRepository.update(trueRent!.id, {
      cars: car || trueRent!.cars,
      finalDate: finalDate || trueRent!.finalDate,
      finalHour: finalHour || trueRent!.finalHour,
      totalValue:
        newTotal(
          finalDate || trueRent.finalDate.toISOString(),
          finalHour || trueRent.finalHour
        ) || trueRent!.totalValue,
    });
    await carRepository.update(trueRent.cars.id, { rented: true });
    const finalRent = await rentRepository.findOneBy({ id: trueRent?.id });
    return finalRent!;
  }
  console.log("block1");

  const newTotal = (finalDate: string, finalHour: string) =>
    calcRent(
      trueRent!.initialDate.toString(),
      trueRent!.initialHour.toString(),
      finalDate,
      finalHour,
      trueRent!.cars.categories.pricePerDay,
      trueRent!.cars.categories.pricePerMouth
    );

  await rentRepository.update(trueRent!.id, {
    cars: trueRent!.cars,
    finalDate: finalDate || trueRent!.finalDate,
    finalHour: finalHour || trueRent!.finalHour,
    totalValue:
      newTotal(
        finalDate || trueRent.finalDate.toISOString(),
        finalHour || trueRent.finalHour
      ) || trueRent!.totalValue,
  });
  await carRepository.update(trueRent.cars.id, { rented: true });
  const finalRent = await rentRepository.findOneBy({ id: trueRent!.id });
  return finalRent!;
};

export default updateRentService;
