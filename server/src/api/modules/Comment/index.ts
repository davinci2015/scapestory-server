import {GraphQLModule} from '@graphql-modules/core'

import {CommentRepository} from 'db/repositories/Comment'
import {tokens} from 'di/tokens'

import {CommentProvider} from './CommentProvider'
import {resolvers, resolversComposition} from './resolvers'
import * as typeDefs from './schema.graphql'
import {composeContext, attachSession, attachCurrentUserId} from 'api/context'

export const CommentModule = new GraphQLModule({
    providers: [
        {provide: tokens.COMMENT_PROVIDER, useClass: CommentProvider},
        {provide: tokens.COMMENT_REPOSITORY, useClass: CommentRepository},
    ],
    typeDefs,
    resolvers,
    resolversComposition,
    context: composeContext([attachCurrentUserId, attachSession])
})
