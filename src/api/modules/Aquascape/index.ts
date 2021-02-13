import {createModule} from 'graphql-modules'

import {AquascapeRepository} from 'db/repositories/Aquascape'
import {LikeRepository} from 'db/repositories/Like'
import {TagRepository} from 'db/repositories/Tag'
import {UserRepository} from 'db/repositories/User'

import {UsersProvider} from 'api/modules/User/UsersProvider'
import {LikeProvider} from 'api/modules/Like/LikeProvider'

import {AquascapeProvider} from './AquascapeProvider'
import {resolvers} from './resolvers'
import typeDefs from './schema'
import appTypeDefs from 'api/modules/App/schema'
import {authenticate, authorizeAquascapeUpdate} from 'api/guards'
import {EmailConfirmationRepository} from 'db/repositories/EmailConfirmation'
import {NotificationRepository} from 'db/repositories/Notification'
import {NotificationNotifierRepository} from 'db/repositories/NotificationNotifier'

export const AquascapeModule = createModule({
    id: 'AquascapeModule',
    providers: [
        AquascapeProvider,
        AquascapeRepository,
        UsersProvider,
        UserRepository,
        LikeProvider,
        LikeRepository,
        TagRepository,
        NotificationRepository,
        EmailConfirmationRepository,
        NotificationNotifierRepository,
    ],
    typeDefs: [typeDefs, appTypeDefs],
    resolvers,
    middlewares: {
        Mutation: {
            createAquascape: [authenticate],
            updateAquascapeTitle: [authenticate, authorizeAquascapeUpdate],
            updateAquascapeMainImage: [authenticate, authorizeAquascapeUpdate],
            removeAquascape: [authenticate, authorizeAquascapeUpdate],
        },
    },
})
