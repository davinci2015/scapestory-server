import {Injectable} from '@graphql-modules/di'

import {BaseRepository, EquipmentAquascapeRepositoryInterface} from 'db/repositories/Base'
import {AquascapeSubstrate} from 'db/models/manyToMany/AquascapeSubstrate'

export interface AquascapeSubstrateRepositoryInterface
    extends EquipmentAquascapeRepositoryInterface<AquascapeSubstrate> {}

@Injectable()
export class AquascapeSubstrateRepository extends BaseRepository<AquascapeSubstrate>
    implements AquascapeSubstrateRepositoryInterface {
    constructor() {
        super(AquascapeSubstrate)
    }

    addSubstrateForAquascape(substrateId: number, aquascapeId: number) {
        return this.create({substrateId, aquascapeId})
    }

    addEquipmentForAquascape(substrateId: number, aquascapeId: number) {
        return this.create({substrateId, aquascapeId})
    }

    removeEquipmentFromAquascape(substrateId: number, aquascapeId: number) {
        return this.destroy({where: {substrateId, aquascapeId}})
    }
}
