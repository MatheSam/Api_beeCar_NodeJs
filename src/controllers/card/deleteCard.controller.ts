import { AppError } from "../../errors/AppError";
import updateCardService from "../../services/card/updateCard.service";
import { Response, Request } from "express";
import { handleError } from "../../middlewares/errors.mid";
import deleteCardservice from "../../services/card/deleteCardService";

const deleteCardController = async (req: Request, res: Response)=>{
    try {
        const { id } = req.params;    
        await deleteCardservice(id)
    
        return res.status(204).send()
      } catch (err) {
        if (err instanceof AppError) {
          handleError(err, res);
        }
      }
}

export default deleteCardController