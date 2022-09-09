import { Request, Response, NextFunction } from "express";

const isOwnerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const loggedUser = req.user.id;
  console.log(loggedUser, id , " ffffffffffffffffffffffff")
  if (loggedUser === id) {
     next();
  }

  return res.status(400).json({
    message: "You dont have authorization",
  });
};

export default isOwnerMiddleware;
