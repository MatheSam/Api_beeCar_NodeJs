import { NextFunction, Request, Response } from "express";

const userIsAdmMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isAdm } = req.user;

  if (!isAdm) {
    res.status(403).json({ message: "You aren't allowed to do that" });
  } else {
    next();
  }
};

export default userIsAdmMiddleware;
