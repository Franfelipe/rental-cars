import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"
import { User } from "../modules/accounts/Entities/User";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}
export async function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new Error("Token missing");
    }

    const [, token] = authHeader.split(" ");
    
    try{
        const { sub: user_id } = verify(token, "5260cc72a2d8d00248cdbb61dbc4979d") as IPayload;
        
        const userRespository = new UsersRepository();

        const user = await userRespository.findById(user_id);
        
        if(!user){
            throw new Error("User not found");
        }

        next()
    }catch{
        throw new Error("Invalid token");
    }
}