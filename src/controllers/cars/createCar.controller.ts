import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { ICarsRequest } from "../../interfaces/cars";
import { handleError } from "../../middlewares/errors.mid";
import createCarService from "../../services/cars/createCar.service";

const createCarController = async (req: Request, res: Response) => {
  try {
    const {
      licensePlate,
      brand,
      categoriesId,
      color,
      fuel,
      hp,
      img,
      km,
      model,
      price,
      year,
    }: ICarsRequest = req.body;
    const carCreated = await createCarService({
      licensePlate,
      brand,
      categoriesId,
      color,
      fuel,
      hp,
      img,
      km,
      model,
      price,
      year,
    });
    return res.status(201).json(carCreated);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default createCarController;
