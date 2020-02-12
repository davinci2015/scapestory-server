import {GraphQLModule} from '@graphql-modules/core'

import {tokens} from 'di/tokens'

import {resolvers, resolversComposition} from './resolvers'
import * as typeDefs from './schema.graphql'
import {LikeProvider} from 'api/modules/Like/LikeProvider'
import {LikeRepository} from 'db/repositories/Like'
import {attachCurrentUserId, composeContext} from 'api/context'
import {AquascapeProvider} from '../Aquascape/AquascapeProvider'
import {NotificationProvider} from '../Notification/NotificationProvider'
import {AquascapeRepository} from 'db/repositories/Aquascape'
import {NotificationRepository} from 'db/repositories/Notification'
import {NotificationNotifierRepository} from 'db/repositories/NotificationNotifier'

export const LikeModule = new GraphQLModule({
    providers: [
        {provide: tokens.LIKE_PROVIDER, useClass: LikeProvider},
        {provide: tokens.LIKE_REPOSITORY, useClass: LikeRepository},
        {provide: tokens.AQUASCAPE_PROVIDER, useClass: AquascapeProvider},
        {provide: tokens.AQUASCAPE_REPOSITORY, useClass: AquascapeRepository},
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
    context: composeContext([attachCurrentUserId]),
})
