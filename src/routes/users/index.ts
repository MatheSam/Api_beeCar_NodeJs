import { Router } from "express";
import {
  createUserController,
  listProfileCarsController,
  listUsersController,
  updateUserController,
} from "../../controllers/users";
import { ensureAuthenticationMiddleware } from "../../middlewares/ensureAuthenticationMiddleware";
import isOwnerMiddleware from "../../middlewares/isOwner.middleware";
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
usersRouter.get(
  "/cars",
  ensureAuthenticationMiddleware,
  isOwnerMiddleware,
  listProfileCarsController
);

usersRouter.patch(
  "",
  ensureAuthenticationMiddleware,
  isOwnerMiddleware,
  updateUserController
);

usersRouter.delete("");

export default usersRouter;
