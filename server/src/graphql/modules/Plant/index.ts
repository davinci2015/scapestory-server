import {GraphQLModule} from '@graphql-modules/core'

import {tokens} from 'di/tokens'

import * as typeDefs from './schema.graphql'
import {resolvers} from './resolvers'
import {PlantProvider} from 'graphql/modules/Plant/PlantProvider'
import {PlantRepository} from 'db/repositories/Plant'

// @ts-ignore
export const PlantModule = new GraphQLModule({
    providers: [
        {provide: tokens.PLANT_PROVIDER, useClass: PlantProvider},
        {provide: tokens.PLANT_REPOSITORY, useClass: PlantRepository},
    ],
    typeDefs,
    resolvers,
})
