import listCardService from "../../services/card/listCard.services"
import { Request,Response } from "express"
import { AppError } from "../../errors/AppError"


const listCardController = async (req: Request, res: Response)=>{
    try {
        const card = await listCardService()
        return res.status(200).send(card)
        
    } catch (err) {
        if (err instanceof AppError) {
            return res.status(err.statusCode).send({
              message: err.message,
            });
          }
    }


}

export default listCardController