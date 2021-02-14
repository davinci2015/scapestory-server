import {createModule} from 'graphql-modules'

import typeDefs from './schema'
import {resolvers} from './resolvers'
import {NotificationProvider} from './NotificationProvider'
import {NotificationRepository} from 'db/repositories/Notification'
import {NotificationNotifierRepository} from 'db/repositories/NotificationNotifier'
import {authenticate} from 'api/guards'

export const NotificationModule = createModule({
    id: 'NotificationModule',
    providers: [NotificationProvider, NotificationRepository, NotificationNotifierRepository],
    typeDefs,
    resolvers,
    middlewares: {
        Query: {
            notifications: [authenticate],
        },
        Mutation: {
            readNotifications: [authenticate],
        },
    },
})
