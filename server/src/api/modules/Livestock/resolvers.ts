import {ModuleContext} from '@graphql-modules/core'

import {tokens} from 'di/tokens'
import {LivestockProviderInterface} from './LivestockProvider'

export const resolvers = {
    Query: {
        async livestock(root, args, context: ModuleContext) {
            const provider: LivestockProviderInterface = context.injector.get(tokens.LIVESTOCK_PROVIDER)
            return await provider.getLivestock()
        },
    },
}
