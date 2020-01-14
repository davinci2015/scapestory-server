import {Injectable, Inject} from '@graphql-modules/di'
import Bluebird from 'bluebird'

import {tokens} from 'di/tokens'
import {FilterRepositoryInterface} from 'db/repositories/Filter'
import {Filter} from 'db/models/Filter'
import {AquascapeFilterRepositoryInterface} from 'db/repositories/AquascapeFilter'
import {AquascapeFilter} from 'db/models'

export interface FilterProviderInterface {
    getFilters: () => Bluebird<Filter[]>
    addFilter(model: string): Bluebird<Filter>
    addFilterForAquascape(filterId: number, aquascapeId: number): Bluebird<AquascapeFilter>
    removeFilter(id: number): Bluebird<number>
    removeFilterForAquascape(filterId: number, aquascapeId: number): Bluebird<number>
    findFilterById(id: number): Bluebird<Filter | null>
}

@Injectable()
export class FilterProvider implements FilterProviderInterface {
    constructor(
        @Inject(tokens.FILTER_REPOSITORY)
        private filterRepository: FilterRepositoryInterface,
        @Inject(tokens.AQUASCAPE_PLANT_REPOSITORY)
        private aquacapeFilterRepository: AquascapeFilterRepositoryInterface
    ) {}

    getFilters() {
        return this.filterRepository.getFilters()
    }

    addFilter(model: string) {
        return this.filterRepository.create({model})
    }

    addFilterForAquascape(filterId: number, aquascapeId: number) {
        return this.aquacapeFilterRepository.addFilterForAquascape(filterId, aquascapeId)
    }

    removeFilter(id: number) {
        return this.filterRepository.destroy({where: {id}})
    }

    removeFilterForAquascape(filterId: number, aquascapeId: number) {
        return this.aquacapeFilterRepository.destroy({where: {filterId, aquascapeId}})
    }

    findFilterById(id: number) {
        return this.filterRepository.findFilterById(id)
    }
}
