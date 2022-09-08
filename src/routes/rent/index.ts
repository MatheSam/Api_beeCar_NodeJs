import { Router } from "express";
import { createRentController } from "../../controllers/rent/createRent.controller";
import { ensureAuthenticationMiddleware } from "../../middlewares/ensureAuthenticationMiddleware";

export const rentRouter = Router();

rentRouter.post("", ensureAuthenticationMiddleware, createRentController);
rentRouter.get("");
rentRouter.patch("/:id");
