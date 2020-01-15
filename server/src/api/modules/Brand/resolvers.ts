import {ModuleContext} from '@graphql-modules/core'

import {tokens} from 'di/tokens'
import {BrandProviderInterface} from './BrandProvider'

const resolveBrand = (root, args, context: ModuleContext) => {
    if (!root.brandId) {
        return null
    }

    const provider: BrandProviderInterface = context.injector.get(tokens.BRAND_PROVIDER)
    return provider.findBrandById(root.brandId)
}

export const resolvers = {
    Query: {
        async brands(root, args, context: ModuleContext) {
            const provider: BrandProviderInterface = context.injector.get(tokens.BRAND_PROVIDER)
            return await provider.getBrands()
        },
    },
    Filter: {
        async brand(root, args, context: ModuleContext) {
            return await resolveBrand(root, args, context)
        },
    },
    Light: {
        async brand(root, args, context: ModuleContext) {
            return await resolveBrand(root, args, context)
        },
    },
    Substrate: {
        async brand(root, args, context: ModuleContext) {
            return await resolveBrand(root, args, context)
        },
    },
    Additive: {
        async brand(root, args, context: ModuleContext) {
            return await resolveBrand(root, args, context)
        },
    },
}
