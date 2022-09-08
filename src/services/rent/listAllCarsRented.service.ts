import AppDataSource from "../../data-source";
import { Cars } from "../../entities/cars.entity";

const listAllCarsRentedService = async (): Promise<Cars[]> => {
  const carsRepository = AppDataSource.getRepository(Cars);

  const cars = await carsRepository.findBy({
    rent: true,
  });

  return cars;
};

export default listAllCarsRentedService;
