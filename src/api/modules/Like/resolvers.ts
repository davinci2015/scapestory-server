import {ModuleContext} from '@graphql-modules/core'

import {tokens} from 'di/tokens'
import {authenticate} from 'api/guards'
import {LikeProviderInterface} from 'api/modules/Like/LikeProvider'
import {AuthenticationContext} from 'api/context'
import {LikeEntityType, MutationLikeArgs} from 'interfaces/graphql/types'
import {NotificationType} from 'db/repositories/Notification'
import {NotificationProvider} from 'api/modules/Notification/NotificationProvider'
import {AquascapeProviderInterface} from 'api/modules/Aquascape/AquascapeProvider'
import {Notification, Aquascape} from 'db/models'
import logger from 'logger'

export const resolvers = {
    Aquascape: {
        async likesCount(aquascape: Aquascape, _, context: ModuleContext) {
            const provider: LikeProviderInterface = context.injector.get(tokens.LIKE_PROVIDER)
            return await provider.countLikes(LikeEntityType.Aquascape, aquascape.id)
        },
        async isLikedByMe(aquascape: Aquascape, _, context: ModuleContext & AuthenticationContext) {
            if (!context.currentUserId) {
                return false
            }

            const provider: LikeProviderInterface = context.injector.get(tokens.LIKE_PROVIDER)
            return await provider.isLikedBy(
                context.currentUserId,
                LikeEntityType.Aquascape,
                aquascape.id
            )
        },
    },
    Notification: {
        async like(notification: Notification, _, context: ModuleContext) {
            const provider: LikeProviderInterface = context.injector.get(tokens.LIKE_PROVIDER)

            return await provider.getLikeById(notification.likeId)
        },
    },
    Mutation: {
        async like(_, args: MutationLikeArgs, context: ModuleContext & AuthenticationContext) {
            const provider: LikeProviderInterface = context.injector.get(tokens.LIKE_PROVIDER)
            const aquascapeProvider: AquascapeProviderInterface = context.injector.get(
                tokens.AQUASCAPE_PROVIDER
            )
            const notificationProvider: NotificationProvider = context.injector.get(
                tokens.NOTIFICATION_PROVIDER
            )

            const like = await provider.like(args.entity, args.entityId, context.currentUserId)

            if (like) {
                aquascapeProvider
                    .getAquascapeById(args.aquascapeId)
                    .then(aquascape => {
                        if (aquascape?.userId && aquascape.userId !== context.currentUserId) {
                            notificationProvider.createNotification({
                                creatorId: context.currentUserId,
                                entityId: like.id,
                                notificationType: NotificationType.LIKE,
                                notifiers: [aquascape.userId],
                            })
                        }
                    })
                    .catch(logger.error)
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
