import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { handleError } from "./middlewares/errors.mid";
import { addressRouter } from "./routes/address";
import { cardRouter } from "./routes/card";
import { carsRouter } from "./routes/cars";
import { categoryRouter } from "./routes/category";
import { cnhRouter } from "./routes/cnh";
import { loginRouter } from "./routes/login";
import { maintenenceRouter } from "./routes/maintenence";
import { rentRouter } from "./routes/rent";
import { usersRouter } from "./routes/users";

const app = express();
app.use(express.json());

app.use("/address", addressRouter);
app.use("/card", cardRouter);
app.use("/cars", carsRouter);
app.use("/category", categoryRouter);
app.use("/cnh", cnhRouter);
app.use("/login", loginRouter);
app.use("/rent", rentRouter);
app.use("/users", usersRouter);

app.use(handleError);

export default app;
