import AppDataSource from "../../data-source";
import { Cars } from "../../entities/cars.entity";
import { Categories } from "../../entities/category.entity";
import { AppError } from "../../errors/AppError";
import { ICarsUpdate } from "../../interfaces/cars";
import { categoryReturn } from "../../utils";

const updateCarService = async (updatedDate: ICarsUpdate, id: string) => {
  const carRepository = AppDataSource.getRepository(Cars);

  const car = await carRepository.findOneBy({ id });

  if (!car) {
    throw new AppError("Car not found", 404);
  }

  const {
    licensePlate,
    color,
    model,
    fuel,
    year,
    document,
    maintenence,
    brand,
    price,
    km,
    hp,
    img,
    categories,
  } = car;

  const newCategory = await categoryReturn(updatedDate.categoryName);

  await carRepository.update(id, {
    licensePlate: updatedDate?.licensePlate || licensePlate,
    color: updatedDate?.color || color,
    model: updatedDate?.model || model,
    fuel: updatedDate?.fuel || fuel,
    year: updatedDate?.year || year,
    document: updatedDate?.document || document,
    maintenence: updatedDate?.maintenence || maintenence,
    brand: updatedDate?.brand || brand,
    price: updatedDate?.price || price,
    km: updatedDate?.km || km,
    hp: updatedDate?.hp || hp,
    img: updatedDate?.img || img,
    categories: newCategory || categories,
  });

  const updatedCar = await carRepository.findOneBy({ id });

  return updatedCar;
};

export default updateCarService;
