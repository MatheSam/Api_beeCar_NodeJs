import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { handleError } from "../../middlewares/errors.mid";
import updateRentService from "../../services/rent/updateRent.service";

const updateRentController = async (req: Request, res: Response) => {
  try {
    const rentId = req.params.id;
    const update = await updateRentService(rentId, req.body);
    return res.json({ message: "rent updated", update });
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default updateRentController;
