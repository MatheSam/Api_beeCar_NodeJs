import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { handleError } from "../../middlewares/errors.mid";
import listSpecificCarService from "../../services/cars/listSpecificCar.service";

const listSpecificCarController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const car = await listSpecificCarService(id);
    return res.json(car);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default listSpecificCarController;
