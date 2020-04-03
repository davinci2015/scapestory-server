import {ModuleContext} from '@graphql-modules/core'

import {NotificationProvider} from 'api/modules/Notification/NotificationProvider'
import {FollowProviderInterface} from 'api/modules/Follow/FollowProvider'
import {authenticate} from 'api/guards'
import {tokens} from 'di/tokens'
import {User} from 'db/models/User'
import {AuthenticationContext} from 'api/context'
import {
    MutationFollowUserArgs,
    MutationUnfollowUserArgs,
    NotificationType,
} from 'interfaces/graphql/types'

export const resolvers = {
    User: {
        follows(user: User, args, context) {
            const provider: FollowProviderInterface = context.injector.get(tokens.FOLLOW_PROVIDER)
            return provider.getFollows(user.id)
        },
    },
    Mutation: {
        async followUser(
            root,
            args: MutationFollowUserArgs,
            context: ModuleContext & AuthenticationContext
        ) {
            const provider: FollowProviderInterface = context.injector.get(tokens.FOLLOW_PROVIDER)
            const notificationProvider: NotificationProvider = context.injector.get(
                tokens.NOTIFICATION_PROVIDER
            )

            const follow = await provider.followUser(args.userId, context.currentUserId)

            if (follow) {
                notificationProvider.createNotification({
                    creatorId: context.currentUserId,
                    notifiers: [args.userId],
                    notificationType: NotificationType.Follow,
                    entityId: follow.id,
                })
            }

            return follow
        },
        unfollowUser(
            root,
            args: MutationUnfollowUserArgs,
            context: ModuleContext & AuthenticationContext
        ) {
            const provider: FollowProviderInterface = context.injector.get(tokens.FOLLOW_PROVIDER)
            return provider.unfollowUser(args.userId, context.currentUserId)
        },
    },
}

export const resolversComposition = {
    'Mutation.followUser': [authenticate],
    'Mutation.unfollowUser': [authenticate],
}
