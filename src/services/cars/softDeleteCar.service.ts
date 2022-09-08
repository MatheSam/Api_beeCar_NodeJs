import AppDataSource from "../../data-source";
import { Cars } from "../../entities/cars.entity";

const softDeleteCarService = async (id: string): Promise<void> => {
  const carRepository = AppDataSource.getRepository(Cars);

  await carRepository.update(id, { isActive: false });
};

export default softDeleteCarService;
