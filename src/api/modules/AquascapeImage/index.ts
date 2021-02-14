import {createModule} from 'graphql-modules'

import {AquascapeImageRepository} from 'db/repositories/AquascapeImage'
import {AquascapeRepository} from 'db/repositories/Aquascape'

import {AquascapeImageProvider} from './AquascapeImageProvider'
import {resolvers} from './resolvers'
import typeDefs from './schema'
import {authenticate, authorizeAquascapeUpdate} from 'api/guards'

export const AquascapeImageModule = createModule({
    id: 'AquascapeImageModule',
    providers: [AquascapeRepository, AquascapeImageProvider, AquascapeImageRepository],
    typeDefs,
    resolvers,
    middlewares: {
        Mutation: {
            addAquascapeImage: [authenticate, authorizeAquascapeUpdate],
            deleteAquascapeImage: [authenticate, authorizeAquascapeUpdate],
        },
    },
})
