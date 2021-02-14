import {createModule} from 'graphql-modules'

import typeDefs from './schema'
import {resolvers} from './resolvers'
import {HardscapeProvider} from 'api/modules/Hardscape/HardscapeProvider'
import {HardscapeRepository} from 'db/repositories/Hardscape'
import {AquascapeHardscapeRepository} from 'db/repositories/AquascapeHardscape'
import {AquascapeRepository} from 'db/repositories/Aquascape'
import {authenticate, authorizeAquascapeUpdate} from 'api/guards'

export const HardscapeModule = createModule({
    id: 'HardscapeModule',
    providers: [
        AquascapeRepository,
        HardscapeProvider,
        HardscapeRepository,
        AquascapeHardscapeRepository,
    ],
    typeDefs,
    resolvers,
    middlewares: {
        Mutation: {
            addHardscape: [authenticate, authorizeAquascapeUpdate],
            removeHardscape: [authenticate, authorizeAquascapeUpdate],
        },
    },
})
