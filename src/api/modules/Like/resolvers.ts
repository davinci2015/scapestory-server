import {ModuleContext} from '@graphql-modules/core'

import {tokens} from 'di/tokens'
import {authenticate} from 'api/guards'
import {LikeProviderInterface} from 'api/modules/Like/LikeProvider'
import {AuthenticationContext} from 'api/context'
import {Aquascape} from 'db/models/Aquascape'
import {MutationLikeArgs} from 'api/generated/types'
import {LikeEntityType} from 'interfaces/graphql/types'
import {NotificationType} from 'db/repositories/Notification'
import {NotificationProvider} from 'api/modules/Notification/NotificationProvider'
import {AquascapeProviderInterface} from 'api/modules/Aquascape/AquascapeProvider'
import {CommentProviderInterface} from 'api/modules/Comment/CommentProvider'
import {AquascapeImageProviderInterface} from 'api/modules/AquascapeImage/AquascapeImageProvider'
import logger from 'logger'
import {Notification} from 'db/models'

const getAquascapeIdForEntity = (args: MutationLikeArgs, context: ModuleContext) =>
    new Promise((resolve, reject) => {
        if (args.entity === LikeEntityType.Comment) {
            const commentProvider: CommentProviderInterface = context.injector.get(
                tokens.COMMENT_PROVIDER
            )

            commentProvider
                .getCommentById(args.entityId)
                .then(comment => (comment ? resolve(comment.aquascapeId) : reject(null)))
                .catch(() => reject(null))
        } else if (args.entity === LikeEntityType.Image) {
            const aquascapeImageProvider: AquascapeImageProviderInterface = context.injector.get(
                tokens.AQUASCAPE_IMAGE_PROVIDER
            )

            aquascapeImageProvider
                .getImageById(args.entityId)
                .then(image => (image ? resolve(image.aquascapeId) : reject(null)))
                .catch(() => reject(null))
        } else {
            resolve(args.entityId)
        }
    })

export const resolvers = {
    Aquascape: {
        async likesCount(aquascape: Aquascape, args, context: ModuleContext) {
            const provider: LikeProviderInterface = context.injector.get(tokens.LIKE_PROVIDER)
            return await provider.countLikes(LikeEntityType.Aquascape, aquascape.id)
        },
        async isLikedByMe(
            aquascape: Aquascape,
            args,
            context: ModuleContext & AuthenticationContext
        ) {
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
        async like(notification: Notification, args, context: ModuleContext) {
            const provider: LikeProviderInterface = context.injector.get(tokens.LIKE_PROVIDER)

            return await provider.getLikeById(notification.likeId)
        },
    },
    Mutation: {
        async like(root, args: MutationLikeArgs, context: ModuleContext & AuthenticationContext) {
            const provider: LikeProviderInterface = context.injector.get(tokens.LIKE_PROVIDER)
            const aquascapeProvider: AquascapeProviderInterface = context.injector.get(
                tokens.AQUASCAPE_PROVIDER
            )
            const notificationProvider: NotificationProvider = context.injector.get(
                tokens.NOTIFICATION_PROVIDER
            )

            getAquascapeIdForEntity(args, context)
                .then((aquascapeId: number | null) => {
                    if (aquascapeId) {
                        return aquascapeProvider.getAquascapeById(aquascapeId).then(aquascape => {
                            if (aquascape?.userId) {
                                notificationProvider.createNotification({
                                    creatorId: context.currentUserId,
                                    entityId: aquascape.id,
                                    notificationType: NotificationType.LIKE,
                                    notifiers: [aquascape.userId],
                                })
                            }
                        })
                    }
                })
                .catch(logger.error)

            return await provider.like(args.entity, args.entityId, context.currentUserId)
        },
        async dislike(
            root,
            args: MutationLikeArgs,
            context: ModuleContext & AuthenticationContext
        ) {
            const provider: LikeProviderInterface = context.injector.get(tokens.LIKE_PROVIDER)
            return await provider.dislike(args.entity, args.entityId, context.currentUserId)
        },
    },
}

export const resolversComposition = {
    'Mutation.like': [authenticate],
    'Mutation.dislike': [authenticate],
}
