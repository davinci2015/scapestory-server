import {ModuleContext} from '@graphql-modules/core'

import {tokens} from 'di/tokens'
import {FilterProviderInterface} from './FilterProvider'

export const resolvers = {
    Query: {
        async filters(root, args, context: ModuleContext) {
            const provider: FilterProviderInterface = context.injector.get(tokens.FILTER_PROVIDER)
            return await provider.getFilters()
        },
    },
}
