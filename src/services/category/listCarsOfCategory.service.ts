import AppDataSource from "../../data-source";
import { Categories } from "../../entities/category.entity";
import { AppError } from "../../errors/AppError";

const listCarsOfCategoryService = async (id: string) => {
  const categoryRepository = AppDataSource.getRepository(Categories);

  const carsOfCategory = await categoryRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      cars: true,
    },
  });

  console.log(carsOfCategory)

  if (!carsOfCategory) {
    throw new AppError("Car not found", 404);
  }

  return categoryRepository;
};

export default listCarsOfCategoryService;
