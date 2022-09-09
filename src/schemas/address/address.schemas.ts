import * as yup from "yup";
import { SchemaOf } from "yup";
import { IAddressRequest } from "../../interfaces/address";

const addressSchema: SchemaOf<IAddressRequest> = yup.object().shape({
  city: yup.string().required("city is required"),
  district: yup.string().required("district is required"),
  number: yup.string().required("number is required"),
  state: yup.string().required("state is required"),
  zipCode: yup.string().required("zipCode is required"),
});

export { addressSchema };
