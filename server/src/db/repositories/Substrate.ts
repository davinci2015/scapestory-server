import * as Bluebird from 'bluebird'
import {Injectable} from '@graphql-modules/di'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Substrate} from 'db/models/Substrate'

export interface SubstrateRepositoryInterface extends BaseRepositoryInterface<Substrate> {
    getSubstrates: () => Bluebird<Substrate[]>
}

@Injectable()
export class SubstrateRepository extends BaseRepository<Substrate> implements SubstrateRepositoryInterface {
    constructor() {
        super(Substrate)
    }


    getSubstrates() {
        return this.findAll({where: {predefined: true}})
    }
}
