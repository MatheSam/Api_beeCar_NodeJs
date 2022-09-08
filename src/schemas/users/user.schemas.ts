import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest } from "../../interfaces/users";

const userSchema: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().required(),
  birthDate: yup.string().required(),
  email: yup.string().required().email("must be an email"),
  password: yup.string().required(),
  cpf: yup.string().required().max(11, "the limit is 11 digits"),
  isAdm: yup.boolean(),
});

export { userSchema };
