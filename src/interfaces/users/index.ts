export interface IUserRequest {
  name: string;
  birthDate: string;
  cpf: string;
  email: string;
  isAdm?: boolean;
  password: string;
  isActive?: boolean;
}
