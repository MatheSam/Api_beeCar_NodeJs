import { Response } from "express";
import { AppError } from "../errors/AppError";

export const handleError = async (err: any, response: Response) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      code: err.statusCode,
      message: err.message,
    });
  }
};
