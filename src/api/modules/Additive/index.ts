import {GraphQLModule} from '@graphql-modules/core'

import {tokens} from 'di/tokens'

import {AdditiveProvider} from 'api/modules/Additive/AdditiveProvider'
import {AdditiveRepository} from 'db/repositories/Additive'

import * as typeDefs from './schema.graphql'
import {resolvers} from './resolvers'

export const AdditiveModule = new GraphQLModule({
    providers: [
        {provide: tokens.ADDITIVE_PROVIDER, useClass: AdditiveProvider},
        {provide: tokens.ADDITIVE_REPOSITORY, useClass: AdditiveRepository},
    ],
    typeDefs,
    resolvers
})
