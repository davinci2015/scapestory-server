import * as Bluebird from 'bluebird'
import {Injectable} from '@graphql-modules/di'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {AquascapePlant} from 'db/models/manyToMany/AquascapePlant'

export interface AquascapePlantRepositoryInterface extends BaseRepositoryInterface<AquascapePlant> {
    addPlantForAquascape(plantId: number, aquascapeId: number): Bluebird<AquascapePlant>
}

@Injectable()
export class AquascapePlantRepository extends BaseRepository<AquascapePlant>
    implements AquascapePlantRepositoryInterface {
    constructor() {
        super(AquascapePlant)
    }

    addPlantForAquascape(plantId: number, aquascapeId: number) {
        return this.create({plantId, aquascapeId})
    }
}
