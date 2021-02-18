import {createModule} from 'graphql-modules'

import typeDefs from './schema'
import {resolvers} from './resolvers'
import {BrandProvider} from 'api/modules/Brand/BrandProvider'
import {BrandRepository} from 'db/repositories/Brand'
import {BrandDataLoader} from 'db/loaders/Brand'

export const BrandModule = createModule({
    id: 'BrandModule',
    providers: [BrandProvider, BrandRepository, BrandDataLoader],
    typeDefs,
    resolvers,
})
