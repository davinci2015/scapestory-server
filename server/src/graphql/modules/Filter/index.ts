import {GraphQLModule} from '@graphql-modules/core'

import {tokens} from 'di/tokens'

import * as typeDefs from './schema.graphql'
import {resolvers} from './resolvers'
import {FilterProvider} from 'graphql/modules/Filter/FilterProvider'
import {FilterRepository} from 'db/repositories/Filter'

export const FilterModule = new GraphQLModule({
    providers: [
        {provide: tokens.FILTER_PROVIDER, useClass: FilterProvider},
        {provide: tokens.FILTER_REPOSITORY, useClass: FilterRepository},
    ],
    typeDefs,
    resolvers
})
