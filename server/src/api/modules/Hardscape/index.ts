import {GraphQLModule} from '@graphql-modules/core'

import {tokens} from 'di/tokens'

import * as typeDefs from './schema.graphql'
import {resolvers, resolversComposition} from './resolvers'
import {HardscapeProvider} from 'api/modules/Hardscape/HardscapeProvider'
import {HardscapeRepository} from 'db/repositories/Hardscape'
import {AquascapeHardscapeRepository} from 'db/repositories/AquascapeHardscape'

export const HardscapeModule = new GraphQLModule({
    providers: [
        {provide: tokens.HARDSCAPE_PROVIDER, useClass: HardscapeProvider},
        {provide: tokens.HARDSCAPE_REPOSITORY, useClass: HardscapeRepository},
        {provide: tokens.AQUASCAPE_HARDSCAPE_REPOSITORY, useClass: AquascapeHardscapeRepository},
    ],
    typeDefs,
    resolvers,
    resolversComposition
})
