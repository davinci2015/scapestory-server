import {GraphQLModule} from '@graphql-modules/core'

import {tokens} from 'di/tokens'

import * as typeDefs from './schema.graphql'
import {resolvers} from './resolvers'
import {LivestockProvider} from 'graphql/modules/Livestock/LivestockProvider'
import {LivestockRepository} from 'db/repositories/Livestock'

export const LivestockModule = new GraphQLModule({
    providers: [
        {provide: tokens.LIVESTOCK_PROVIDER, useClass: LivestockProvider},
        {provide: tokens.LIVESTOCK_REPOSITORY, useClass: LivestockRepository},
    ],
    typeDefs,
    resolvers
})
