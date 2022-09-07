import AppDataSource from "../../data-source";
import { Cards } from "../../entities/card.entity";

const listCardService = async () => {
  const cardRepository = AppDataSource.getRepository(Cards);

  const card = await cardRepository.find();

  return card;
};

export default listCardService;
