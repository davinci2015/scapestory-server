import {AdditiveProviderInterface} from './AdditiveProvider'
import {AdditiveProvider} from 'api/modules/Additive/AdditiveProvider'

export const resolvers = {
    Query: {
        async additives(root, args, context) {
            const provider: AdditiveProviderInterface = context.injector.get(AdditiveProvider)
            return await provider.getAdditives()
        },
    },
}
