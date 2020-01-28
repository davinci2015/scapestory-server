import {GraphQLModule} from '@graphql-modules/core'

import {tokens} from 'di/tokens'
import * as typeDefs from './schema.graphql'
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

export const EquipmentModule = new GraphQLModule({
    providers: [
        {
            provide: tokens.AQUASCAPE_REPOSITORY,
            useClass: AquascapeRepository,
        },
        {provide: tokens.EQUIPMENT_PROVIDER, useClass: EquipmentProvider},
        {provide: tokens.FILTER_REPOSITORY, useClass: FilterRepository},
        {provide: tokens.LIGHT_REPOSITORY, useClass: LightRepository},
        {provide: tokens.SUBSTRATE_REPOSITORY, useClass: SubstrateRepository},
        {provide: tokens.ADDITIVE_REPOSITORY, useClass: AdditiveRepository},
        {provide: tokens.AQUASCAPE_FILTER_REPOSITORY, useClass: AquascapeFilterRepository},
        {provide: tokens.AQUASCAPE_LIGHT_REPOSITORY, useClass: AquascapeLightRepository},
        {provide: tokens.AQUASCAPE_SUBSTRATE_REPOSITORY, useClass: AquascapeSubstrateRepository},
        {provide: tokens.AQUASCAPE_ADDITIVES_REPOSITORY, useClass: AquascapeAdditiveRepository},
    ],
    typeDefs,
    resolvers,
})
