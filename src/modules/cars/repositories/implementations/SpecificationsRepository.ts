import { Specification } from "../../Entities/Specification";
import { ICreateSpecificarionDTO, ISpecificationsRepository } from "../ISpeciticationsRepository";


class SpecificationsRepository implements ISpecificationsRepository{

    private specifications: Specification[];
    constructor(){
        this.specifications = []
    }

    create({ name, description }: ICreateSpecificarionDTO): void {
        const specification = new Specification();

        const specificationAlreadyExists = this.findByName(name);

        if(specificationAlreadyExists){
            throw new Error('Specification alredy exists!');
        }
        Object.assign(specification, {
            name,
            description,
            created_at: new Date()
        });

        this.specifications.push(specification);
    }
    
    list(): Specification[] {
        throw new Error("Method not implemented.");
    }

    findByName(name: string): Specification {
        const specification = this.specifications.find(
            (specification) => specification.name === name
            );

        return specification;
    } 

}

export { SpecificationsRepository }