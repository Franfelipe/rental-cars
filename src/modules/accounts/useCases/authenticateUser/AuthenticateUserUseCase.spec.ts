import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUSerUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMenory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", ()=>{
    beforeEach(() => {
        userRepositoryInMenory = new UserRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMenory);
        createUserUseCase = new CreateUserUseCase(userRepositoryInMenory);
    });
    it("Should be able authenticate an user", async ()=>{
        const user: ICreateUserDTO = {
            name: "user",
            email: "user@test.com",
            username: "username",
            driver_license: "01234",
            password: "1234"
        }

        await createUserUseCase.execute(user);

        const resut = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(resut).toHaveProperty("token");
    });

    it("Should not be able to authenticate an nonexistent user", () => {
        expect(async() => {
            await authenticateUserUseCase.execute({
                email: "test@test.com",
                password: "123"
            });    
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to authenticate with incorrect password", () =>{
        expect(async() => {

            const user: ICreateUserDTO = {
                name: "user",
                email: "user@test.com",
                username: "username",
                driver_license: "01234",
                password: "1234"
            }
    
            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "1"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

});