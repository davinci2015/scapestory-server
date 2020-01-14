import Bluebird from 'bluebird'
import {Injectable} from '@graphql-modules/di'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Filter} from 'db/models/Filter'

export interface FilterRepositoryInterface extends BaseRepositoryInterface<Filter> {
    getFilters: () => Bluebird<Filter[]>
}

@Injectable()
export class FilterRepository extends BaseRepository<Filter> implements FilterRepositoryInterface {
    constructor() {
        super(Filter)
    }

    getFilters() {
        return this.findAll({where: {predefined: true}})
    }
}
