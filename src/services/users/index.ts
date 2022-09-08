import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { IUserRequest } from "../../interfaces/users";
import { hash } from "bcryptjs";
import { AppError } from "../../errors/AppError";

const createUserService = async ({
  birthDate,
  cpf,
  email,
  name,
  password,
  isAdm,
}: IUserRequest): Promise<Users> => {
  const userRepository = AppDataSource.getRepository(Users);

  const hashedPassword = await hash(password, 10);

  const birth = new Date(birthDate);
  const now = new Date();

  const age = +now.getFullYear() - +birth.getFullYear();

  const user = userRepository.create({
    birthDate,
    cpf,
    email,
    age,
    isAdm,
    name,
    password: hashedPassword,
  });

  await userRepository.save(user);

  return user;
};

const listUsersService = async (): Promise<Users[]> => {
  const userRepository = AppDataSource.getRepository(Users);

  const users = await userRepository.find();

  return users;
};

export { createUserService, listUsersService };
