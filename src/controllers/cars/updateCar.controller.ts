import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { handleError } from "../../middlewares/errors.mid";
import updateCarService from "../../services/cars/updateCar.service";

const updateCarController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedCar = await updateCarService(req.body, id);
    return res.json(updatedCar);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default updateCarController;
