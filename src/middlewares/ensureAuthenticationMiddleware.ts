import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors/AppError";

const ensureAuthenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      throw new AppError("Invalid token", 401);
    }

    token = token.split(" ")[1];

    jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      (error: any, decoded: any) => {
        if (error) {
          throw new AppError("Invalid token", 401);
        }

        req.user = {
          isAdm: decoded.isAdm,
          id: decoded.sub,
        };

        next();
      }
    );
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({
        message: error.message,
      });
    }
  }
};

export { ensureAuthenticationMiddleware };
