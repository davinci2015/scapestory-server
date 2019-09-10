import {ModuleContext} from '@graphql-modules/core'

import {tokens} from 'di/tokens'
import {Light} from 'db/models/Light'
import {BrandProviderInterface} from 'graphql/modules/Brand/BrandProvider'

import {LightProviderInterface} from './LightProvider'

export const resolvers = {
    Query: {
        async lights(root, args, context: ModuleContext) {
            const provider: LightProviderInterface = context.injector.get(tokens.LIGHT_PROVIDER)
            return await provider.getLights()
        }
    },
    Light: {
        async brand(light: Light, args, context: ModuleContext) {
            const provider: BrandProviderInterface = context.injector.get(tokens.BRAND_PROVIDER)
            return await provider.getBrandById(light.brandId)
        }
    }
}