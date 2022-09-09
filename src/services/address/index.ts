import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/address.entity";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { IAddressRequest } from "../../interfaces/address";

const createAddressService = async (
  idUser: string,
  address: IAddressRequest
): Promise<Addresses> => {
  const addressRepository = AppDataSource.getRepository(Addresses);
  const userRepository = AppDataSource.getRepository(Users);

  const newAddress = addressRepository.create({ ...address });

  await addressRepository.save(newAddress);

  const user = await userRepository.findOneBy({ id: idUser });

  if (!user) {
    throw new AppError("User not found");
  }

  user.address = newAddress;

  await userRepository.save(user);

  return newAddress;
};

const updateAddressService = async (
  idAddress: string,
  address: IAddressRequest
): Promise<Addresses> => {
  const addressRepository = AppDataSource.getRepository(Addresses);

  const aim = await addressRepository.findOne({
    where: {
      id: idAddress,
    },
  });

  if (!aim) {
    throw new AppError("User not found");
  }

  const newAddress = { ...aim, ...address };

  await addressRepository.save(newAddress);

  return newAddress;
};

export { createAddressService, updateAddressService };
