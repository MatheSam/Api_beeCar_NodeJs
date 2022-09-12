import listCardService from "../../services/card/listCard.services";
import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { handleError } from "../../middlewares/errors.mid";

const listCardController = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const card = await listCardService(id);

    return res.status(200).send(card);
  } catch (err) {
    if (err instanceof AppError) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }
};

export default listCardController;
