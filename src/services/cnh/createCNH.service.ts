import AppDataSource from "../../data-source";
import { Cnh } from "../../entities/cnh.entity";
import { Users } from "../../entities/users.entity";
import { ICnhRequest } from "../../interfaces/cnh";

const createCNHService = async (
  { type, number, validate }: ICnhRequest,
  id: string
) => {
  const cnhRepository = AppDataSource.getRepository(Cnh);
  const userRepository = AppDataSource.getRepository(Users);

  const cnh = await cnhRepository.save({ type, number, validate });

  const updatedUser = userRepository.update(id, { cnh });

  return updatedUser;
};

export default createCNHService;
