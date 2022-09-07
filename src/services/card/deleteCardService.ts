import AppDataSource from "../../data-source";
import { Cards } from "../../entities/card.entity";
import { AppError } from "../../errors/AppError";
import { ICardRequest } from "../../interfaces/card";

const deleteCardservice = async ({ cardNumber }: ICardRequest) => {
  const cardRepository = AppDataSource.getRepository(Cards);

  const card = await cardRepository.findOne({ where: {cardNumber } });

  if (!card) {
    throw new AppError("card not found", 400);
  }

  await cardRepository.delete(card.cardNumber);

  return;
};

export default deleteCardservice;
