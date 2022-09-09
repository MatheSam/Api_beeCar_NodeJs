import AppDataSource from "../../data-source";
import { Cars } from "../../entities/cars.entity";
import { Rent } from "../../entities/rent.entity";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { IRentRequest } from "../../interfaces/rent";
import { calcRent } from "../../utils";

const createRentService = async (
  userId: string,
  { carId, finalDate, finalHour, initialDate, initialHour }: IRentRequest
): Promise<Rent> => {
  const UserRepository = AppDataSource.getRepository(Users);
  const carRepository = AppDataSource.getRepository(Cars);
  const rentRepository = AppDataSource.getRepository(Rent);

  const car = await carRepository.findOneBy({ id: carId });

  if (!car) {
    throw new AppError("Car not found!", 404);
  }

  const user = await UserRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found!", 404);
  }

  const rentPrice = calcRent(
    initialDate,
    initialHour,
    finalDate,
    finalHour,
    car.categories.pricePerDay,
    car.categories.pricePerMouth
  );

  const rent = rentRepository.create({
    cars: car,
    finalDate,
    finalHour,
    initialDate,
    initialHour,
    totalValue: rentPrice,
    users: user,
  });

  if (!rent) {
    throw new AppError(
      "Was not possible to create rent, verify your request and try again",
      401
    );
  }

  await rentRepository.save(rent);

  return rent;
};

export default createRentService;
