import {Injectable, Inject} from 'graphql-modules'

import {FilterRepositoryInterface, FilterRepository} from 'db/repositories/Filter'
import {Filter} from 'db/models/Filter'

export interface FilterProviderInterface {
    getFilters: () => Promise<Filter[]>
}

@Injectable()
export class FilterProvider implements FilterProviderInterface {
    constructor(
        @Inject(FilterRepository)
        private filterRepository: FilterRepositoryInterface
    ) {}

    getFilters() {
        return this.filterRepository.getFilters()
    }
}
