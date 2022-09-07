import { Router } from "express";
import {
  createCategoryController,
  listCarsOfCategoryController,
  listCategoryController,
} from "../../controllers/category";
import { ensureAuthenticationMiddleware } from "../../middlewares/ensureAuthenticationMiddleware";

export const categoryRouter = Router();

categoryRouter.post(
  "",
  ensureAuthenticationMiddleware,
  createCategoryController
);
categoryRouter.get("", listCategoryController);
categoryRouter.get("/:id/cars", listCarsOfCategoryController);
categoryRouter.patch("/:id");
categoryRouter.delete("/:id");
