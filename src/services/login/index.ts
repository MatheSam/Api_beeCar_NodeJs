import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { ILogin } from "../../interfaces/login";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createLoginService = async ({
    email,
    password,
  }: ILogin): Promise<string> => {
    const userRepository = AppDataSource.getRepository(Users);
  
    const user = await userRepository.findOne({
      where: {
        email: email,
      },
    });
  
    if (!user) {
      throw new AppError("Invalid email or password", 400);
    }
  
    if (!user.isActive) {
      throw new AppError("Invalid user", 400);
    }
  
    const matchPassword = await compare(password, user.password);
  
    if (!matchPassword) {
      throw new AppError("Invalid email or password", 400);
    }
  
    const token = jwt.sign(
      {
        isAdm: user.isAdm,
        userId: user.id
      },
      process.env.SECRET_KEY as string,
      {
        subject: user.id,
        expiresIn: "2h",
      }
    );
  
    return token;
  };
  
  export default createLoginService;
