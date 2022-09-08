import { IAddressRequest } from "../../interfaces/address";
import { ILogin } from "../../interfaces/login";
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

export const mockedLoginUser: ILogin = {
  email: "juarez@mail.com",
  password: "123456",
};

export const mockedUserAdm: IUserRequest = {
  birthDate: "10/12/1996",
  cpf: "15865335683",
  email: "ademir@mail.com",
  name: "Ademir",
  password: "123456",
  isAdm: true,
};

export const mockedLoginAdm: ILogin = {
  email: "ademir@mail.com",
  password: "123456",
};
