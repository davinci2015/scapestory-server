import {GraphQLResolveInfo} from 'graphql'

import {CommentProviderInterface, CommentProvider} from 'api/modules/Comment/CommentProvider'
import {GraphQLHelper} from 'utils/GraphQLHelper'
import {User} from 'db/models/User'
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
    LikeEntityType,
} from 'interfaces/graphql/types'
import {LikeProviderInterface} from '../Like/LikeProvider'
import {LikeProvider} from 'api/modules/Like/LikeProvider'
import {AquascapeProvider} from 'api/modules/Aquascape/AquascapeProvider'
import {NotificationProvider} from 'api/modules/Notification/NotificationProvider'

const modelMapping = {
    user: User,
    likes: Like,
}

export const resolvers = {
    Query: {
        async comments(root, args: QueryCommentsArgs, context, info: GraphQLResolveInfo) {
            const provider: CommentProviderInterface = context.injector.get(CommentProvider)
            const fields = GraphQLHelper.getIncludeableFields(info, modelMapping)

            return await provider.getComments(args.entity, args.entityId, fields)
        },
    },
    Aquascape: {
        async comments(
            aquascape: Aquascape,
            args: QueryCommentsArgs,
            context,
            info: GraphQLResolveInfo
        ) {
            const provider: CommentProviderInterface = context.injector.get(CommentProvider)
            const fields = GraphQLHelper.getIncludeableFields(info, modelMapping)
            return await provider.getComments(CommentEntityType.Aquascape, aquascape.id, fields)
        },
    },
    Like: {
        async comment(like: Like, args, context) {
            const provider: CommentProviderInterface = context.injector.get(CommentProvider)

            if (!like.commentId) {
                return null
            }

            return await provider.getCommentById(like.commentId)
        },
    },
    Notification: {
        async comment(notification: Notification, args, context) {
            const provider: CommentProviderInterface = context.injector.get(CommentProvider)

            if (!notification.commentId) {
                return null
            }

            return await provider.getCommentById(notification.commentId)
        },
    },
    Mutation: {
        async addComment(root, args: MutationAddCommentArgs, context) {
            const provider: CommentProviderInterface = context.injector.get(CommentProvider)
            const aquascapeProvider: AquascapeProviderInterface = context.injector.get(
                AquascapeProvider
            )
            const notificationProvider: NotificationProvider = context.injector.get(
                NotificationProvider
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
        async removeComment(root, args: MutationRemoveCommentArgs, context) {
            const provider: CommentProviderInterface = context.injector.get(CommentProvider)
            const likeProvider: LikeProviderInterface = context.injector.get(LikeProvider)
            const notificationProvider: NotificationProvider = context.injector.get(
                NotificationProvider
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
            likeProvider.removeLikes(
                notificationsToRemove.map(notification => ({
                    entityId: notification.entityId,
                    entity: LikeEntityType.Comment,
                }))
            )

            return removedComment
        },
    },
}
