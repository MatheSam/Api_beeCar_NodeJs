import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { handleError } from "../../middlewares/errors.mid";
import { createAddressService } from "../../services/address";

const createAddressController = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const address = req.body;

    const newAddress = await createAddressService(id, address);

    return res.status(200).json(newAddress);
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

export { createAddressController };
