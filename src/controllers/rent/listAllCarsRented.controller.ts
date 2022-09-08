import { Request, Response } from "express";
import listAllCarsRentedService from "../../services/rent/listAllCarsRented.service";
import { AppError } from "../../errors/AppError";
import { handleError } from "../../middlewares/errors.mid";

const listAllCarsRentedController = async (req: Request, res: Response) => {
  try {
    const cars = await listAllCarsRentedService();
    return res.json(cars);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export { listAllCarsRentedController };
