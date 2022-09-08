import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { handleError } from "../../middlewares/errors.mid";
import { createUserService, listUsersService } from "../../services/users";

const createUserController = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const newUser = await createUserService(user);
    return res.status(200).json(instanceToPlain(newUser));
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
};

const listUsersController = async (req: Request, res: Response) => {
  try {
    const users = await listUsersService();
    return res.json(instanceToPlain(users));
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    } else {
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
};

export { createUserController, listUsersController };
