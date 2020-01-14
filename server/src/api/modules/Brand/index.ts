import {GraphQLModule} from '@graphql-modules/core'

import {tokens} from 'di/tokens'

import * as typeDefs from './schema.graphql'
import {resolvers} from './resolvers'
import {BrandProvider} from 'api/modules/Brand/BrandProvider'
import {BrandRepository} from 'db/repositories/Brand'

export const BrandModule = new GraphQLModule({
    providers: [
        {provide: tokens.BRAND_PROVIDER, useClass: BrandProvider},
        {provide: tokens.BRAND_REPOSITORY, useClass: BrandRepository},
    ],
    typeDefs,
    resolvers,
})
