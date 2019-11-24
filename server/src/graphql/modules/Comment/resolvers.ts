import {GraphQLResolveInfo} from 'graphql'
import {ModuleContext} from '@graphql-modules/core'

import {CommentProviderInterface} from 'graphql/modules/Comment/CommentProvider'
import {GraphQLHelper} from 'utils/GraphQLHelper'
import {tokens} from 'di/tokens'
import {User} from 'db/models/User'
import {authenticate} from 'graphql/guards'
import {CommentEntityType} from 'db/repositories/Comment'
import {AuthenticationContext} from 'graphql/context'
import {Like} from 'db/models/Like'
import {Aquascape} from 'db/models/Aquascape'

export type CommentsArgs = {
    entityId: number
    entity: CommentEntityType
}

export type MutationAddCommentArgs = {
    entityId: number
    entity: CommentEntityType
    content: string
    parentCommentId?: number
}

export type MutationRemoveCommentArgs = {
    id: number
}

const modelMapping = {
    user: User,
    likes: Like,
}

export const resolvers = {
    Query: {
        async comments(
            root,
            args: CommentsArgs,
            context: ModuleContext,
            info: GraphQLResolveInfo
        ) {
            const provider: CommentProviderInterface = context.injector.get(
                tokens.COMMENT_PROVIDER
            )
            const fields = GraphQLHelper.getIncludeableFields(
                info,
                modelMapping
            )
            return await provider.getComments(
                args.entity,
                args.entityId,
                fields
            )
        },
    },
    Aquascape: {
        async comments(
            aquascape: Aquascape,
            args: CommentsArgs,
            context: ModuleContext,
            info: GraphQLResolveInfo
        ) {
            const provider: CommentProviderInterface = context.injector.get(
                tokens.COMMENT_PROVIDER
            )
            const fields = GraphQLHelper.getIncludeableFields(
                info,
                modelMapping
            )
            return await provider.getComments(
                CommentEntityType.AQUASCAPE,
                aquascape.id,
                fields
            )
        },
    },
    Mutation: {
        async addComment(
            root,
            args: MutationAddCommentArgs,
            context: ModuleContext
        ) {
            const provider: CommentProviderInterface = context.injector.get(
                tokens.COMMENT_PROVIDER
            )
            return await provider.addComment({
                entityType: args.entity,
                entityId: args.entityId,
                userId: context.currentUserId,
                content: args.content,
                parentCommentId: args.parentCommentId,
            })
        },
        async removeComment(
            root,
            args: MutationRemoveCommentArgs,
            context: ModuleContext & AuthenticationContext
        ) {
            const provider: CommentProviderInterface = context.injector.get(
                tokens.COMMENT_PROVIDER
            )
            return await provider.removeComment(args.id, context.currentUserId)
        },
    },
}

export const resolversComposition = {
    'Mutation.addComment': [authenticate],
    'Mutation.removeComment': [authenticate],
}
