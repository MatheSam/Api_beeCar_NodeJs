import { Router } from "express";
import {
  createAddressController,
  updateAddressController,
} from "../../controllers/address";
import { ensureAuthenticationMiddleware } from "../../middlewares/ensureAuthenticationMiddleware";
import validationMiddleware from "../../middlewares/validation.middleware";
import { addressSchema } from "../../schemas/address/address.schemas";

export const addressRouter = Router();

addressRouter.post(
  "",
  ensureAuthenticationMiddleware,
  validationMiddleware(addressSchema),
  createAddressController
);
addressRouter.patch(
  "",
  ensureAuthenticationMiddleware,
  updateAddressController
);
