import {ModuleContext} from '@graphql-modules/core'
import {UserInputError} from 'apollo-server'

import {tokens} from 'di/tokens'
import {PlantProviderInterface} from './PlantProvider'
import {authenticate, authorizeAquascapeUpdate} from 'api/guards'
import {Plant} from 'db/models/Plant'
import {MutationAddPlantArgs, MutationRemovePlantArgs} from 'interfaces/graphql/types'

export const resolvers = {
    Query: {
        async plants(root, args, context: ModuleContext) {
            const provider: PlantProviderInterface = context.injector.get(tokens.PLANT_PROVIDER)
            return await provider.getPlants()
        },
    },
    Mutation: {
        async addPlant(root, args: MutationAddPlantArgs, context) {
            let plant: Plant | null = null
            const provider: PlantProviderInterface = context.injector.get(tokens.PLANT_PROVIDER)

            if (args.plantId) {
                plant = await provider.findPlantById(args.plantId)
            } else if (args.name) {
                plant = await provider.addPlant(args.name)
            }

            if (!plant) {
                throw new UserInputError(
                    'You need to provide a plant ID or a plant name that will be created'
                )
            }

            await provider.addPlantForAquascape(plant.id, args.aquascapeId)

            return plant
        },
        async removePlant(root, args: MutationRemovePlantArgs, context) {
            const provider: PlantProviderInterface = context.injector.get(tokens.PLANT_PROVIDER)
            const plant = await provider.findPlantById(args.plantId)

            if (!plant) {
                throw new UserInputError('Plant not found')
            }

            await provider.removePlantForAquascape(plant.id, args.aquascapeId)

            if (!plant.predefined) {
                await provider.removePlant(plant.id)
            }

            return plant
        },
    },
}

export const resolversComposition = {
    'Mutation.addPlant': [authenticate, authorizeAquascapeUpdate],
    'Mutation.removePlant': [authenticate, authorizeAquascapeUpdate],
}
