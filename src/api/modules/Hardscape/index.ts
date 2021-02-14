import {GraphQLModule} from '@graphql-modules/core'

import {tokens} from 'di/tokens'

import * as typeDefs from './schema.graphql'
import {resolvers, resolversComposition} from './resolvers'
import {HardscapeProvider} from 'api/modules/Hardscape/HardscapeProvider'
import {HardscapeRepository} from 'db/repositories/Hardscape'
import {AquascapeHardscapeRepository} from 'db/repositories/AquascapeHardscape'
import {attachCurrentUserId, composeContext} from 'api/context'
import {AquascapeRepository} from 'db/repositories/Aquascape'

export const HardscapeModule = new GraphQLModule({
    providers: [
        {provide: tokens.AQUASCAPE_REPOSITORY, useClass: AquascapeRepository},
        {provide: tokens.HARDSCAPE_PROVIDER, useClass: HardscapeProvider},
        {provide: tokens.HARDSCAPE_REPOSITORY, useClass: HardscapeRepository},
        {provide: tokens.AQUASCAPE_HARDSCAPE_REPOSITORY, useClass: AquascapeHardscapeRepository},
    ],
    typeDefs,
    resolvers,
    resolversComposition,
    context: composeContext([attachCurrentUserId]),
})
