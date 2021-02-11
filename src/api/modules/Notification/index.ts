import {GraphQLModule} from '@graphql-modules/core'

import {tokens} from 'di/tokens'

import * as typeDefs from './schema.graphql'
import {resolvers, resolversComposition} from './resolvers'
import {NotificationProvider} from './NotificationProvider'
import {NotificationRepository} from 'db/repositories/Notification'
import {NotificationNotifierRepository} from 'db/repositories/NotificationNotifier'
import {AuthModule} from 'api/modules/Auth'

export const NotificationModule = new GraphQLModule({
    providers: [
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
