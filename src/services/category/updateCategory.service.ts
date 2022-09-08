import AppDataSource from "../../data-source";
import { Categories } from "../../entities/category.entity";
import { AppError } from "../../errors/AppError";
import { ICategoryRequest } from "../../interfaces/category";

const updateCategoryService = async (
  id: string,
  data: ICategoryRequest
): Promise<Categories> => {
  const categoryRepository = AppDataSource.getRepository(Categories);
  const category = await categoryRepository.findOneBy({ id });

  const {
    name,
    automatic,
    directionType,
    powerWindows,
    pricePerDay,
    pricePerMouth,
    pricePerWeekend,
    pricePeryear,
    type,
    airCondioting,
  } = data;

  if (!category) {
    throw new AppError("Category not found", 400);
  }

  const newCategory = {
    id:              id,
    name:            name || category.name,
    automatic:       automatic || category.automatic,
    directionType:   directionType || category.directionType,
    powerWindows:    powerWindows || category.powerWindows,
    pricePerDay:     pricePerDay || category.pricePerDay,
    pricePerMouth:   pricePerMouth || category.pricePerMouth,
    pricePerWeekend: pricePerWeekend || category.pricePerWeekend,
    pricePeryear:    pricePeryear || category.pricePeryear,
    type:            type || category.type,
    airCondioting:   airCondioting || category.airCondioting,
    isActive:        category.isActive,
    cars:            category.cars
  };

  await categoryRepository.save(newCategory);

  return newCategory;
};

export default updateCategoryService;
