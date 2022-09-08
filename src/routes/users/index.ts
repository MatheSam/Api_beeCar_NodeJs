import { Router } from "express";
import {
  createUserController,
  listUsersController,
} from "../../controllers/users";
import { ensureAuthenticationMiddleware } from "../../middlewares/ensureAuthenticationMiddleware";
import userIsAdmMiddleware from "../../middlewares/userIsAdm.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";
import { userSchema } from "../../schemas/users/user.schemas";

const usersRouter = Router();

usersRouter.post("", validationMiddleware(userSchema), createUserController);
usersRouter.get(
  "",
  ensureAuthenticationMiddleware,
  userIsAdmMiddleware,
  listUsersController
);
usersRouter.get("/cars");
usersRouter.delete("");

export default usersRouter;
