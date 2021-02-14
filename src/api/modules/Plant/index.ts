import {createModule} from 'graphql-modules'

import typeDefs from './schema'
import {resolvers} from './resolvers'
import {PlantProvider} from 'api/modules/Plant/PlantProvider'
import {PlantRepository} from 'db/repositories/Plant'
import {AquascapePlantRepository} from 'db/repositories/AquascapePlant'
import {AquascapeRepository} from 'db/repositories/Aquascape'
import {authorizeAquascapeUpdate, authenticate} from 'api/guards'

export const PlantModule = createModule({
    id: 'PlantModule',
    providers: [AquascapeRepository, PlantProvider, PlantRepository, AquascapePlantRepository],
    typeDefs,
    resolvers,
    middlewares: {
        Mutation: {
            addPlant: [authenticate, authorizeAquascapeUpdate],
            removePlant: [authenticate, authorizeAquascapeUpdate],
        },
    },
})
