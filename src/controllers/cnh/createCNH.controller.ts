import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { handleError } from "../../middlewares/errors.mid";
import createCNHService from "../../services/cnh/createCNH.service";

const createCNHController = async (req: Request, res: Response) => {
  try {
    const cnh = await createCNHService(req.body, req.user.id);
    return res.status(201).json(instanceToPlain(cnh));
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default createCNHController;
