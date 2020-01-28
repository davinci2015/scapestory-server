import {Injectable} from '@graphql-modules/di'

import {BaseRepository, EquipmentAquascapeRepositoryInterface} from 'db/repositories/Base'
import {AquascapeAdditive} from 'db/models/manyToMany/AquascapeAdditive'

export interface AquascapeAdditiveRepositoryInterface
    extends EquipmentAquascapeRepositoryInterface<AquascapeAdditive> {}

@Injectable()
export class AquascapeAdditiveRepository extends BaseRepository<AquascapeAdditive>
    implements AquascapeAdditiveRepositoryInterface {
    constructor() {
        super(AquascapeAdditive)
    }

    addAdditiveForAquascape(additiveId: number, aquascapeId: number) {
        return this.create({additiveId, aquascapeId})
    }

    addEquipmentForAquascape(additiveId: number, aquascapeId: number) {
        return this.create({additiveId, aquascapeId})
    }

    removeEquipmentFromAquascape(additiveId: number, aquascapeId: number) {
        return this.destroy({where: {additiveId, aquascapeId}})
    }
}
