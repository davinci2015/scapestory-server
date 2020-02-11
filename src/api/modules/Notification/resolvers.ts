import {ModuleContext} from '@graphql-modules/core'

import {tokens} from 'di/tokens'
import {authenticate} from 'api/guards'
import {NotificationProviderInterface} from './NotificationProvider'
import {AuthenticationContext} from 'api/context'

export const resolvers = {
    Query: {
        async notifications(root, args, context: ModuleContext & AuthenticationContext) {
            const provider: NotificationProviderInterface = context.injector.get(
                tokens.NOTIFICATION_PROVIDER
            )

            return await provider.getNotifications(context.currentUserId)
        },
    },
    Mutation: {
        async readNotifications(root, args, context) {
            const provider: NotificationProviderInterface = context.injector.get(
                tokens.NOTIFICATION_PROVIDER
            )

            return await provider.readNotifications(args.notifications)
        },
    },
}

export const resolversComposition = {
    'Query.notifications': [authenticate],
    'Mutation.readNotifications': [authenticate],
}
