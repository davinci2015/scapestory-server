import {GraphQLModule} from '@graphql-modules/core'

import {tokens} from 'di/tokens'

import {resolvers, resolversComposition} from './resolvers'
import * as typeDefs from './schema.graphql'
import {LikeProvider} from 'api/modules/Like/LikeProvider'
import {LikeRepository} from 'db/repositories/Like'
import {attachCurrentUserId, composeContext} from 'api/context'

export const LikeModule = new GraphQLModule({
    providers: [
        {provide: tokens.LIKE_PROVIDER, useClass: LikeProvider},
        {provide: tokens.LIKE_REPOSITORY, useClass: LikeRepository},
    ],
    typeDefs,
    resolvers,
    resolversComposition,
    context: composeContext([attachCurrentUserId])
})
