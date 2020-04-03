import {ModuleContext} from '@graphql-modules/core'

import {tokens} from 'di/tokens'
import {authenticate} from 'api/guards'
import {LikeProviderInterface} from 'api/modules/Like/LikeProvider'
import {AuthenticationContext} from 'api/context'
import {LikeEntityType, MutationLikeArgs, NotificationType} from 'interfaces/graphql/types'
import {NotificationProvider} from 'api/modules/Notification/NotificationProvider'
import {AquascapeProviderInterface} from 'api/modules/Aquascape/AquascapeProvider'
import {Notification, Aquascape} from 'db/models'
import logger from 'logger'
import {CommentProviderInterface} from '../Comment/CommentProvider'
import {CreateNotificationArgs} from 'db/repositories/Notification'

export const resolvers = {
    Aquascape: {
        async likesCount(aquascape: Aquascape, _, context: ModuleContext) {
            const provider: LikeProviderInterface = context.injector.get(tokens.LIKE_PROVIDER)
            return await provider.countLikes(LikeEntityType.Aquascape, aquascape.id)
        },
        async likes(aquascape: Aquascape, args, context) {
            const provider: LikeProviderInterface = context.injector.get(tokens.LIKE_PROVIDER)
            return await provider.getLikes(
                LikeEntityType.Aquascape,
                aquascape.id,
                args.limit || undefined
            )
        },
    },
    Notification: {
        async like(notification: Notification, _, context: ModuleContext) {
            const provider: LikeProviderInterface = context.injector.get(tokens.LIKE_PROVIDER)

            if (!notification.likeId) {
                return null
            }

            return await provider.getLikeById(notification.likeId)
        },
    },
    Mutation: {
        async like(_, args: MutationLikeArgs, context: ModuleContext & AuthenticationContext) {
            const provider: LikeProviderInterface = context.injector.get(tokens.LIKE_PROVIDER)
            const aquascapeProvider: AquascapeProviderInterface = context.injector.get(
                tokens.AQUASCAPE_PROVIDER
            )
            const commentProvider: CommentProviderInterface = context.injector.get(
                tokens.COMMENT_PROVIDER
            )
            const notificationProvider: NotificationProvider = context.injector.get(
                tokens.NOTIFICATION_PROVIDER
            )

            const like = await provider.like(args.entity, args.entityId, context.currentUserId)

            if (like) {
                const notification: CreateNotificationArgs = {
                    creatorId: context.currentUserId,
                    entityId: like.id,
                    notificationType: NotificationType.Like,
                    notifiers: [],
                }

                if (args.entity === LikeEntityType.Aquascape) {
                    aquascapeProvider
                        .getAquascapeById(args.entityId)
                        .then(aquascape => {
                            if (aquascape?.userId && aquascape.userId !== context.currentUserId) {
                                notification.notifiers.push(aquascape.userId)
                                return notificationProvider.createNotification(notification)
                            }
                        })
                        .catch(logger.error)
                } else if (args.entity === LikeEntityType.Comment) {
                    commentProvider
                        .getCommentById(args.entityId)
                        .then(comment => {
                            if (comment?.userId && comment.userId !== context.currentUserId) {
                                notification.notifiers.push(comment.userId)
                                return notificationProvider.createNotification(notification)
                            }
                        })
                        .catch(logger.error)
                }
            }

            return like
        },
        async dislike(_, args: MutationLikeArgs, context: ModuleContext & AuthenticationContext) {
            const provider: LikeProviderInterface = context.injector.get(tokens.LIKE_PROVIDER)
            return await provider.dislike(args.entity, args.entityId, context.currentUserId)
        },
    },
}

export const resolversComposition = {
    'Mutation.like': [authenticate],
    'Mutation.dislike': [authenticate],
}
