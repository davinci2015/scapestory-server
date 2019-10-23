import {GraphQLResolveInfo} from 'graphql'
import {ModuleContext} from '@graphql-modules/core'

import {CommentProviderInterface} from 'graphql/modules/Comment/CommentProvider'
import {GraphQLHelper} from 'utils/GraphQLHelper'
import {tokens} from 'di/tokens'
import {User} from 'db/models/User'
import {authenticate} from 'graphql/guards'
import {CommentEntityType} from 'db/repositories/Comment'
import {AuthenticationContext} from 'graphql/context'

export type CommentsArgs = {
    entityId: number
    entity: CommentEntityType
}

export type MutationAddCommentArgs = {
    entityId: number
    entity: CommentEntityType,
    content: string
    parentCommentId?: number
}

const modelMapping = {
    user: User
}

export const resolvers = {
    Query: {
        async comments(root, args: CommentsArgs, context: ModuleContext, info: GraphQLResolveInfo) {
            const provider: CommentProviderInterface = context.injector.get(tokens.COMMENT_PROVIDER)
            const fields = GraphQLHelper.getIncludeableFields(info, modelMapping)
            return await provider.getComments(args.entity, args.entityId, fields)
        },
    },
    Mutation: {
        async addComment(root, args: MutationAddCommentArgs, context: ModuleContext & AuthenticationContext) {
            const provider: CommentProviderInterface = context.injector.get(tokens.COMMENT_PROVIDER)
            return await provider.addComment({
                entityType: args.entity,
                entityId: args.entityId,
                userId: context.currentUserId,
                content: args.content,
                parentCommentId: args.parentCommentId
            })
        }
    }
}

export const resolversComposition = {
    'Mutation.addComment': [authenticate]
}