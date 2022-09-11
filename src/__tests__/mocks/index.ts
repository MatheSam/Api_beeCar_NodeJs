import { IAddressRequest } from "../../interfaces/address";
import { ICarsRequest } from "../../interfaces/cars";
import { ICategoryRequest } from "../../interfaces/category";
import { ILogin } from "../../interfaces/login";
import { IRentRequest } from "../../interfaces/rent";
import { IUserRequest } from "../../interfaces/users";

export const mockedAddress: IAddressRequest = {
  city: "Curitiba",
  district: "Botânico",
  number: "420",
  state: "PR",
  zipCode: "81540020",
};

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
  licensePlate: "456875",
  color: "black",
  model: "New Fiesta",
  fuel: "G",
  year: 2015,
  brand: "Ford",
  categoryName: "Categoria A",
  km: 5000,
  hp: 125,
  price: 35000,
  img: "../../../",
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
  pricePerWeekend: 890,
  pricePerMouth: 1990,
  pricePeryear: 12000,
};

export const mockedRent: IRentRequest = {
  finalDate: "10/12/2021",
  initialDate: "09/12/2021",
  finalHour: "08:45",
  initialHour: "15:30",
  carId: "1",
};
