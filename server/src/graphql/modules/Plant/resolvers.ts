import {ModuleContext} from '@graphql-modules/core'

import {tokens} from 'di/tokens'

import {PlantProviderInterface} from './PlantProvider'

export const resolvers = {
    Query: {
        async plants(root, args, context: ModuleContext) {
            const provider: PlantProviderInterface = context.injector.get(
                tokens.PLANT_PROVIDER
            )
            return await provider.getPlants()
        },
    },
}
