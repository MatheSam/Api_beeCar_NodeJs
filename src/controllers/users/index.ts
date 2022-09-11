import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { handleError } from "../../middlewares/errors.mid";
import {
  createUserService,
  deleteUserService,
  listProfileCarsService,
  listUsersService,
  updateUserService,
} from "../../services/users";

const createUserController = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const newUser = await createUserService(user);
    return res.status(201).json(instanceToPlain(newUser));
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

const listProfileCarsController = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const cars = await listProfileCarsService(id);
    return res.json(cars);
    //return res.json(instanceToPlain(cars));
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

const updateUserController = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const { id } = req.user;

    const newUser = await updateUserService(id, userData);

    res.json(instanceToPlain(newUser));
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

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    await deleteUserService(id);

    return res.status(204).json({ message: "User deleted with successful" });
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

export {
  createUserController,
  listUsersController,
  listProfileCarsController,
  updateUserController,
  deleteUserController,
};
