import * as Bluebird from 'bluebird'
import {Injectable} from '@graphql-modules/di'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Additive} from 'db/models/Additive'

export interface AdditiveRepositoryInterface extends BaseRepositoryInterface<Additive> {
    getAdditives: () => Bluebird<Additive[]>
}

@Injectable()
export class AdditiveRepository extends BaseRepository<Additive> implements AdditiveRepositoryInterface {
    constructor() {
        super(Additive)
    }


    getAdditives() {
        return this.findAll({where: {predefined: true}})
    }
}
