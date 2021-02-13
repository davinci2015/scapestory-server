import {createModule} from 'graphql-modules'

import {FollowRepository} from 'db/repositories/Follow'
import {UserRepository} from 'db/repositories/User'
import {FollowProvider} from 'api/modules/Follow/FollowProvider'
import {resolvers} from 'api/modules/Follow/resolvers'
import {NotificationProvider} from 'api/modules/Notification/NotificationProvider'
import {NotificationRepository} from 'db/repositories/Notification'
import {NotificationNotifierRepository} from 'db/repositories/NotificationNotifier'
import typeDefs from 'api/modules/Follow/schema'
import {authenticate} from 'api/guards'

export const FollowModule = createModule({
    id: 'FollowModule',
    providers: [
        FollowProvider,
        FollowRepository,
        UserRepository,
        NotificationProvider,
        NotificationRepository,
        NotificationNotifierRepository,
    ],
    typeDefs,
    resolvers,
    middlewares: {
        Mutation: {
            followUser: [authenticate],
            unfollowUser: [authenticate],
        },
    },
})
