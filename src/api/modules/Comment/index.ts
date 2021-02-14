import {GraphQLModule} from '@graphql-modules/core'

import {CommentRepository} from 'db/repositories/Comment'
import {tokens} from 'di/tokens'

import {CommentProvider} from './CommentProvider'
import {resolvers, resolversComposition} from './resolvers'
import * as typeDefs from './schema.graphql'
import {composeContext, attachSession, attachCurrentUserId} from 'api/context'
import {UserModule} from 'api/modules/User'
import {AquascapeModule} from 'api/modules/Aquascape'
import {LikeModule} from 'api/modules/Like'
import {AquascapeProvider} from 'api/modules/Aquascape/AquascapeProvider'
import {NotificationProvider} from 'api/modules/Notification/NotificationProvider'
import {NotificationRepository} from 'db/repositories/Notification'
import {NotificationNotifierRepository} from 'db/repositories/NotificationNotifier'
import {AquascapeRepository} from 'db/repositories/Aquascape'

export const CommentModule = new GraphQLModule({
    providers: [
        {provide: tokens.COMMENT_PROVIDER, useClass: CommentProvider},
        {provide: tokens.COMMENT_REPOSITORY, useClass: CommentRepository},
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
    context: composeContext([attachCurrentUserId, attachSession]),
    imports: [UserModule, AquascapeModule, LikeModule],
})
