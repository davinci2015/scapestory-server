import {GraphQLModule} from '@graphql-modules/core'

import {tokens} from 'di/tokens'

import * as typeDefs from './schema.graphql'
import {resolvers} from './resolvers'
import {HardscapeProvider} from 'graphql/modules/Hardscape/HardscapeProvider'
import {HardscapeRepository} from 'db/repositories/Hardscape'

export const HardscapeModule = new GraphQLModule({
    providers: [
        {provide: tokens.HARDSCAPE_PROVIDER, useClass: HardscapeProvider},
        {provide: tokens.HARDSCAPE_REPOSITORY, useClass: HardscapeRepository},
    ],
    typeDefs,
    resolvers
})
