import { Router } from "express";
import {
  createCategoryController,
  deleteCategoryController,
  listCarsOfCategoryController,
  listCategoryController,
  updateCategoryController,
} from "../../controllers/category";
import { ensureAuthenticationMiddleware } from "../../middlewares/ensureAuthenticationMiddleware";
import userIsAdmMiddleware from "../../middlewares/userIsAdm.middleware";

export const categoryRouter = Router();

categoryRouter.post(
  "",
  ensureAuthenticationMiddleware,
  userIsAdmMiddleware,
  createCategoryController
);

categoryRouter.get("", listCategoryController);

categoryRouter.get("/:id/cars", listCarsOfCategoryController);

categoryRouter.patch(
  "/:id",
  ensureAuthenticationMiddleware,
  userIsAdmMiddleware,
  updateCategoryController
);

categoryRouter.delete(
  "/:id",
  ensureAuthenticationMiddleware,
  userIsAdmMiddleware,
  deleteCategoryController
);
