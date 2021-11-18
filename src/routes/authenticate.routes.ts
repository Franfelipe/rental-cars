import { Router } from "express";
import { AutheticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUSerController";

const authenticateRoutes = Router();
const autheticateUserController = new AutheticateUserController();

authenticateRoutes.post("/sessions", autheticateUserController.handle);


export {authenticateRoutes}