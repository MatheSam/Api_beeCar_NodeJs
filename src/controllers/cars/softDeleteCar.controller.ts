import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { handleError } from "../../middlewares/errors.mid";
import softDeleteCarService from "../../services/cars/softDeleteCar.service";

const softDeleteCarController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCar = await softDeleteCarService(id);
    return res.status(204).json(deletedCar);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default softDeleteCarController;
