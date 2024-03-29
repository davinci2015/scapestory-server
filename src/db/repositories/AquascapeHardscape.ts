import {Injectable} from 'graphql-modules'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {AquascapeHardscape} from 'db/models/manyToMany/AquascapeHardscape'

export interface AquascapeHardscapeRepositoryInterface
    extends BaseRepositoryInterface<AquascapeHardscape> {
    addHardscapeForAquascape(hardscapeId: number, aquascapeId: number): Promise<AquascapeHardscape>
}

@Injectable()
export class AquascapeHardscapeRepository
    extends BaseRepository<AquascapeHardscape>
    implements AquascapeHardscapeRepositoryInterface {
    constructor() {
        super(AquascapeHardscape)
    }

    addHardscapeForAquascape(hardscapeId: number, aquascapeId: number) {
        return this.create({hardscapeId, aquascapeId})
    }
}
