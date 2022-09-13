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
  if (!carId) {
    throw new AppError("Car is a required field", 400);
  }
  const car = await carRepository.findOneBy({ id: carId });

  if (!car) {
    throw new AppError("Car not found!", 404);
  }

  if (car.rented) {
    throw new AppError("car is already rented", 403);
  }

  const user = await UserRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found!", 404);
  }

  if (!user.cnh) {
    throw new AppError("User need to have a CNH to create a rent", 401);
  }

  if (!user.address) {
    throw new AppError("User need to have a address to create a rent", 401);
  }

  if (user.cards?.length === 0) {
    throw new AppError("You must to have a credit card", 403);
  }

  if (user.cards?.some((card) => new Date(card.validate) <= new Date())) {
    throw new AppError("Some card are expired or invalid", 403);
  }

  if (new Date() >= new Date(finalDate)) {
    throw new AppError("Not allowed to change date in the same day", 403);
  }

  if (new Date(initialDate) == new Date()) {
    await carRepository.update(carId, { rented: true });
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
