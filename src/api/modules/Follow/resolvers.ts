import {NotificationProvider} from 'api/modules/Notification/NotificationProvider'
import {FollowProviderInterface, FollowProvider} from 'api/modules/Follow/FollowProvider'
import {User} from 'db/models/User'
import {
    MutationFollowUserArgs,
    MutationUnfollowUserArgs,
    NotificationType,
} from 'interfaces/graphql/types'

export const resolvers = {
    User: {
        follows(user: User, args, context) {
            const provider: FollowProviderInterface = context.injector.get(FollowProvider)
            return provider.getFollows(user.id)
        },
    },
    Mutation: {
        async followUser(root, args: MutationFollowUserArgs, context) {
            const provider: FollowProviderInterface = context.injector.get(FollowProvider)
            const notificationProvider: NotificationProvider = context.injector.get(
                NotificationProvider
            )

            const follow = await provider.followUser(args.userId, context.currentUserId)

            notificationProvider.createNotification({
                creatorId: context.currentUserId,
                notifiers: [args.userId],
                notificationType: NotificationType.Follow,
                entityId: follow.id,
            })

            return follow
        },
        unfollowUser(root, args: MutationUnfollowUserArgs, context) {
            const provider: FollowProviderInterface = context.injector.get(FollowProvider)

            return provider.unfollowUser(args.userId, context.currentUserId)
        },
    },
}
