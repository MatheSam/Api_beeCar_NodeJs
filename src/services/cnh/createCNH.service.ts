import AppDataSource from "../../data-source";
import { Cnh } from "../../entities/cnh.entity";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { ICnhRequest } from "../../interfaces/cnh";

const createCNHService = async (
  { type, number, validate }: ICnhRequest,
  id: string
) => {
  const cnhRepository = AppDataSource.getRepository(Cnh);
  const userRepository = AppDataSource.getRepository(Users);

  const alreadyExists = await cnhRepository.findOne({
    where: {
      type,
      number,
      validate,
    },
  });

  if (alreadyExists) {
    throw new AppError("CNH already exists", 401);
  }

  const user = await userRepository.findOneBy({ id });

  if (user?.cnh) {
    throw new AppError("User already have cnh", 401);
  }

  const cnh = await cnhRepository.save({ type, number, validate });

  await userRepository.update(id, { cnh });

  return user;
};

export default createCNHService;
