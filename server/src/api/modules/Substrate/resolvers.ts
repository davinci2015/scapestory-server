import {ModuleContext} from '@graphql-modules/core'

import {tokens} from 'di/tokens'
import {SubstrateProviderInterface} from './SubstrateProvider'

export const resolvers = {
    Query: {
        async substrates(root, args, context: ModuleContext) {
            const provider: SubstrateProviderInterface = context.injector.get(tokens.SUBSTRATE_PROVIDER)
            return await provider.getSubstrates()
        },
    },
}
