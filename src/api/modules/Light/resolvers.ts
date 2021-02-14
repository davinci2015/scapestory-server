import {LightProviderInterface, LightProvider} from './LightProvider'

export const resolvers = {
    Query: {
        async lights(root, args, context) {
            const provider: LightProviderInterface = context.injector.get(LightProvider)
            return await provider.getLights()
        },
    },
}
