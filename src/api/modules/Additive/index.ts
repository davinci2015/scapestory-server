import {createModule} from 'graphql-modules'

import {AdditiveProvider} from 'api/modules/Additive/AdditiveProvider'
import {AdditiveRepository} from 'db/repositories/Additive'

import typeDefs from './schema'
import {resolvers} from './resolvers'

export const AdditiveModule = createModule({
    id: 'AdditiveModule',
    providers: [AdditiveProvider, AdditiveRepository],
    typeDefs,
    resolvers,
})
