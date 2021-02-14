import {createModule} from 'graphql-modules'

import typeDefs from './schema'
import {resolvers} from './resolvers'
import {LivestockProvider} from 'api/modules/Livestock/LivestockProvider'
import {LivestockRepository} from 'db/repositories/Livestock'
import {AquascapeLivestockRepository} from 'db/repositories/AquascapeLivestock'
import {AquascapeRepository} from 'db/repositories/Aquascape'
import {authenticate, authorizeAquascapeUpdate} from 'api/guards'

export const LivestockModule = createModule({
    id: 'LivestockModule',
    providers: [
        AquascapeRepository,
        LivestockProvider,
        LivestockRepository,
        AquascapeLivestockRepository,
    ],
    typeDefs,
    resolvers,
    middlewares: {
        Mutation: {
            addLivestock: [authenticate, authorizeAquascapeUpdate],
            removeLivestock: [authenticate, authorizeAquascapeUpdate],
        },
    },
})
