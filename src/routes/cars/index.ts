import { Router } from "express";
import createCarController from "../../controllers/cars/createCar.controller";
import listCarsController from "../../controllers/cars/listCars.controller";
import listSpecificCarController from "../../controllers/cars/listSpecificCar.controller";
import softDeleteCarController from "../../controllers/cars/softDeleteCar.controller";
import updateCarController from "../../controllers/cars/updateCar.controller";
import { ensureAuthenticationMiddleware } from "../../middlewares/ensureAuthenticationMiddleware";

import uploadImageMiddleware from "../../middlewares/imageUpload.middleware";
import multer from "multer";

export const carsRouter = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: "upload",
    filename: (request: any, file: any, callback): any => {
      const filename: any = `${file.originalname}`;
      return callback(null, filename);
    },
  }),
});

carsRouter.post(
  "",
  upload.single("image"),
  uploadImageMiddleware,
  createCarController
);

carsRouter.get("", listCarsController);
carsRouter.get("/:id", listSpecificCarController);
carsRouter.patch("/:id", ensureAuthenticationMiddleware, updateCarController);
carsRouter.delete(
  "/:id",
  ensureAuthenticationMiddleware,
  softDeleteCarController
);
