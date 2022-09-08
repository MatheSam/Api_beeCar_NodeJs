import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";

import { handleError } from "./middlewares/errors.mid";
import { addressRouter } from "./routes/address";
import { cardRouter } from "./routes/card";
import { carsRouter } from "./routes/cars";
import { categoryRouter } from "./routes/category";
import { cnhRouter } from "./routes/cnh";
import { loginRouter } from "./routes/login";
import { rentRouter } from "./routes/rent";
import usersRouter from "./routes/users";
import { AppError } from "./errors/AppError";

const app = express();
app.use(express.json());

app.use("/cars", carsRouter);
app.use("/category", categoryRouter);
app.use("/login", loginRouter);
app.use("/rent", rentRouter);
app.use("/profile", usersRouter);
app.use("/profile/address", addressRouter);
app.use("/profile/card", cardRouter);
app.use("/profile/cnh", cnhRouter);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

export default app;
