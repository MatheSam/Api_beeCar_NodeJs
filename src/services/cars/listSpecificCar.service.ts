import AppDataSource from "../../data-source";
import { Cars } from "../../entities/cars.entity";
import { AppError } from "../../errors/AppError";

const listSpecificCarService = async (id: string) => {
  const carRepository = AppDataSource.getRepository(Cars);

  const car = await carRepository.findOneBy({ id });

  if (!car) {
    throw new AppError("Car not found!", 404);
  }

  return car;
};

export default listSpecificCarService;
