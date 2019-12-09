import {GraphQLModule} from '@graphql-modules/core'

import {LightRepository} from 'db/repositories/Light'
import {tokens} from 'di/tokens'

import * as typeDefs from './schema.graphql'
import {LightProvider} from './LightProvider'
import {resolvers} from './resolvers'

// @ts-ignore
export const LightModule = new GraphQLModule({
    providers: [
        {provide: tokens.LIGHT_PROVIDER, useClass: LightProvider},
        {provide: tokens.LIGHT_REPOSITORY, useClass: LightRepository},
    ],
    typeDefs,
    resolvers,
})
