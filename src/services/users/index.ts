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
  const userRepository = AppDataSource.getRepository(Users);

  const findUser = await userRepository.findOneBy({
    id,
  });

  if (!findUser) {
    throw new AppError("User not found");
  }

  const listOfCars = await AppDataSource.getRepository(Rent)
    .createQueryBuilder("rent")
    .innerJoinAndSelect("rent.users", "user")
    .innerJoinAndSelect("playlistSongs.cars", "car")
    .select([
      "rent.initialDate",
      "rent.initialHour",
      "rent.finalDate",
      "rent.finalHour",
      "rent.totalValue",
      "car.id",
      "car.licensePlate",
      "car.color",
      "car.model",
      "car.fuel",
      "car.year",
      "car.brand",
      "car.rented",
      "car.document",
      "car.isActive",
      "car.price",
      "car.km",
      "car.hp",
      "car.maintenence",
      "car.img",
      "car.categories",
    ])
    .where("user.id = :id", { id })
    .getMany();

  return listOfCars;
};

export { createUserService, listUsersService, listProfileCarsService };
