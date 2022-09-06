import { IAddressRequest } from "../../interfaces/address";
import { IUserRequest } from "../../interfaces/users";

export const mockedAddress: IAddressRequest = {
  city: "Curitiba",
  district: "Botânico",
  number: "420",
  state: "PR",
  zipCode: "81540020",
};

export const mockedUser: IUserRequest = {
  birthDate: "10/12/1996",
  cpf: "15865335683",
  email: "juarez@mail.com",
  name: "Juarez",
  password: "123456",
};
