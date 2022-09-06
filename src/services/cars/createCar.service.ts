import AppDataSource from "../../data-source";
import { Cars } from "../../entities/cars.entity";
import { AppError } from "../../errors/AppError";
import { ICarsRequest } from "../../interfaces/cars";

const createCarService = async ({
  licensePlate,
  brand,
  categoriesId,
  color,
  fuel,
  hp,
  img,
  km,
  model,
  price,
  year,
}: ICarsRequest): Promise<Cars> => {
  const carRepository = AppDataSource.getRepository(Cars);

  const carAlreadyExists = await carRepository.findOneBy({ licensePlate });

  if (carAlreadyExists) {
    throw new AppError("This car already exists in our system");
  }

  const carCreated = await carRepository.save({
    licensePlate,
    brand,
    categoriesId,
    color,
    fuel,
    hp,
    img,
    km,
    model,
    price,
    year,
  });

  return carCreated;
};

export default createCarService;
