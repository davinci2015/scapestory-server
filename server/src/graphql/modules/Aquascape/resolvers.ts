import {ModuleContext} from '@graphql-modules/core'

import {AquascapeFilter} from 'db/repositories/Aquascape'
import {authenticate} from 'graphql/guards'
import {tokens} from 'di/tokens'
import {Pagination} from 'interfaces'

import {Aquascape} from 'db/models/Aquascape'
import {UsersProviderInterface} from 'graphql/modules/User/UsersProvider'
import {LikeProviderInterface} from 'graphql/modules/Like/LikeProvider'
import {VisitorProviderInterface} from 'graphql/modules/Visitor/VisitorProvider'

import {AquascapeProviderInterface} from './AquascapeProvider'

export type CreateAquascapeArgs = {
    title: string
}

export type AquascapesArgs = {
    filter?: AquascapeFilter
    pagination: Pagination
}

export type VisitAquascapeArgs = {
    aquascapeId: number
    userId?: string
}

export const resolvers = {
    Query: {
        async aquascapes(root, args: AquascapesArgs, context: ModuleContext) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)
            return await provider.getAquascapes(args.pagination, args.filter)
        },
        async featuredAquascape(root, args, context: ModuleContext) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)
            return await provider.getFeaturedAquascape()
        },
    },
    Aquascape: {
        async user(aquascape: Aquascape, args, context: ModuleContext) {
            const provider: UsersProviderInterface = context.injector.get(tokens.USERS_PROVIDER)
            return await provider.findUserById(aquascape.userId)
        },
        async likesCount(aquascape: Aquascape, args, context: ModuleContext) {
            const provider: LikeProviderInterface = context.injector.get(tokens.LIGHT_PROVIDER)
            return await provider.countLikesForAquascape(aquascape.id)
        },
        async viewsCount(aquascape: Aquascape, args, context: ModuleContext) {
            const provider: VisitorProviderInterface = context.injector.get(tokens.VISITOR_PROVIDER)
            return await provider.countViewsForAquascape(aquascape.id)
        }
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