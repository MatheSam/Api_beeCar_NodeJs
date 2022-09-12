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

  const verifingUser = await userRepository.findOneBy({ id: idUser });

  if (Boolean(verifingUser?.address)) {
    throw new AppError(
      "User already have address registered, please delete your address or do an update",
      401
    );
  }

  //const userAlreadyHaveAddress = verifingUser.find(el => el.add)

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
  idUser: string,
  address: IAddressRequest
): Promise<Addresses> => {
  const userRepository = AppDataSource.getRepository(Users);
  const addressRepository = AppDataSource.getRepository(Addresses);

  const user = await userRepository.findOneBy({ id: idUser });

  const userAddress = await addressRepository.findOne({
    where: {
      id: user?.address?.id,
    },
  });

  if (!userAddress) {
    throw new AppError("Address not found", 404);
  }

  const newAddress = await addressRepository.save({
    ...userAddress,
    ...address,
  });

  return newAddress;
};

export { createAddressService, updateAddressService };
