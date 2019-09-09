import {GraphQLModule} from '@graphql-modules/core'

import {LightRepository} from 'db/repositories/Light'
import {tokens} from 'di/tokens'

import * as typeDefs from './schema.graphql'
import {LightProvider} from './LightProvider'
import {resolvers} from './resolvers'
import {BrandRepository} from 'db/repositories/Brand'
import {BrandProvider} from 'graphql/modules/Brand/BrandProvider'

// @ts-ignore
export const LightModule = new GraphQLModule({
    providers: [
        {provide: tokens.LIGHT_PROVIDER, useClass: LightProvider},
        {provide: tokens.LIGHT_REPOSITORY, useClass: LightRepository},
        {provide: tokens.BRAND_PROVIDER, useClass: BrandProvider},
        {provide: tokens.BRAND_REPOSITORY, useClass: BrandRepository},
    ],
    typeDefs,
    resolvers
})