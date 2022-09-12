import AppDataSource from "../../data-source";
import { Cards } from "../../entities/card.entity";
import { AppError } from "../../errors/AppError";
import { ICardRequest } from "../../interfaces/card";

const updateCardService = async (
  id: string,
  { cardNumber, validate, name }: ICardRequest
): Promise<void> => {
  const cardRepository = AppDataSource.getRepository(Cards);

  const card = await cardRepository.findOneBy({ id });

  if (!card) {
    throw new AppError("card not found", 404);
  }

  await cardRepository.update(id, {
    cardNumber: cardNumber || card.cardNumber,
    validate: validate || card.validate,
    name: name || card.name,
  });
};

export default updateCardService;
