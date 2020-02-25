import {ModuleContext} from '@graphql-modules/core'

import {tokens} from 'di/tokens'
import {authenticate} from 'api/guards'
import {NotificationProviderInterface} from './NotificationProvider'
import {AuthenticationContext} from 'api/context'
import {MutationReadNotificationsArgs} from 'interfaces/graphql/types'

export const resolvers = {
    Query: {
        notifications(root, args, context: ModuleContext & AuthenticationContext) {
            const provider: NotificationProviderInterface = context.injector.get(
                tokens.NOTIFICATION_PROVIDER
            )

            return provider.getNotifications(context.currentUserId)
        },
        countUnreadNotifications(root, args, context: ModuleContext & AuthenticationContext) {
            const provider: NotificationProviderInterface = context.injector.get(
                tokens.NOTIFICATION_PROVIDER
            )

            return provider.countUnreadNotifications(context.currentUserId)
        },
    },
    Mutation: {
        async readNotifications(root, args: MutationReadNotificationsArgs, context) {
            const provider: NotificationProviderInterface = context.injector.get(
                tokens.NOTIFICATION_PROVIDER
            )

            const [affected] = await provider.readNotifications(args.notifierId)

            return affected
        },
    },
}

export const resolversComposition = {
    'Query.notifications': [authenticate],
    'Query.countUnreadNotifications': [authenticate],
    'Mutation.readNotifications': [authenticate],
}
