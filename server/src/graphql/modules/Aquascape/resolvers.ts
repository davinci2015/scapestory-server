import {ModuleContext} from '@graphql-modules/core'

import {AquascapeProviderInterface} from 'graphql/modules/Aquascape/providers/AquascapeProvider'
import {authenticate} from 'graphql/guards'
import {tokens} from 'di/tokens'
import {AquascapeFilter} from 'db/repositories/Aquascape'

export type CreateAquascapeArgs = {
    title: string
}

export type GetAquascapesArgs = {
    limit: number
    filter: AquascapeFilter
}

export type VisitAquascapeArgs = {
    aquascapeId: number
    userId?: string
}

export const resolvers = {
    Query: {
        async aquascapes(root, args: GetAquascapesArgs, context: ModuleContext) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)
            return await provider.getAquascapes(args.limit, args.filter)
        },
        async featuredAquascape(root, args, context: ModuleContext) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)
            return await provider.getFeaturedAquascape()
        },
    },
    Mutation: {
        async createAquascape(root, args: CreateAquascapeArgs, context: ModuleContext) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)
            return await provider.createAquascape(context.currentUser.id, args)
        },
        async visitAquascape(root, args: VisitAquascapeArgs, context: ModuleContext) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)
            return await provider.visitAquascape(args.aquascapeId, args.userId)
        }
    }
}

export const resolversComposition = {
    'Mutation.createAquascape': [authenticate]
}