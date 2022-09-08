import AppDataSource from "../data-source";
import { Categories } from "../entities/category.entity";
import { AppError } from "../errors/AppError";

export const categoryReturn = async (categoryName: string) => {
  const categoryRepository = AppDataSource.getRepository(Categories);
  if (categoryName) {
    const categoryReturn = await categoryRepository.findOneBy({
      name: categoryName,
    });

    if (!categoryReturn) {
      throw new AppError("Category not found", 404);
    }

    return categoryReturn;
  }
  return null;
};
