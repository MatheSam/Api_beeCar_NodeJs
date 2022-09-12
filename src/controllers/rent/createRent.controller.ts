import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { handleError } from "../../middlewares/errors.mid";
import createRentService from "../../services/rent/createRent.service";

const createRentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const rent = await createRentService(id, req.body);
    return res.status(201).json(instanceToPlain(rent));
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export { createRentController };
