import {ModuleContext} from '@graphql-modules/core'
import {authenticate} from 'graphql/guards/authentication'
import {AquascapeProviderInterface} from 'graphql/modules/Aquascape/providers/AquascapeProvider'
import {tokens} from 'di/tokens'

export type CreateAquascapeArgs = {
    title: string
}

export const resolvers = {
    Query: {
        async aquascapes(root, args, context: ModuleContext) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)
            return await provider.getAquascapes()
        }
    },
    Mutation: {
        async createAquascape(root, args: CreateAquascapeArgs, context: ModuleContext) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)
            return await provider.createAquascape(context.currentUser.id, args)
        }
    }
}

export const resolversComposition = {
    'Mutation.createAquascape': [authenticate]
}