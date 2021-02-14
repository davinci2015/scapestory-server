import {BrandProvider, BrandProviderInterface} from 'api/modules/Brand/BrandProvider'

const resolveBrand = (root, args, context) => {
    if (!root.brandId) {
        return null
    }

    const provider: BrandProviderInterface = context.injector.get(BrandProvider)
    return provider.findBrandById(root.brandId)
}

export const resolvers = {
    Query: {
        async brands(root, args, context) {
            const provider: BrandProviderInterface = context.injector.get(BrandProvider)
            return await provider.getBrands()
        },
    },
    Filter: {
        async brand(root, args, context) {
            return await resolveBrand(root, args, context)
        },
    },
    Light: {
        async brand(root, args, context) {
            return await resolveBrand(root, args, context)
        },
    },
    Substrate: {
        async brand(root, args, context) {
            return await resolveBrand(root, args, context)
        },
    },
    Additive: {
        async brand(root, args, context) {
            return await resolveBrand(root, args, context)
        },
    },
    Equipment: {
        async brand(root, args, context) {
            return await resolveBrand(root, args, context)
        },
    },
}
