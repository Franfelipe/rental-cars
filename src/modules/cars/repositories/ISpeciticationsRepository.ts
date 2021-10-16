import { Specification } from "../model/Specification";

interface ICreateSpecificarionDTO{
    name: string;
    description:string
}

interface ISpecificationsRepository{

    create({name, description}: ICreateSpecificarionDTO): void;
    list(): Specification[];
    findByName(name: string): Specification;
}

export { ISpecificationsRepository, ICreateSpecificarionDTO }