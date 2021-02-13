import {createModule} from 'graphql-modules'

import typeDefs from './schema'
import {resolvers} from './resolvers'
import {SubstrateProvider} from 'api/modules/Substrate/SubstrateProvider'
import {SubstrateRepository} from 'db/repositories/Substrate'

export const SubstrateModule = createModule({
    id: 'SubstrateModule',
    providers: [SubstrateProvider, SubstrateRepository],
    typeDefs,
    resolvers,
})
