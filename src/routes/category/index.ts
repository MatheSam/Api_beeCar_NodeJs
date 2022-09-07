import { Router } from "express";
import {
  createCategoryController,
  listCarsOfCategoryController,
  listCategoryController,
  updateCategoryController,
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
categoryRouter.patch("/:id", ensureAuthenticationMiddleware, updateCategoryController);
categoryRouter.delete("/:id");
