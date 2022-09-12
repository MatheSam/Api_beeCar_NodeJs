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

  if (!trueRent) {
    throw new AppError("Rent not found", 404);
  }

  const user = await userRepository.findOneBy({ id: trueRent.users.id });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (new Date(trueRent.initialDate) >= new Date(finalDate)) {
    throw new AppError("The initial date don't be before than final date", 401);
  }

  if (new Date() >= new Date(finalDate)) {
    throw new AppError("The final date don't be before than today", 401);
  }

  if (carId) {
    const car = await carRepository.findOneBy({ id: carId });

    if (!car) {
      throw new AppError("Car not found", 404);
    }

    await carRepository.update(trueRent.cars.id, { rented: false });
    await carRepository.update(carId, { rented: true });

    const newTotal = calcRent(
      trueRent.initialDate.toString(),
      trueRent.initialHour.toString(),
      finalDate || trueRent.finalDate.toString(),
      finalHour || trueRent.finalHour,
      car.categories.pricePerDay,
      car.categories.pricePerMouth
    );

    await rentRepository.update(trueRent.id, {
      cars: car,
      finalDate: finalDate || trueRent.finalDate,
      finalHour: finalHour || trueRent.finalHour,
      totalValue: newTotal,
    });

    const finalRent = await rentRepository.findOneBy({ id: trueRent?.id });
    return finalRent!;
  }

  const newTotal = calcRent(
    trueRent.initialDate.toString(),
    trueRent.initialHour.toString(),
    finalDate || trueRent.finalDate.toString(),
    finalHour || trueRent.finalHour,
    trueRent.cars.categories.pricePerDay,
    trueRent.cars.categories.pricePerMouth
  );

  await rentRepository.update(trueRent.id, {
    cars: trueRent.cars,
    finalDate: finalDate || trueRent.finalDate,
    finalHour: finalHour || trueRent.finalHour,
    totalValue: newTotal,
  });

  const finalRent = await rentRepository.findOneBy({ id: trueRent.id });
  return finalRent!;
};

export default updateRentService;
