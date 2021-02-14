import {createModule} from 'graphql-modules'

import typeDefs from './schema'
import {resolvers} from './resolvers'
import {AquascapeRepository} from 'db/repositories/Aquascape'
import {FilterRepository} from 'db/repositories/Filter'
import {LightRepository} from 'db/repositories/Light'
import {SubstrateRepository} from 'db/repositories/Substrate'
import {AdditiveRepository} from 'db/repositories/Additive'
import {AquascapeFilterRepository} from 'db/repositories/AquascapeFilter'
import {AquascapeLightRepository} from 'db/repositories/AquascapeLight'
import {AquascapeSubstrateRepository} from 'db/repositories/AquascapeSubstrate'
import {AquascapeAdditiveRepository} from 'db/repositories/AquascapeAdditive'
import {EquipmentProvider} from './EquipmentProvider'
import {authenticate, authorizeAquascapeUpdate} from 'api/guards'

export const EquipmentModule = createModule({
    id: 'EquipmentModule',
    providers: [
        AquascapeRepository,
        EquipmentProvider,
        FilterRepository,
        LightRepository,
        SubstrateRepository,
        AdditiveRepository,
        AquascapeFilterRepository,
        AquascapeLightRepository,
        AquascapeSubstrateRepository,
        AquascapeAdditiveRepository,
    ],
    typeDefs,
    resolvers,
    middlewares: {
        Mutation: {
            addEquipment: [authenticate, authorizeAquascapeUpdate],
            removeEquipment: [authenticate, authorizeAquascapeUpdate],
        },
    },
})
