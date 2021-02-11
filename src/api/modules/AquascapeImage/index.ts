import {GraphQLModule} from '@graphql-modules/core'

import {tokens} from 'di/tokens'
import {AquascapeImageRepository} from 'db/repositories/AquascapeImage'
import {AquascapeRepository} from 'db/repositories/Aquascape'

import {AquascapeImageProvider} from './AquascapeImageProvider'
import {resolvers, resolversComposition} from './resolvers'
import * as typeDefs from './schema.graphql'
import {AuthModule} from 'api/modules/Auth'

export const AquascapeImageModule = new GraphQLModule({
    providers: [
        {provide: tokens.AQUASCAPE_REPOSITORY, useClass: AquascapeRepository},
        {provide: tokens.AQUASCAPE_IMAGE_PROVIDER, useClass: AquascapeImageProvider},
        {provide: tokens.AQUASCAPE_IMAGE_REPOSITORY, useClass: AquascapeImageRepository},
    ],
    typeDefs,
    resolvers,
    resolversComposition,
    imports: [AuthModule],
})
