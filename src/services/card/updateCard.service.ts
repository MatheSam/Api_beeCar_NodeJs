import AppDataSource from "../../data-source"
import { Cards } from "../../entities/card.entity"
import { Users } from "../../entities/users.entity"
import { AppError } from "../../errors/AppError"
import { ICardRequest } from "../../interfaces/card"


const updateCardService = async ({cardNumber,validate,name}:ICardRequest)=>{

    const cardRepository = AppDataSource.getRepository(Cards)
   

    const card = await cardRepository.findOneBy({cardNumber})

    if(!card){
        throw new AppError("card not found",404)
    }

  const newCard =   await cardRepository.update(card,{
        cardNumber:cardNumber || card.cardNumber,
        validate:validate || card.validate ,
        name:name || card.name
    })
    
  return  newCard    
    
    
    
}

export default updateCardService





