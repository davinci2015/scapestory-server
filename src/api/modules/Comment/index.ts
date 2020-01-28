import {GraphQLModule} from '@graphql-modules/core'

import {CommentRepository} from 'db/repositories/Comment'
import {tokens} from 'di/tokens'

import {CommentProvider} from './CommentProvider'
import {resolvers, resolversComposition} from './resolvers'
import * as typeDefs from './schema.graphql'
import {composeContext, attachSession, attachCurrentUserId} from 'api/context'
import {UserModule} from 'api/modules/User'
import {AquascapeModule} from 'api/modules/Aquascape'
import {LikeModule} from 'api/modules/Like'

export const CommentModule = new GraphQLModule({
    providers: [
        {provide: tokens.COMMENT_PROVIDER, useClass: CommentProvider},
        {provide: tokens.COMMENT_REPOSITORY, useClass: CommentRepository},
    ],
    typeDefs,
    resolvers,
    resolversComposition,
    context: composeContext([attachCurrentUserId, attachSession]),
    imports: [
        UserModule,
        AquascapeModule,
        LikeModule
    ]
})
