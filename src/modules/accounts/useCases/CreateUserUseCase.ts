import { inject, injectable } from "tsyringe";

import { hash } from "bcrypt";

import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({name, username, email, driver_license, password}: ICreateUserDTO): Promise<void>{
    
        const passwordHash = await hash(password, 8);
        await this.usersRepository.create({
            name,
            username,
            email,
            driver_license,
            password: passwordHash
        });
    }
}

export { CreateUserUseCase }