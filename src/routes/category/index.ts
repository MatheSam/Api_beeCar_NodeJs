import { Router } from "express";
import { createCategoryController } from "../../controllers/category";

export const categoryRouter = Router();

categoryRouter.post("", createCategoryController);
categoryRouter.get("");
categoryRouter.get("/:id/cars");
categoryRouter.patch("/:id");
categoryRouter.delete("/:id");
