import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { handleError } from "../../middlewares/errors.mid";
import createCarService from "../../services/cars/createCar.service";

const createCarController = async (req: Request, res: Response) => {
  try {
    const carCreated = await createCarService(req.body);
    return res.status(201).json(carCreated);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default createCarController;
