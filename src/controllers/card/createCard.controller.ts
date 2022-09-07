import { ICardRequest } from "../../interfaces/card";
import { Request, Response } from "express";
// import createCardService from "../../services/card/createCard.service";
import { AppError } from "../../errors/AppError";

const createCardController = async (req: Request, res: Response) => {
    
    try {
      const { cardNumber, validate, name }: ICardRequest = req.body;
      const { id } = req.user;
    
    //   const card = await createCardService(id, { cardNumber, validate, name });
    //   return res.status(201).json(card);
    
  } catch (err) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).send({
          message: err.message,
        });
      }
  }
};

export default createCardController;
