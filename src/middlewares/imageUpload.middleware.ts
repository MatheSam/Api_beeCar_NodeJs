import { Request, Response, NextFunction } from "express";
import { deleteUpload } from "../utils";
import { cloudinaryServer } from "../utils/cloudinary";

const uploadImageMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const fileStr = req.file;
    if (!fileStr) {
      res.status(400).json({ message: "image is required" });
    }
    const result = await cloudinaryServer.uploader.upload(fileStr!.path, {
      upload_preset: "beecar",
    });
    req.upload = { img: result.url };
    deleteUpload(fileStr);
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
};

export default uploadImageMiddleware;
