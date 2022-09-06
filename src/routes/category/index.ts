import { Router } from "express";
import { createCategoryController, listCategoryController } from "../../controllers/category";

export const categoryRouter = Router();

categoryRouter.post("", createCategoryController);
categoryRouter.get("", listCategoryController);
categoryRouter.get("/:id/cars");
categoryRouter.patch("/:id");
categoryRouter.delete("/:id");
