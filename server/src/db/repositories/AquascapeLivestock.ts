import Bluebird from 'bluebird'
import {Injectable} from '@graphql-modules/di'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {AquascapeLivestock} from 'db/models/manyToMany/AquascapeLivestock'

export interface AquascapeLivestockRepositoryInterface extends BaseRepositoryInterface<AquascapeLivestock> {
    addLivestockForAquascape(livestockId: number, aquascapeId: number): Bluebird<AquascapeLivestock>
}

@Injectable()
export class AquascapeLivestockRepository
    extends BaseRepository<AquascapeLivestock>
    implements AquascapeLivestockRepositoryInterface {
    constructor() {
        super(AquascapeLivestock)
    }

    addLivestockForAquascape(livestockId: number, aquascapeId: number) {
        return this.create({livestockId, aquascapeId})
    }
}
