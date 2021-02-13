import {UserInputError} from 'apollo-server'

import {PlantProviderInterface} from './PlantProvider'
import {Plant} from 'db/models/Plant'
import {MutationAddPlantArgs, MutationRemovePlantArgs} from 'interfaces/graphql/types'
import {PlantProvider} from 'api/modules/Plant/PlantProvider'

export const resolvers = {
    Query: {
        plants(root, args, context) {
            const provider: PlantProviderInterface = context.injector.get(PlantProvider)
            return provider.getPlants()
        },
        plantById(root, args, context) {
            const provider: PlantProviderInterface = context.injector.get(PlantProvider)
            return provider.findPlantById(args.id)
        },
    },
    Mutation: {
        async addPlant(root, args: MutationAddPlantArgs, context) {
            let plant: Plant | null = null
            const provider: PlantProviderInterface = context.injector.get(PlantProvider)

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
            const provider: PlantProviderInterface = context.injector.get(PlantProvider)
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
