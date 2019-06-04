import {Injectable} from '@graphql-modules/di'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Light} from 'db/models/Light'

export interface LightRepositoryInterface extends BaseRepositoryInterface<Light> {
}

@Injectable()
export class LightRepository extends BaseRepository<Light> {
    constructor() {
        super(Light)
    }
}