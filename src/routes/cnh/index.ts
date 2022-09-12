import { Router } from "express";
import createCNHController from "../../controllers/cnh/createCNH.controller";
import deleteCNHController from "../../controllers/cnh/deleteCNH.controller";
import updateCNHController from "../../controllers/cnh/updateCNH.controller";
import { ensureAuthenticationMiddleware } from "../../middlewares/ensureAuthenticationMiddleware";

export const cnhRouter = Router();

cnhRouter.post("", ensureAuthenticationMiddleware, createCNHController);
cnhRouter.patch("", ensureAuthenticationMiddleware, updateCNHController);
cnhRouter.delete("", ensureAuthenticationMiddleware, deleteCNHController);
