import AppDataSource from "../../data-source";
import { Cars } from "../../entities/cars.entity";
import { Categories } from "../../entities/category.entity";
import { Rent } from "../../entities/rent.entity";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { IRentRequest } from "../../interfaces/rent";

const createRentService = async (
  userId: string,
  {
    carId,
    finalDate,
    finalHour,
    initialDate,
    initialHour,
    totalValue,
  }: IRentRequest
): Promise<Rent> => {
  const UserRepository = AppDataSource.getRepository(Users);
  const carRepository = AppDataSource.getRepository(Cars);
  const rentRepository = AppDataSource.getRepository(Rent);
  const categoryRepository = AppDataSource.getRepository(Categories);

  const car = await carRepository.findOneBy({ id: carId });

  if (!car) {
    throw new AppError("Car not found!", 404);
  }

  const user = await UserRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found!", 404);
  }

  const initialValue = car.categories.pricePerDay;
  // const days = [initialDate.split("/")[0], finalDate.split("/")[0]];
  // console.log(days);
  console.log(initialValue);

  const rent = rentRepository.create({
    cars: car,
    finalDate,
    finalHour,
    initialDate,
    initialHour,
    totalValue,
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
