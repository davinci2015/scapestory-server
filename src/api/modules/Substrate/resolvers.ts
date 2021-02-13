import {SubstrateProviderInterface} from './SubstrateProvider'
import {SubstrateProvider} from 'api/modules/Substrate/SubstrateProvider'

export const resolvers = {
    Query: {
        async substrates(root, args, context) {
            const provider: SubstrateProviderInterface = context.injector.get(SubstrateProvider)
            return await provider.getSubstrates()
        },
    },
}
