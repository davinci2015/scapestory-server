import {ModuleContext} from '@graphql-modules/core'

import {tokens} from 'di/tokens'
import {BrandProviderInterface} from './BrandProvider'

export const resolvers = {
    Query: {
        async brands(root, args, context: ModuleContext) {
            const provider: BrandProviderInterface = context.injector.get(tokens.BRAND_PROVIDER)
            return await provider.getBrands()
        },
    },
}
