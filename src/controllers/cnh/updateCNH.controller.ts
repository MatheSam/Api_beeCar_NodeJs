import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { handleError } from "../../middlewares/errors.mid";
import updateCNHService from "../../services/cnh/updateCNH.service";

const updateCNHController = async (req: Request, res: Response) => {
  try {
    await updateCNHService(req.user.id, req.body);
    return res.json({ message: "CNH updated" });
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default updateCNHController;
