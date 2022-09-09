import { Router } from "express";
import createCarController from "../../controllers/cars/createCar.controller";
import listCarsController from "../../controllers/cars/listCars.controller";
import listSpecificCarController from "../../controllers/cars/listSpecificCar.controller";
import softDeleteCarController from "../../controllers/cars/softDeleteCar.controller";
import updateCarController from "../../controllers/cars/updateCar.controller";

export const carsRouter = Router();

carsRouter.post("", createCarController);
carsRouter.get("", listCarsController);
carsRouter.get("/:id", listSpecificCarController);
carsRouter.patch("/:id", updateCarController);
carsRouter.delete("/:id", softDeleteCarController);
