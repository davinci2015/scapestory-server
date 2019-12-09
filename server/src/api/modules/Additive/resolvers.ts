import {ModuleContext} from '@graphql-modules/core'

import {tokens} from 'di/tokens'
import {AdditiveProviderInterface} from './AdditiveProvider'

export const resolvers = {
    Query: {
        async additives(root, args, context: ModuleContext) {
            const provider: AdditiveProviderInterface = context.injector.get(tokens.ADDITIVE_PROVIDER)
            return await provider.getAdditives()
        },
    },
}
