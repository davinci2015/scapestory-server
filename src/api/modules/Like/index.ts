import {createModule} from 'graphql-modules'

import {resolvers} from './resolvers'
import typeDefs from './schema'
import {LikeProvider} from 'api/modules/Like/LikeProvider'
import {LikeRepository} from 'db/repositories/Like'
import {AquascapeRepository} from 'db/repositories/Aquascape'
import {NotificationRepository} from 'db/repositories/Notification'
import {NotificationNotifierRepository} from 'db/repositories/NotificationNotifier'
import {CommentRepository} from 'db/repositories/Comment'
import {AquascapeProvider} from 'api/modules/Aquascape/AquascapeProvider'
import {NotificationProvider} from 'api/modules/Notification/NotificationProvider'
import {CommentProvider} from 'api/modules/Comment/CommentProvider'
import {authenticate} from 'api/guards'

export const LikeModule = createModule({
    id: 'LikeModule',
    providers: [
        LikeProvider,
        LikeRepository,
        AquascapeProvider,
        AquascapeRepository,
        NotificationProvider,
        NotificationRepository,
        CommentProvider,
        CommentRepository,
        NotificationNotifierRepository,
    ],
    typeDefs,
    resolvers,
    middlewares: {
        Mutation: {
            like: [authenticate],
            dislike: [authenticate],
        },
    },
})
