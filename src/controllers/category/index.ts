import { AppError } from "../../errors/AppError";
import { Request, Response } from "express";
import createCategoryService from "../../services/category/createCategory.service";
import listCategoriesService from "../../services/category/listCategory.service";
import listCarsOfCategoryService from "../../services/category/listCarsOfCategory.service";

export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const category = await createCategoryService(data);
    return res.status(201).json(category);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({
        message: error.message,
      });
    }
  }
};

export const listCategoryController = async (req: Request, res: Response) => {
  try {
    const category = await listCategoriesService();
    return res.status(201).json(category);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({
        message: error.message,
      });
    }
  }
};

export const listCarsOfCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const carsOfCategory = await listCarsOfCategoryService(id);
    return res.status(201).json(carsOfCategory);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({
        message: error.message,
      });
    }
  }
};
