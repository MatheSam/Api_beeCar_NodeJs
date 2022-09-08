import { Router } from "express";
import createCardController from "../../controllers/card/createCard.controller";
import deleteCardController from "../../controllers/card/deleteCard.controller";
import listCardController from "../../controllers/card/listCardController";
import updateCardController from "../../controllers/card/updateCardController";
import { ensureAuthenticationMiddleware } from "../../middlewares/ensureAuthenticationMiddleware";

export const cardRouter = Router();

cardRouter.post("", ensureAuthenticationMiddleware, createCardController);
cardRouter.get("", ensureAuthenticationMiddleware, listCardController);
cardRouter.patch("/:id",ensureAuthenticationMiddleware, updateCardController);
cardRouter.delete("/:id", ensureAuthenticationMiddleware, deleteCardController);
