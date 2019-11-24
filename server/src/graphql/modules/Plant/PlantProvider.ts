import {Injectable, Inject} from '@graphql-modules/di'
import * as Bluebird from 'bluebird'

import {tokens} from 'di/tokens'
import {PlantRepositoryInterface} from 'db/repositories/Plant'
import {Plant} from 'db/models/Plant'

export interface PlantProviderInterface {
    getPlants: () => Bluebird<Plant[]>
}

@Injectable()
export class PlantProvider implements PlantProviderInterface {
    constructor(
        @Inject(tokens.PLANT_REPOSITORY)
        private plantRepository: PlantRepositoryInterface
    ) {}

    getPlants() {
        return this.plantRepository.getPlants()
    }
}
