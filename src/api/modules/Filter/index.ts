import {createModule} from 'graphql-modules'

import typeDefs from './schema'
import {resolvers} from './resolvers'
import {FilterProvider} from 'api/modules/Filter/FilterProvider'
import {FilterRepository} from 'db/repositories/Filter'

export const FilterModule = createModule({
    id: 'FilterModule',
    providers: [FilterProvider, FilterRepository],
    typeDefs,
    resolvers,
})
