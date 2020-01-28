import {Injectable, Inject} from '@graphql-modules/di'
import * as Bluebird from 'bluebird'

import {tokens} from 'di/tokens'
import {PlantRepositoryInterface} from 'db/repositories/Plant'
import {Plant} from 'db/models/Plant'
import {AquascapePlant} from 'db/models/manyToMany/AquascapePlant'
import {AquascapePlantRepositoryInterface} from 'db/repositories/AquascapePlant'

export interface PlantProviderInterface {
    getPlants(): Bluebird<Plant[]>
    addPlant(name: string): Bluebird<Plant>
    addPlantForAquascape(plantId: number, aquascapeId: number): Bluebird<AquascapePlant>
    removePlant(id: number): Bluebird<number>
    removePlantForAquascape(plantId: number, aquascapeId: number): Bluebird<number>
    findPlantById(id: number): Bluebird<Plant | null>
}

@Injectable()
export class PlantProvider implements PlantProviderInterface {
    constructor(
        @Inject(tokens.PLANT_REPOSITORY)
        private plantRepository: PlantRepositoryInterface,
        @Inject(tokens.AQUASCAPE_PLANT_REPOSITORY)
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
