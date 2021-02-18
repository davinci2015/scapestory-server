import {createModule} from 'graphql-modules'

import {LightRepository} from 'db/repositories/Light'

import typeDefs from './schema'
import {LightProvider} from './LightProvider'
import {resolvers} from './resolvers'

export const LightModule = createModule({
    id: 'LightModule',
    providers: [LightProvider, LightRepository],
    typeDefs,
    resolvers,
})
