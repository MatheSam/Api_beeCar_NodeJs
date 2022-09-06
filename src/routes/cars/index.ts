import { Router } from "express";
import createCarController from "../../controllers/cars/createCar.controller";

export const carsRouter = Router();

carsRouter.post("", createCarController);
carsRouter.get("");
carsRouter.get("/:id");
carsRouter.patch("/:id");
carsRouter.delete("/:id");
