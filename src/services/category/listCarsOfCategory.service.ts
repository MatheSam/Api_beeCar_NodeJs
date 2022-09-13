import AppDataSource from "../../data-source";
import { Categories } from "../../entities/category.entity";
import { AppError } from "../../errors/AppError";

const listCarsOfCategoryService = async (id: string) => {
  const categoryRepository = AppDataSource.getRepository(Categories);

  if (id.length !== 36) {
    throw new AppError("Category not found", 404);
  }

  const category = await categoryRepository.findOneBy({ id });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const carsOfCategory = await categoryRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      cars: true,
    },
  });

  if (!carsOfCategory) {
    throw new AppError("Car not found", 404);
  }

  return carsOfCategory;
};

export default listCarsOfCategoryService;
