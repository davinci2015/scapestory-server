import {GraphQLModule} from '@graphql-modules/core'

import {tokens} from 'di/tokens'

import * as typeDefs from './schema.graphql'
import {resolvers} from './resolvers'
import {FilterProvider} from 'api/modules/Filter/FilterProvider'
import {FilterRepository} from 'db/repositories/Filter'
import {AquascapeRepository} from 'db/repositories/Aquascape'
import {AquascapeFilterRepository} from 'db/repositories/AquascapeFilter'

export const FilterModule = new GraphQLModule({
    providers: [
        {provide: tokens.AQUASCAPE_REPOSITORY, useClass: AquascapeRepository},
        {provide: tokens.FILTER_PROVIDER, useClass: FilterProvider},
        {provide: tokens.FILTER_REPOSITORY, useClass: FilterRepository},
        {provide: tokens.AQUASCAPE_FILTER_REPOSITORY, useClass: AquascapeFilterRepository},
    ],
    typeDefs,
    resolvers,
})
