import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { handleError } from "../../middlewares/errors.mid";
import updateCarService from "../../services/cars/updateCar.service";

const updateCarController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const carUpdated = await updateCarService(req.body, id);
    res.json({ message: "Car updated", carUpdated });
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default updateCarController;
