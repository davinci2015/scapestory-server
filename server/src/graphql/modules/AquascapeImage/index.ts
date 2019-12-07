import {GraphQLModule} from '@graphql-modules/core'

import {tokens} from 'di/tokens'
import {attachCurrentUserId, composeContext} from 'graphql/context'
import {AquascapeImageRepository} from 'db/repositories/AquascapeImage'

import {AquascapeImageProvider} from './AquascapeImageProvider'
import {resolvers, resolversComposition} from './resolvers'
import * as typeDefs from './schema.graphql'

// @ts-ignore
export const AquascapeImageModule = new GraphQLModule({
    providers: [
        {provide: tokens.AQUASCAPE_IMAGE_PROVIDER, useClass: AquascapeImageProvider},
        {provide: tokens.AQUASCAPE_IMAGE_REPOSITORY, useClass: AquascapeImageRepository}
    ],
    typeDefs,
    resolvers,
    resolversComposition,
    context: composeContext([attachCurrentUserId])
})
