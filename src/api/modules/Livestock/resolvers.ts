import {UserInputError} from 'apollo-server'

import {LivestockProviderInterface} from './LivestockProvider'
import {Livestock} from 'db/models'
import {LivestockProvider} from 'api/modules/Livestock/LivestockProvider'

export const resolvers = {
    Query: {
        async livestock(root, args, context) {
            const provider: LivestockProviderInterface = context.injector.get(LivestockProvider)
            return await provider.getLivestock()
        },
    },
    Mutation: {
        async addLivestock(root, args, context) {
            let livestock: Livestock | null = null
            const provider: LivestockProviderInterface = context.injector.get(LivestockProvider)

            if (args.livestockId) {
                livestock = await provider.findLivestockById(args.livestockId)
            } else if (args.name) {
                livestock = await provider.addLivestock(args.name)
            }

            if (!livestock) {
                throw new UserInputError(
                    'You need to provide a livestock ID or a livestock name that will be created'
                )
            }

            await provider.addLivestockForAquascape(livestock.id, args.aquascapeId)

            return livestock
        },
        async removeLivestock(root, args, context) {
            const provider: LivestockProviderInterface = context.injector.get(LivestockProvider)
            const livestock = await provider.findLivestockById(args.livestockId)

            if (!livestock) {
                throw new UserInputError('Livestock not found')
            }

            await provider.removeLivestockForAquascape(livestock.id, args.aquascapeId)

            if (!livestock.predefined) {
                await provider.removeLivestock(livestock.id)
            }

            return livestock
        },
    },
}
