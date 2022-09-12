import AppDataSource from "../../data-source";
import { Cnh } from "../../entities/cnh.entity";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";

const deleteCNHService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(Users);
  const cnhRepository = AppDataSource.getRepository(Cnh);

  const user = await userRepository.findOneBy({ id });

  if (!user!.cnh) {
    throw new AppError("CNH not found", 404);
  }

  await cnhRepository.delete(user!.cnh!.id);

  const userUpdated = await userRepository.findOneBy({ id });
  return userUpdated;
};

export default deleteCNHService;
