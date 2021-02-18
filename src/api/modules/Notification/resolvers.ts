import {NotificationProviderInterface} from './NotificationProvider'
import {MutationReadNotificationsArgs, QueryNotificationsArgs} from 'interfaces/graphql/types'
import {NotificationProvider} from 'api/modules/Notification/NotificationProvider'

export const resolvers = {
    Query: {
        notifications(root, args: QueryNotificationsArgs, context) {
            const provider: NotificationProviderInterface = context.injector.get(
                NotificationProvider
            )

            return provider.getNotifications(context.currentUserId, args.pagination)
        },
        unreadNotificationsCount(root, args, context) {
            const provider: NotificationProviderInterface = context.injector.get(
                NotificationProvider
            )

            if (!context.currentUserId) {
                return 0
            }

            return provider.countUnreadNotifications(context.currentUserId)
        },
    },
    Mutation: {
        async readNotifications(root, args: MutationReadNotificationsArgs, context) {
            const provider: NotificationProviderInterface = context.injector.get(
                NotificationProvider
            )

            const [affected] = await provider.readNotifications(args.notifierId)

            return affected
        },
    },
}
