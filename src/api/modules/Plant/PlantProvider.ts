import {Injectable, Inject} from 'graphql-modules'

import {PlantRepositoryInterface, PlantRepository} from 'db/repositories/Plant'
import {Plant} from 'db/models/Plant'
import {AquascapePlant} from 'db/models/manyToMany/AquascapePlant'
import {
    AquascapePlantRepositoryInterface,
    AquascapePlantRepository,
} from 'db/repositories/AquascapePlant'

export interface PlantProviderInterface {
    getPlants(): Promise<Plant[]>
    addPlant(name: string): Promise<Plant>
    addPlantForAquascape(plantId: number, aquascapeId: number): Promise<AquascapePlant>
    removePlant(id: number): Promise<number>
    removePlantForAquascape(plantId: number, aquascapeId: number): Promise<number>
    findPlantById(id: number): Promise<Plant | null>
}

@Injectable()
export class PlantProvider implements PlantProviderInterface {
    constructor(
        @Inject(PlantRepository)
        private plantRepository: PlantRepositoryInterface,
        @Inject(AquascapePlantRepository)
        private aquacapePlantRepository: AquascapePlantRepositoryInterface
    ) {}

    getPlants() {
        return this.plantRepository.getPlants()
    }

    addPlant(name: string) {
        return this.plantRepository.create({name})
    }

    addPlantForAquascape(plantId: number, aquascapeId: number) {
        return this.aquacapePlantRepository.addPlantForAquascape(plantId, aquascapeId)
    }

    removePlant(id: number) {
        return this.plantRepository.destroy({where: {id}})
    }

    removePlantForAquascape(plantId: number, aquascapeId: number) {
        return this.aquacapePlantRepository.destroy({where: {plantId, aquascapeId}})
    }

    findPlantById(id: number) {
        return this.plantRepository.findPlantById(id)
    }
}
