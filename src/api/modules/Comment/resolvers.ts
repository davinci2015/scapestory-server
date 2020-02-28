import {GraphQLResolveInfo} from 'graphql'
import {ModuleContext} from '@graphql-modules/core'

import {CommentProviderInterface} from 'api/modules/Comment/CommentProvider'
import {GraphQLHelper} from 'utils/GraphQLHelper'
import {tokens} from 'di/tokens'
import {User} from 'db/models/User'
import {authenticate} from 'api/guards'
import {AuthenticationContext} from 'api/context'
import {Like} from 'db/models/Like'
import {Aquascape} from 'db/models/Aquascape'
import {Notification} from 'db/models'
import {NotificationProvider} from '../Notification/NotificationProvider'
import logger from 'logger'
import {AquascapeProviderInterface} from '../Aquascape/AquascapeProvider'
import {
    MutationAddCommentArgs,
    MutationRemoveCommentArgs,
    QueryCommentsArgs,
    CommentEntityType,
    NotificationType,
} from 'interfaces/graphql/types'

const modelMapping = {
    user: User,
    likes: Like,
}

export const resolvers = {
    Query: {
        async comments(
            root,
            args: QueryCommentsArgs,
            context: ModuleContext,
            info: GraphQLResolveInfo
        ) {
            const provider: CommentProviderInterface = context.injector.get(tokens.COMMENT_PROVIDER)
            const fields = GraphQLHelper.getIncludeableFields(info, modelMapping)

            return await provider.getComments(args.entity, args.entityId, fields)
        },
    },
    Aquascape: {
        async comments(
            aquascape: Aquascape,
            args: QueryCommentsArgs,
            context: ModuleContext,
            info: GraphQLResolveInfo
        ) {
            const provider: CommentProviderInterface = context.injector.get(tokens.COMMENT_PROVIDER)
            const fields = GraphQLHelper.getIncludeableFields(info, modelMapping)
            return await provider.getComments(CommentEntityType.Aquascape, aquascape.id, fields)
        },
    },
    Like: {
        async comment(like: Like, args, context: ModuleContext) {
            const provider: CommentProviderInterface = context.injector.get(tokens.COMMENT_PROVIDER)

            if (!like.commentId) {
                return null
            }

            return await provider.getCommentById(like.commentId)
        },
    },
    Notification: {
        async comment(notification: Notification, args, context: ModuleContext) {
            const provider: CommentProviderInterface = context.injector.get(tokens.COMMENT_PROVIDER)

            if (!notification.commentId) {
                return null
            }

            return await provider.getCommentById(notification.commentId)
        },
    },
    Mutation: {
        async addComment(
            root,
            args: MutationAddCommentArgs,
            context: ModuleContext & AuthenticationContext
        ) {
            const provider: CommentProviderInterface = context.injector.get(tokens.COMMENT_PROVIDER)
            const aquascapeProvider: AquascapeProviderInterface = context.injector.get(
                tokens.AQUASCAPE_PROVIDER
            )
            const notificationProvider: NotificationProvider = context.injector.get(
                tokens.NOTIFICATION_PROVIDER
            )

            const comment = await provider.addComment({
                entityType: args.entity,
                entityId: args.entityId,
                userId: context.currentUserId,
                content: args.content,
                parentCommentId: args.parentCommentId,
            })

            aquascapeProvider
                .getAquascapeById(args.aquascapeId)
                .then(aquascape => {
                    if (aquascape?.userId && aquascape.userId !== context.currentUserId) {
                        notificationProvider.createNotification({
                            creatorId: context.currentUserId,
                            entityId: comment.id,
                            notificationType: NotificationType.Comment,
                            notifiers: [aquascape.userId],
                        })
                    }
                })
                .catch(logger.error)

            if (comment.parentCommentId) {
                provider.getCommentById(comment.parentCommentId).then(parentComment => {
                    if (parentComment && context.currentUserId !== parentComment.userId) {
                        notificationProvider.createNotification({
                            creatorId: context.currentUserId,
                            entityId: comment.id,
                            notificationType: NotificationType.Reply,
                            notifiers: [parentComment.userId],
                        })
                    }
                })
            }

            return comment
        },
        async removeComment(
            root,
            args: MutationRemoveCommentArgs,
            context: ModuleContext & AuthenticationContext
        ) {
            const provider: CommentProviderInterface = context.injector.get(tokens.COMMENT_PROVIDER)
            const notificationProvider: NotificationProvider = context.injector.get(
                tokens.NOTIFICATION_PROVIDER
            )

            const childComments = await provider.getChildComments(args.id)
            const removedComment = await provider.removeComment(args.id, context.currentUserId)

            let notificationsToRemove = [
                {
                    entityId: removedComment.id,
                    notificationType: NotificationType.Comment,
                },
            ]

            if (childComments && childComments.length) {
                notificationsToRemove = [
                    ...notificationsToRemove,
                    ...childComments.map(comment => ({
                        entityId: comment.id,
                        notificationType: NotificationType.Reply,
                    })),
                ]
            }

            notificationProvider.removeNotifications(notificationsToRemove).catch(logger.error)

            return removedComment
        },
    },
}

export const resolversComposition = {
    'Mutation.addComment': [authenticate],
    'Mutation.removeComment': [authenticate],
}
