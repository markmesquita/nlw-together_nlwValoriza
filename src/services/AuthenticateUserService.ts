import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/UserRepositories"

interface IAutheticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAutheticateRequest) {
    const userRepositories = getCustomRepository(UserRepositories);

    const user = await userRepositories.findOne({
      email
    });

    if (!user) {
      throw new Error("Incorrect email/password");
    }
    
    const passwordMatch = await compare(password, user.password);
    
    if (!passwordMatch) {
      throw new Error("Incorrect email/password");
    }

    const token = sign(
      {
        email: user.email
      }, 
      "7164db1ef8013d54b966da2407603977", 
      {
        subject: user.id,
        expiresIn: "1d"
      }
    );

    return token;
  }
}

export { AuthenticateUserService }