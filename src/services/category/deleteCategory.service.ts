import AppDataSource from "../../data-source";
import { Categories } from "../../entities/category.entity";
import { AppError } from "../../errors/AppError";

const deleteCategoryService = async (id: string) => {
  const categoryRepository = AppDataSource.getRepository(Categories);

  const category = await categoryRepository.findOneBy({ id });

  if (!category) {
    throw new AppError("Category is not found", 404);
  }

  await categoryRepository.update(id, { isActive: false });

  return true;
};

export default deleteCategoryService;
