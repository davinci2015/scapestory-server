import {ModuleContext} from '@graphql-modules/core'

import {tokens} from 'di/tokens'
import {HardscapeProviderInterface} from './HardscapeProvider'

export const resolvers = {
    Query: {
        async hardscape(root, args, context: ModuleContext) {
            const provider: HardscapeProviderInterface = context.injector.get(tokens.HARDSCAPE_PROVIDER)
            return await provider.getHardscape()
        },
    },
}
