import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories"
import { hash } from "bcryptjs";

interface IUserRequest {
    name: string;
    email: string;
    password: string;
    admin?: boolean;
}

class CreateUserService {
    async execute({ name, email, password, admin = false }: IUserRequest) {
        const userRepository =  getCustomRepository(UserRepositories);

        if(!email || !password) {
            throw new Error("Incorrect email/password");
        }


        const userAlreadyExists = await userRepository.findOne({
            email,
        })

        if(userAlreadyExists) {
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 8);

        const user = userRepository.create({
            name, 
            email, 
            password: passwordHash,
            admin
        });

        await userRepository.save(user);

        delete user.password;

        return user;
    }
}

export { CreateUserService }