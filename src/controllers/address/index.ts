import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { handleError } from "../../middlewares/errors.mid";
import {
  createAddressService,
  updateAddressService,
} from "../../services/address";

const updateAddressController = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const address = req.body;

    const newAddress = await updateAddressService(id, address);

    return res.json(newAddress);
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

const createAddressController = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const address = req.body;

    const newAddress = await createAddressService(id, address);

    return res.status(201).json(newAddress);
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

export { createAddressController, updateAddressController };
