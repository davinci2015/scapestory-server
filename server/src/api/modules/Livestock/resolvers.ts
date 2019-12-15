import {ModuleContext} from '@graphql-modules/core'
import {UserInputError} from 'apollo-server'

import {tokens} from 'di/tokens'
import {LivestockProviderInterface} from './LivestockProvider'
import {authenticate, authorizeAquascapeUpdate} from 'api/guards'
import {Livestock} from 'db/models'

export const resolvers = {
    Query: {
        async livestock(root, args, context: ModuleContext) {
            const provider: LivestockProviderInterface = context.injector.get(tokens.LIVESTOCK_PROVIDER)
            return await provider.getLivestock()
        },
    },
    Mutation: {
        async addLivestock(root, args, context) {
            let livestock: Livestock | null = null
            const provider: LivestockProviderInterface = context.injector.get(tokens.LIVESTOCK_PROVIDER)

            if (args.livestockId) {
                livestock = await provider.findLivestockById(args.livestockId)
            } else if (args.name) {
                livestock = await provider.addLivestock(args.name)
            }

            if (!livestock) {
                throw new UserInputError('You need to provide a livestock ID or a livestock name that will be created')
            }

            await provider.addLivestockForAquascape(livestock.id, args.aquascapeId)

            return livestock
        },
        async removeLivestock(root, args, context) {
            const provider: LivestockProviderInterface = context.injector.get(tokens.LIVESTOCK_PROVIDER)
            const livestock = await provider.findLivestockById(args.livestockId)

            if (!livestock) {
                throw new UserInputError('Plant not found')
            }

            await provider.removeLivestockForAquascape(livestock.id, args.aquascapeId)

            if (!livestock.predefined) {
                await provider.removeLivestock(livestock.id)
            }

            return livestock
        }
    }
}

export const resolversComposition = {
    'Mutation.addLivestock': [authenticate, authorizeAquascapeUpdate],
    'Mutation.removeLivestock': [authenticate, authorizeAquascapeUpdate],
}
