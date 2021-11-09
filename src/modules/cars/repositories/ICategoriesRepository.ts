import { Category } from "../Entities/Category";

interface ICreateCategoryDTO{
    name: string,
    description: string;
}

interface ICategoriesRepository{
    findByName(name: string): Category;
    list(): Category[];
    create({name, description}:ICreateCategoryDTO);
}

export { ICategoriesRepository, ICreateCategoryDTO };