import AppDataSource from "../../data-source";
import { Cars } from "../../entities/cars.entity";
import { Rent } from "../../entities/rent.entity";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { IRentRequest } from "../../interfaces/rent";

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

  const initialValue = car.categories.pricePerDay;
  const date1 = new Date(initialDate);
  console.log(date1, initialDate);
  const date2 = new Date(finalDate);
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const difDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  const rent = rentRepository.create({
    cars: car,
    finalDate: date2,
    finalHour,
    initialDate: date1,
    initialHour,
    totalValue: initialValue * +difDays,
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
