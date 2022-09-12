import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { handleError } from "../../middlewares/errors.mid";
import deleteCNHService from "../../services/cnh/deleteCNH.service";

const deleteCNHController = async (req: Request, res: Response) => {
  try {
    const deletedUser = await deleteCNHService(req.user.id);
    return res.status(200).json(deletedUser);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default deleteCNHController;
