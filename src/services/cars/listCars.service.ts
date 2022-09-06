import AppDataSource from "../../data-source";
import { Cars } from "../../entities/cars.entity";

const listCarsService = async () => {
  const carRepository = AppDataSource.getRepository(Cars);

  return await carRepository.find();
};
export default listCarsService;
