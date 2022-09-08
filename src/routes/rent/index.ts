import { Router } from "express";
import { createRentController } from "../../controllers/rent/createRent.controller";
import { ensureAuthenticationMiddleware } from "../../middlewares/ensureAuthenticationMiddleware";
import { listAllCarsRentedController } from "../../controllers/rent/listAllCarsRented.controller";

export const rentRouter = Router();

rentRouter.post("", ensureAuthenticationMiddleware, createRentController);
rentRouter.get("", ensureAuthenticationMiddleware, listAllCarsRentedController);
rentRouter.patch("/:id");
