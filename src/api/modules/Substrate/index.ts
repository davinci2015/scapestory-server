import {GraphQLModule} from '@graphql-modules/core'

import {tokens} from 'di/tokens'

import * as typeDefs from './schema.graphql'
import {resolvers} from './resolvers'
import {SubstrateProvider} from 'api/modules/Substrate/SubstrateProvider'
import {SubstrateRepository} from 'db/repositories/Substrate'

export const SubstrateModule = new GraphQLModule({
    providers: [
        {provide: tokens.SUBSTRATE_PROVIDER, useClass: SubstrateProvider},
        {provide: tokens.SUBSTRATE_REPOSITORY, useClass: SubstrateRepository},
    ],
    typeDefs,
    resolvers
})
