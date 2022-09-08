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

  const card = cardRepository.create({
    cardNumber,
    validate,
    name,
  });

  await cardRepository.save(card);

  const user = await usersRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("user not found", 404);
  }

  await usersRepository.save({ cards: [...user.cards as Cards[], card] });


  return card;
};

export default createCardService;
