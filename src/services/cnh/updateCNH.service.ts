import AppDataSource from "../../data-source";
import { Cnh } from "../../entities/cnh.entity";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { ICnhRequest } from "../../interfaces/cnh";

const updateCNHService = async (
  id: string,
  { validate, number, type }: ICnhRequest
): Promise<void> => {
  const userRepository = AppDataSource.getRepository(Users);
  const cnhRepository = AppDataSource.getRepository(Cnh);

  const user = await userRepository.findOneBy({ id });

  const cnh = await cnhRepository.findOneBy({ id: user?.cnh?.id });

  if (!cnh) {
    throw new AppError("CNH not found", 404);
  }

  await cnhRepository.update(cnh?.id!, {
    type: type || cnh?.type,
    validate: validate || cnh?.validate,
    number: number || cnh?.number,
  });
};

export default updateCNHService;
