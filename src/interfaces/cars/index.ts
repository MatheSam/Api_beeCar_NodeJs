import { Categories } from "../../entities/category.entity";

export interface ICarsRequest {
  licensePlate: string;
  color: string;
  model: string;
  fuel: string;
  year: number;
  rented?: boolean;
  document?: boolean;
  isActive?: boolean;
  maintenence?: boolean;
  brand: string;
  price: number;
  km: number;
  hp: number;
  img: string;
  categoryName: string;
  rentId?: string;
}

export interface ICarsUpdate {
  licensePlate: string;
  color: string;
  model: string;
  fuel: string;
  year: number;
  rented?: boolean;
  document?: boolean;
  maintenence?: boolean;
  brand: string;
  price: number;
  km: number;
  hp: number;
  img: string;
  categoryName: string;
}
