import { IAddressRequest } from "../../interfaces/address";
import { ICardRequest } from "../../interfaces/card";
import { ICarsRequest } from "../../interfaces/cars";
import { ICategoryRequest } from "../../interfaces/category";
import { ICnhRequest } from "../../interfaces/cnh";
import { ILogin } from "../../interfaces/login";
import { IRentRequest } from "../../interfaces/rent";
import { IUserRequest } from "../../interfaces/users";

export const mockedNewUser: IUserRequest = {
  birthDate: "10/12/1996",
  cpf: "15865335683",
  email: "joab@mail.com",
  name: "Joab",
  password: "123456",
};

export const mockedUser: IUserRequest = {
  birthDate: "10/12/1996",
  cpf: "15865335683",
  email: "juarez@mail.com",
  name: "Juarez",
  password: "123456",
};

export const mockedAttUser = {
  email: "juninho@mail.com",
};

export const mockedLoginUser: ILogin = {
  email: "juarez@mail.com",
  password: "123456",
};

export const mockedAdmin: IUserRequest = {
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

export const mockedCars: ICarsRequest = {
  licensePlate: "1234567",
  color: "black",
  model: "New Fiesta",
  fuel: "G",
  year: 2015,
  brand: "Ford",
  categoryName: "Categoria A",
  km: 5000,
  hp: 125,
  price: 35000,
};

export const mockedCarsUpdated = {
  km: 8000,
};

export const mockedCategory: ICategoryRequest = {
  name: "Categoria A",
  automatic: false,
  type: "hatch",
  airConditioning: true,
  directionType: "eletro-hidraulica",
  powerWindows: true,
  pricePerDay: 500,
  pricePerMouth: 1990,
  pricePeryear: 12000,
};

export const mockedAttCategory = {
  name: "Categoria Atualizada",
};

export const mockedRent: IRentRequest = {
  finalDate: "10/12/2023",
  initialDate: "09/12/2023",
  finalHour: "08:45",
  initialHour: "15:30",
  carId: "1",
};

export const mockedAttRent = {
  finalHour: "15:45",
};

export const mockedAddress: IAddressRequest = {
  city: "Jacundá",
  district: "Caiobá",
  number: "420",
  state: "RR",
  zipCode: "84520060",
};

export const mockedAttAddress = {
  number: "50",
};

export const mockedCard: ICardRequest = {
  cardNumber: "123546798123",
  name: "Juarez Silveira",
  validate: "10/09/2025",
};

export const mockedAttCard = {
  validate: "10/10/2025",
};

export const mockedCnh: ICnhRequest = {
  number: "13245687900",
  type: "AB",
  validate: "10/09/2025",
};

export const mockedAttCnh = {
  type: "C",
};
