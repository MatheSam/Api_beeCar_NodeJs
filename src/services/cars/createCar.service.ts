import AppDataSource from "../../data-source";
import { Cars } from "../../entities/cars.entity";
import { Categories } from "../../entities/category.entity";
import { AppError } from "../../errors/AppError";
import { ICarsRequest } from "../../interfaces/cars";

const createCarService = async ({
  licensePlate,
  brand,
  categoryName,
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
  const categoryRepository = AppDataSource.getRepository(Categories);

  const carAlreadyExists = await carRepository.findOneBy({ licensePlate });

  if (carAlreadyExists) {
    throw new AppError("This car already exists in our system");
  }

  const category = await categoryRepository.findOneBy({ name: categoryName });


  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const carCreated = await carRepository.save({
    licensePlate,
    brand,
    categories: category,
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
