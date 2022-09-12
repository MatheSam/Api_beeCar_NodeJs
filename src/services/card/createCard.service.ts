import AppDataSource from "../../data-source";
import { Cards } from "../../entities/card.entity";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { ICardRequest } from "../../interfaces/card";

const createCardService = async (
  userId: string,
  { cardNumber, validate, name }: ICardRequest
) => {
  const usersRepository = AppDataSource.getRepository(Users);
  const cardRepository = AppDataSource.getRepository(Cards);

  const user = await usersRepository.findOneBy({ id: userId });

  const cardAlreadyExists = await cardRepository.findOne({
    where: { cardNumber, validate, name },
  });

  if (cardAlreadyExists) {
    throw new AppError("Card already exists", 400);
  }

  const card = await cardRepository.save({
    cardNumber,
    validate,
    name,
    user: user!,
  });

  return card;
};

export default createCardService;
