import {Injectable, Inject} from '@graphql-modules/di'
import Bluebird from 'bluebird'

import {tokens} from 'di/tokens'
import {FilterRepositoryInterface} from 'db/repositories/Filter'
import {Filter} from 'db/models/Filter'

export interface FilterProviderInterface {
    getFilters: () => Bluebird<Filter[]>
}

@Injectable()
export class FilterProvider implements FilterProviderInterface {
    constructor(
        @Inject(tokens.FILTER_REPOSITORY)
        private filterRepository: FilterRepositoryInterface
    ) {}

    getFilters() {
        return this.filterRepository.getFilters()
    }
}
