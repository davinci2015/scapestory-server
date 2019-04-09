import {Injectable} from '@graphql-modules/di'
import {Aquascape} from 'db/models/Aquascape'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/BaseRepository'

export interface AquascapeRepositoryInterface extends BaseRepositoryInterface<Aquascape> {
}

@Injectable()
export class AquascapeRepository extends BaseRepository<Aquascape> {
    constructor() {
        super(Aquascape)
    }
}