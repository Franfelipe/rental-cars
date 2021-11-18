import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUSerUseCase";

class AutheticateUserController{

    async handle(request: Request, response: Response): Promise<Response>{
        const {email, password} = request.body;
        
        const authenticateUseCase = container.resolve(AuthenticateUserUseCase);
        
        const token = await authenticateUseCase.execute({email, password});

        return response.json(token);
    }
}

export { AutheticateUserController }