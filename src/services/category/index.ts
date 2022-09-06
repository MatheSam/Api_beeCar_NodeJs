import AppDataSource from "../../data-source";
import { Categories } from "../../entities/category.entity";
import { AppError } from "../../errors/AppError";
import { ICategoryRequest } from "../../interfaces/category";

const createCategoryService = async (data: ICategoryRequest): Promise<Categories> => {
    const categoryRepository = AppDataSource.getRepository(Categories);

    const categories = await categoryRepository.find()

    const categoryAlreadyExists = categories.find((c)=> c.name === data.name)

    if(categoryAlreadyExists){
        throw new AppError("Category already exists", 400)
    }

    const category = categoryRepository.create({
        name: data.name,
        automatic: data.automatic,
        type: data.type,
        directionType: data.directionType,
        powerWindows: data.powerWindows,
        pricePerDay: data.pricePerDay,
        pricePerWeekend: data.pricePerWeekend,
        pricePerMouth: data.pricePerMouth,
        pricePeryear: data.pricePeryear,
    })
    
    await categoryRepository.save(category)

    return category;
}


export default createCategoryService;