import {GraphQLModule} from '@graphql-modules/core'

import {tokens} from 'di/tokens'

import * as typeDefs from './schema.graphql'
import {resolvers} from './resolvers'
import {AdditiveProvider} from 'graphql/modules/Additive/AdditiveProvider'
import {AdditiveRepository} from 'db/repositories/Additive'

export const AdditiveModule = new GraphQLModule({
    providers: [
        {provide: tokens.ADDITIVE_PROVIDER, useClass: AdditiveProvider},
        {provide: tokens.ADDITIVE_REPOSITORY, useClass: AdditiveRepository},
    ],
    typeDefs,
    resolvers
})
