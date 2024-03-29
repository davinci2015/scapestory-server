import {createModule} from 'graphql-modules'

import {VisitorRepository} from 'db/repositories/Visitor'
import {VisitorDataLoader} from 'db/loaders/Visitor'

import {resolvers} from './resolvers'
import {VisitorProvider} from './VisitorProvider'
import typeDefs from './schema'

export const VisitorModule = createModule({
    id: 'VisitorModule',
    providers: [VisitorProvider, VisitorRepository, VisitorDataLoader],
    typeDefs,
    resolvers,
})
