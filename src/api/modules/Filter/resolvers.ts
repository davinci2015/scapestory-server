import {FilterProvider, FilterProviderInterface} from 'api/modules/Filter/FilterProvider'

export const resolvers = {
    Query: {
        async filters(root, args, context) {
            const provider: FilterProviderInterface = context.injector.get(FilterProvider)
            return await provider.getFilters()
        },
    },
}
