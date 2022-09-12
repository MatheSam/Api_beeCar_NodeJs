<<<<<<< HEAD
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
=======
import { Router } from "express";
import createCarController from "../../controllers/cars/createCar.controller";
import listCarsController from "../../controllers/cars/listCars.controller";
import listSpecificCarController from "../../controllers/cars/listSpecificCar.controller";
import softDeleteCarController from "../../controllers/cars/softDeleteCar.controller";
import updateCarController from "../../controllers/cars/updateCar.controller";
import { ensureAuthenticationMiddleware } from "../../middlewares/ensureAuthenticationMiddleware";

export const carsRouter = Router();

carsRouter.post("", ensureAuthenticationMiddleware, createCarController);
carsRouter.get("", listCarsController);
carsRouter.get("/:id", listSpecificCarController);
carsRouter.patch("/:id", ensureAuthenticationMiddleware, updateCarController);
carsRouter.delete(
  "/:id",
  ensureAuthenticationMiddleware,
  softDeleteCarController
);
>>>>>>> 5d79aac062baf78d5ebbd1ea6d813dae2767109c
