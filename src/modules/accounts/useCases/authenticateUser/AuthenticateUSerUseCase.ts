import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@errors/AppError";

interface IRequest{
    email:string,
    password:string
}

interface IResponse{
    user:{
        name,
        email
    },
    token
}

@injectable()
class AuthenticateUserUseCase{
    constructor(
        @inject("UsersRepository")
        private userRespository: IUsersRepository
    ){

    }
    async execute({email, password}:IRequest): Promise<IResponse>{
        const user = await this.userRespository.findByEmail(email);

        if(!user){
            throw new AppError("Email or password incorrect!", 401);
        }

        const verifyPassword = await compare(password, user.password);

        if(!verifyPassword){
            throw new AppError("Email or password incorrect!", 401);
        }

        const token = sign({email: user.email}, "5260cc72a2d8d00248cdbb61dbc4979d", {
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenResponse: IResponse = {
            user:{
                name: user.name,
                email: user.email
            },
            token
        };

        return tokenResponse
    }
}

export { AuthenticateUserUseCase }