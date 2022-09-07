/* import AppDataSource from "../../data-source"
import { Cards } from "../../entities/card.entity"
import { Users } from "../../entities/users.entity"
import { ICardRequest } from "../../interfaces/card"



const createCardService = async (userId:string,{cardNumber,validate,name}:ICardRequest)=>{

    const usersRepository = AppDataSource.getRepository(Users)
    const cardRepository = AppDataSource.getRepository(Cards)

    const card = cardRepository.create({
        cardNumber,
        validate,
        name
    })

    await cardRepository.save(card)

    // await usersRepository.update()

    const user = await usersRepository.findOneBy({id:userId})
    user.cards = card!


    await usersRepository.save({user.card})

    return card
}

export default createCardService */