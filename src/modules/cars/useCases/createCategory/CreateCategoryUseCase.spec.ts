import { AppError } from "@errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    }); // chama essa função e instancia as variaveis sempre antes de cada teste;

    it("Should be able to create a new category", async ()=>{
        // const createCategory = new CreateCategoryUseCase(new CategoriesRepositoryInMemory());
        const category = {
            name: "Category Test", 
            description: "Test"
        }
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName("Category Test");

        expect(categoryCreated).toHaveProperty("id");
    });

    it("Should not be able to create two categories with same name", async()=>{
        expect(async () => {
            const category = {
                name: "Category Test", 
                description: "Test"
            }
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            });
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            });
        }).rejects.toBeInstanceOf(AppError)
    });
})