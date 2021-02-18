import {createModule} from 'graphql-modules'

import {CommentRepository} from 'db/repositories/Comment'

import {CommentProvider} from './CommentProvider'
import {resolvers} from './resolvers'
import typeDefs from './schema'
import {AquascapeProvider} from 'api/modules/Aquascape/AquascapeProvider'
import {NotificationProvider} from 'api/modules/Notification/NotificationProvider'
import {LikeProvider} from 'api/modules/Like/LikeProvider'
import {NotificationRepository} from 'db/repositories/Notification'
import {NotificationNotifierRepository} from 'db/repositories/NotificationNotifier'
import {AquascapeRepository} from 'db/repositories/Aquascape'
import {LikeRepository} from 'db/repositories/Like'
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
        LikeProvider,
        LikeRepository,
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
