import * as Bluebird from 'bluebird'
import {Injectable} from '@graphql-modules/di'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Hardscape} from 'db/models/Hardscape'

export interface HardscapeRepositoryInterface extends BaseRepositoryInterface<Hardscape> {
    getHardscape: () => Bluebird<Hardscape[]>
}

@Injectable()
export class HardscapeRepository extends BaseRepository<Hardscape> implements HardscapeRepositoryInterface {
    constructor() {
        super(Hardscape)
    }


    getHardscape() {
        return this.findAll({where: {predefined: true}})
    }
}
