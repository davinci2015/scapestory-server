import {createModule} from 'graphql-modules'

import typeDefs from './schema'
import {resolvers} from './resolvers'
import {BrandProvider} from 'api/modules/Brand/BrandProvider'
import {BrandRepository} from 'db/repositories/Brand'

export const BrandModule = createModule({
    id: 'BrandModule',
    providers: [BrandProvider, BrandRepository],
    typeDefs,
    resolvers,
})
