import { Response, Request } from "express";
import { AppError } from "../../errors/AppError";
import { handleError } from "../../middlewares/errors.mid";
import listCarsService from "../../services/cars/listCars.service";

const listCarsController = async (req: Request, res: Response) => {
  try {
    const listCars = await listCarsService();
    return res.json(listCars);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default listCarsController;
