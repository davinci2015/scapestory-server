import {Injectable} from '@graphql-modules/di'
import {Light} from 'db/models/Light'
import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/BaseRepository'

export interface LightRepositoryInterface extends BaseRepositoryInterface<Light> {
}

@Injectable()
export class LightRepository extends BaseRepository<Light> {
    constructor() {
        super(Light)
    }
}