import {ModuleContext} from '@graphql-modules/core'

import {tokens} from 'di/tokens'

import {LightProviderInterface} from './LightProvider'

export const resolvers = {
    Query: {
        async lights(root, args, context: ModuleContext) {
            const provider: LightProviderInterface = context.injector.get(tokens.LIGHT_PROVIDER)
            return await provider.getLights()
        },
    },
}
