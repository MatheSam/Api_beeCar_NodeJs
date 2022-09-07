/* import AppDataSource from "../../data-source"
import { Cards } from "../../entities/card.entity"
import { AppError } from "../../errors/AppError"
import { ICardRequest } from "../../interfaces/card"


const updateCardService = async (cardNumber:string,{cardNumber,validate,name}:ICardRequest)=>{

    const cardRepository = AppDataSource.getRepository(Cards)

    const card =await cardRepository.findOneBy({where:{cardNumber}})

    
    if(!card){
        throw new AppError("card not found",400)
    }

    const newCard = {
        cardNumber:card
    }


}

export default updateCardService */