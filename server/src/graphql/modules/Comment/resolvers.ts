import {GraphQLResolveInfo} from 'graphql'
import {ModuleContext} from '@graphql-modules/core'

import {CommentProviderInterface} from 'graphql/modules/Comment/CommentProvider'
import {GraphQLHelper} from 'utils/GraphQLHelper'
import {tokens} from 'di/tokens'
import {User} from 'db/models/User'
import {authenticate} from 'graphql/guards'

export enum CommentEntityType {
    AQUASCAPE = 'AQUASCAPE',
    IMAGE = 'IMAGE'
}

export type CommentsArgs = {
    entityId: number
    entityType: CommentEntityType
}

export type AddCommentArgs = {
    entityId: number
    entityType: CommentEntityType,
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
            const methodMapper = {
                [CommentEntityType.AQUASCAPE]: provider.getCommentsForAquascape,
                [CommentEntityType.IMAGE]: provider.getCommentsForAquascapeImage
            }

            return await methodMapper[args.entityType](args.entityId, fields)
        },
    },
    Mutation: {
        async addComment(root, args: AddCommentArgs, context: ModuleContext) {
            const provider: CommentProviderInterface = context.injector.get(tokens.COMMENT_PROVIDER)
            const methodMapper = {
                [CommentEntityType.AQUASCAPE]: provider.addCommentForAquascape,
                [CommentEntityType.IMAGE]: provider.addCommentForAquascapeImage
            }

            return await methodMapper[args.entityType](
                args.entityId,
                context.currentUser.id,
                args.content,
                args.parentCommentId
            )
        }
    }
}

export const resolversComposition = {
    'Mutation.addComment': [authenticate]
}