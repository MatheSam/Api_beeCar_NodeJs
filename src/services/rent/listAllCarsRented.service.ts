import AppDataSource from "../../data-source";
import { Rent } from "../../entities/rent.entity";

const listAllCarsRentedService = async (): Promise<Rent[]> => {
  const rentRepository = AppDataSource.getRepository(Rent);

  const rents = await rentRepository.find();

  return rents;
};

export default listAllCarsRentedService;
