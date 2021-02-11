import {GraphQLModule} from '@graphql-modules/core'

import {tokens} from 'di/tokens'

import * as typeDefs from './schema.graphql'
import {resolvers, resolversComposition} from './resolvers'
import {PlantProvider} from 'api/modules/Plant/PlantProvider'
import {PlantRepository} from 'db/repositories/Plant'
import {AquascapePlantRepository} from 'db/repositories/AquascapePlant'
import {AquascapeRepository} from 'db/repositories/Aquascape'
import {AuthModule} from 'api/modules/Auth'

export const PlantModule = new GraphQLModule({
    providers: [
        {provide: tokens.AQUASCAPE_REPOSITORY, useClass: AquascapeRepository},
        {provide: tokens.PLANT_PROVIDER, useClass: PlantProvider},
        {provide: tokens.PLANT_REPOSITORY, useClass: PlantRepository},
        {provide: tokens.AQUASCAPE_PLANT_REPOSITORY, useClass: AquascapePlantRepository},
    ],
    typeDefs,
    resolvers,
    resolversComposition,
    imports: [AuthModule],
})
