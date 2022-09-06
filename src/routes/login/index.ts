import { Router } from "express";
import { createLoginController } from "../../controllers/login";

export const loginRouter = Router();

loginRouter.post("", createLoginController);
