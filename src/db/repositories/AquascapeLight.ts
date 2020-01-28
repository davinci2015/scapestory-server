import {Injectable} from '@graphql-modules/di'

import {BaseRepository, EquipmentAquascapeRepositoryInterface} from 'db/repositories/Base'
import {AquascapeLight} from 'db/models/manyToMany/AquascapeLight'

export interface AquascapeLightRepositoryInterface
    extends EquipmentAquascapeRepositoryInterface<AquascapeLight> {}

@Injectable()
export class AquascapeLightRepository extends BaseRepository<AquascapeLight>
    implements AquascapeLightRepositoryInterface {
    constructor() {
        super(AquascapeLight)
    }

    addLightForAquascape(lightId: number, aquascapeId: number) {
        return this.create({lightId, aquascapeId})
    }

    addEquipmentForAquascape(lightId: number, aquascapeId: number) {
        return this.create({lightId, aquascapeId})
    }

    removeEquipmentFromAquascape(lightId: number, aquascapeId: number) {
        return this.destroy({where: {lightId, aquascapeId}})
    }
}
