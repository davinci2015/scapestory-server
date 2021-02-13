import {createModule} from 'graphql-modules'

import {CommentRepository} from 'db/repositories/Comment'

import {CommentProvider} from './CommentProvider'
import {resolvers} from './resolvers'
import typeDefs from './schema'
import {AquascapeProvider} from 'api/modules/Aquascape/AquascapeProvider'
import {NotificationProvider} from 'api/modules/Notification/NotificationProvider'
import {NotificationRepository} from 'db/repositories/Notification'
import {NotificationNotifierRepository} from 'db/repositories/NotificationNotifier'
import {AquascapeRepository} from 'db/repositories/Aquascape'
import {authenticate} from 'api/guards'

export const CommentModule = createModule({
    id: 'CommentModule',
    providers: [
        CommentProvider,
        CommentRepository,
        AquascapeProvider,
        AquascapeRepository,
        NotificationProvider,
        NotificationRepository,
        NotificationNotifierRepository,
    ],
    typeDefs,
    resolvers,
    middlewares: {
        Mutation: {
            addComment: [authenticate],
            removeComment: [authenticate],
        },
    },
})
