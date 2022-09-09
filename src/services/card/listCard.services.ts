import AppDataSource from "../../data-source";
import { Cards } from "../../entities/card.entity";
import { Users } from "../../entities/users.entity";

const listCardService = async (id:string):Promise<Cards[]> => {
  const cardRepository = AppDataSource.getRepository(Cards);
  const userRepository= AppDataSource.getRepository(Users);

  const user = await userRepository.findOneBy({id}) 

 
  return user?.cards!
};

export default listCardService;
