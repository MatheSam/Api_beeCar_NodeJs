import AppDataSource from "../../data-source";
import { Cards } from "../../entities/card.entity";
import { AppError } from "../../errors/AppError";


const deleteCardservice = async (id:string) => {
  const cardRepository = AppDataSource.getRepository(Cards);

  const cardDel = await cardRepository.findOneBy({id})

  if (!cardDel) {
    throw new AppError("card not found", 400);
  }

  await cardRepository.delete(cardDel.id);

  return;
};

export default deleteCardservice;
