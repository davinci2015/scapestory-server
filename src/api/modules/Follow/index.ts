import {GraphQLModule} from '@graphql-modules/core'

import {FollowRepository} from 'db/repositories/Follow'
import {UserRepository} from 'db/repositories/User'
import {FollowProvider} from 'api/modules/Follow/FollowProvider'
import {AuthModule} from 'api/modules/Auth'
import {resolvers, resolversComposition} from 'api/modules/Follow/resolvers'
import {NotificationProvider} from 'api/modules/Notification/NotificationProvider'
import {NotificationRepository} from 'db/repositories/Notification'
import {NotificationNotifierRepository} from 'db/repositories/NotificationNotifier'
import {tokens} from 'di/tokens'
import * as typeDefs from 'api/modules/Follow/schema.graphql'

export const FollowModule = new GraphQLModule({
    providers: [
        {provide: tokens.FOLLOW_PROVIDER, useClass: FollowProvider},
        {provide: tokens.FOLLOW_REPOSITORY, useClass: FollowRepository},
        {provide: tokens.USER_REPOSITORY, useClass: UserRepository},
        {provide: tokens.NOTIFICATION_PROVIDER, useClass: NotificationProvider},
        {provide: tokens.NOTIFICATION_REPOSITORY, useClass: NotificationRepository},
        {
            provide: tokens.NOTIFICATION_NOTIFIER_REPOSITORY,
            useClass: NotificationNotifierRepository,
        },
    ],
    typeDefs,
    resolvers,
    resolversComposition,
    imports: [AuthModule],
})
