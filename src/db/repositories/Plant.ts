import {Injectable} from 'graphql-modules'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Plant} from 'db/models/Plant'

export interface PlantRepositoryInterface extends BaseRepositoryInterface<Plant> {
    getPlants(): Promise<Plant[]>
    findPlantById(id: number): Promise<Plant | null>
}

@Injectable()
export class PlantRepository extends BaseRepository<Plant> implements PlantRepositoryInterface {
    constructor() {
        super(Plant)
    }

    getPlants() {
        return this.findAll({where: {predefined: true}})
    }

    findPlantById(id: number) {
        return this.findOne({where: {id}})
    }
}
