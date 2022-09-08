import { AppError } from "../../errors/AppError";
import updateCardService from "../../services/card/updateCard.service";
import { Response, Request } from "express";

const updateCardController = async (req: Request, res: Response) => {
  try {
    const { cardNumber, validate, name } = req.body;

    const updatedCard = await updateCardService({ cardNumber, validate, name });

    return res.status(201).json(updatedCard);
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).send({
        message: err.message,
      });
    }
  }
};

export default updateCardController;
