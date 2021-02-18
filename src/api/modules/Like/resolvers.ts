import {LikeProviderInterface, LikeProvider} from 'api/modules/Like/LikeProvider'
import {LikeEntityType, MutationLikeArgs, NotificationType} from 'interfaces/graphql/types'
import {NotificationProvider} from 'api/modules/Notification/NotificationProvider'
import {
    AquascapeProviderInterface,
    AquascapeProvider,
} from 'api/modules/Aquascape/AquascapeProvider'
import {Notification, Aquascape} from 'db/models'
import logger from 'logger'
import {CreateNotificationArgs} from 'db/repositories/Notification'
import {CommentProvider, CommentProviderInterface} from 'api/modules/Comment/CommentProvider'
import {LikeDataLoaderInterface, LikeDataLoader} from 'db/loaders/Like'

export const resolvers = {
    Aquascape: {
        async likesCount(aquascape: Aquascape, _, context) {
            const loader: LikeDataLoaderInterface = context.injector.get(LikeDataLoader)
            return await loader.countLikes(LikeEntityType.Aquascape, aquascape.id)
        },
        async likes(aquascape: Aquascape, args, context) {
            const provider: LikeProviderInterface = context.injector.get(LikeProvider)
            return await provider.getLikes(
                LikeEntityType.Aquascape,
                aquascape.id,
                args.limit || undefined
            )
        },
    },
    Notification: {
        async like(notification: Notification, _, context) {
            const provider: LikeProviderInterface = context.injector.get(LikeProvider)

            if (!notification.likeId) {
                return null
            }

            return await provider.getLikeById(notification.likeId)
        },
    },
    Mutation: {
        async like(_, args: MutationLikeArgs, context) {
            const provider: LikeProviderInterface = context.injector.get(LikeProvider)
            const aquascapeProvider: AquascapeProviderInterface = context.injector.get(
                AquascapeProvider
            )
            const commentProvider: CommentProviderInterface = context.injector.get(CommentProvider)
            const notificationProvider: NotificationProvider = context.injector.get(
                NotificationProvider
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
        async dislike(_, args: MutationLikeArgs, context) {
            const provider: LikeProviderInterface = context.injector.get(LikeProvider)
            return await provider.dislike(args.entity, args.entityId, context.currentUserId)
        },
    },
}
