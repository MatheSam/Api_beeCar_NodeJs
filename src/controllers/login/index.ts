import { AppError } from "../../errors/AppError";
import { ILogin } from "../../interfaces/login";
import createLoginService from "../../services/login";
import { Request, Response } from 'express'


const createLoginController = async(req: Request, res: Response) => {
    try {
        const {email, password}: ILogin = req.body
        const token = await createLoginService({email, password})
        return res.json({token})   
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(200).send({
              message: error.message
            });
          }
    }
}

export { createLoginController }
