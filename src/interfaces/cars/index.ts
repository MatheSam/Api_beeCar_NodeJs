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
  categoriesId: string;
  rentId?: string;
}
