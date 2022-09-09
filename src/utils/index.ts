import { date } from "yup";
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

export const calcRent = (
  initialDate: string,
  initialHour: string,
  finalDate: string,
  finalHour: string,
  rentPerDay: number,
  retnPerMonth: number
): number => {
  const date1 = new Date(initialDate);
  const hourAll1: string[] = initialHour.split(":");
  const hour1: number = +hourAll1[0];
  const minutes1: number = +hourAll1[1];

  const date2 = new Date(finalDate);
  const hourAll2: string[] = finalHour.split(":");
  const hour2: number = +hourAll2[0];
  const minutes2: number = +hourAll2[1];

  date1.setHours(hour1, minutes1);
  date2.setHours(hour2, minutes2);

  const valuePerDay: number = rentPerDay / 86400000;
  const valuePerMonth: number = retnPerMonth / 2628000000;
  const range: number = +date2 - +date1;

  if (range >= 2628000000) {
    const result: number = valuePerMonth * range;
    console.log("+30dias");
    return +result.toFixed(2);
  } else {
    const result: number = valuePerDay * range;
    console.log("-30");

    return +result.toFixed(2);
  }
};
