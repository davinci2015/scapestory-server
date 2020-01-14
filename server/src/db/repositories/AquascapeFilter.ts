import Bluebird from 'bluebird'
import {Injectable} from '@graphql-modules/di'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {AquascapeFilter} from 'db/models/manyToMany/AquascapeFilter'

export interface AquascapeFilterRepositoryInterface
    extends BaseRepositoryInterface<AquascapeFilter> {
    addFilterForAquascape(filterId: number, aquascapeId: number): Bluebird<AquascapeFilter>
}

@Injectable()
export class AquascapeFilterRepository extends BaseRepository<AquascapeFilter>
    implements AquascapeFilterRepositoryInterface {
    constructor() {
        super(AquascapeFilter)
    }

    addFilterForAquascape(filterId: number, aquascapeId: number) {
        return this.create({filterId, aquascapeId})
    }
}
