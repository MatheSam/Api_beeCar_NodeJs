import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { IUserRequest } from "../../interfaces/users";
import { hash } from "bcryptjs";
import { AppError } from "../../errors/AppError";
import { Rent } from "../../entities/rent.entity";

const createUserService = async ({
  birthDate,
  cpf,
  email,
  name,
  password,
  isAdm,
}: IUserRequest): Promise<Users> => {
  const userRepository = AppDataSource.getRepository(Users);

  const alreadyExists = await userRepository.findOneBy({ email });

  if (alreadyExists) {
    throw new AppError("User already exists", 400);
  }

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

const listProfileCarsService = async (id: string) => {
  const rentRepository = AppDataSource.getRepository(Rent);

  const rentedByUser = await rentRepository.find({
    where: { users: { id } },
  });

  if (!rentedByUser) {
    throw new AppError("User dont have a rented car yet", 404);
  }

  return rentedByUser;
};

const updateUserService = async (id: string, userData: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(Users);

  const user = await userRepository.findOneBy({
    id,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (userData.password) {
    userData.password = await hash(userData.password, 10);
  }

  const newUser = await userRepository.save({ ...user, ...userData });

  return newUser;
};

const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(Users);

  const user = await userRepository.findOneBy({
    id,
  });

  if (!user) {
    throw new AppError("User not Found");
  }

  await userRepository.update(id, { isActive: false });

  const updatedUser = await userRepository.findOneBy({ id });

  return updatedUser;
};

export {
  createUserService,
  listUsersService,
  listProfileCarsService,
  updateUserService,
  deleteUserService,
};
