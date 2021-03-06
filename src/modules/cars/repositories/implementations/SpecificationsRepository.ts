import { getRepository, Repository } from "typeorm";
import { Specification } from "../../Entities/Specification";
import { ICreateSpecificarionDTO, ISpecificationsRepository } from "../ISpeciticationsRepository";


class SpecificationsRepository implements ISpecificationsRepository{
    private repository: Repository<Specification>

    constructor(){
        this.repository = getRepository(Specification)
    }

    async create({ name, description }: ICreateSpecificarionDTO): Promise<void> {
        const specification = this.repository.create({
            name,
            description
        });

        await this.repository.save(specification);
    }
    
    async list(): Promise<Specification[]> {
        const specifications = await this.repository.find();

        return specifications;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = this.repository.findOne({ name });

        return specification;
    }

}

export { SpecificationsRepository }