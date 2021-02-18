import {Injectable} from 'graphql-modules'

import {BaseRepository, EquipmentAquascapeRepositoryInterface} from 'db/repositories/Base'
import {AquascapeFilter} from 'db/models/manyToMany/AquascapeFilter'

export interface AquascapeFilterRepositoryInterface
    extends EquipmentAquascapeRepositoryInterface<AquascapeFilter> {}

@Injectable()
export class AquascapeFilterRepository
    extends BaseRepository<AquascapeFilter>
    implements AquascapeFilterRepositoryInterface {
    constructor() {
        super(AquascapeFilter)
    }

    addFilterForAquascape(filterId: number, aquascapeId: number) {
        return this.create({filterId, aquascapeId})
    }

    addEquipmentForAquascape(filterId: number, aquascapeId: number) {
        return this.create({filterId, aquascapeId})
    }

    removeEquipmentFromAquascape(filterId: number, aquascapeId: number) {
        return this.destroy({where: {filterId, aquascapeId}})
    }
}
