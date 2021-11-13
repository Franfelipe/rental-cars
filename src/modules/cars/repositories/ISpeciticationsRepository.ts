import { Specification } from "../Entities/Specification";

interface ICreateSpecificarionDTO{
    name: string;
    description:string
}

interface ISpecificationsRepository{

    create({name, description}: ICreateSpecificarionDTO): Promise<void>;
    list(): Promise<Specification[]>;
    findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository, ICreateSpecificarionDTO }