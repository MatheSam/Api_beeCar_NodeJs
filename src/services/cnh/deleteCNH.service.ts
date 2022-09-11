import AppDataSource from "../../data-source";
import { Cnh } from "../../entities/cnh.entity";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";

const deleteCNHService = async (id: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(Users);
  const cnhRepository = AppDataSource.getRepository(Cnh);

  const user = await userRepository.findOneBy({ id });

  const idCard = user?.cnh?.id;

  if (!idCard) {
    throw new AppError("CNH not found", 404);
  }

  await cnhRepository.delete({ id: idCard });
};

export default deleteCNHService;
