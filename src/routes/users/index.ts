import { Router } from "express";
import { createUserController } from "../../controllers/users";
import validationMiddleware from "../../middlewares/validation.middleware";
import { userSchema } from "../../schemas/users/user.schemas";

const usersRouter = Router();

usersRouter.post("", validationMiddleware(userSchema), createUserController);
usersRouter.get("");
usersRouter.get("/cars");
usersRouter.delete("");

export default usersRouter;
