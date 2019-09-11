import {GraphQLResolveInfo} from 'graphql'
import {ModuleContext} from '@graphql-modules/core'
import * as graphqlFields from 'graphql-fields'
import {Includeable} from 'sequelize/types'

import {AquascapeFilter} from 'db/repositories/Aquascape'
import {authenticate} from 'graphql/guards'
import {UsersProviderInterface} from 'graphql/modules/User/UsersProvider'
import {tokens} from 'di/tokens'
import {Pagination} from 'interfaces'

import {Aquascape} from 'db/models/Aquascape'
import {Tag} from 'db/models/Tag'
import {Visitor} from 'db/models/Visitor'
import {Like} from 'db/models/Like'

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

const includeField = (info: GraphQLResolveInfo) => {
    // @ts-ignore
    const fields = graphqlFields(info)
    const include: Includeable[] = [
        {model: Visitor, attributes: ['id']}, // Include Visitor model for viewsCount
        {model: Like, attributes: ['id']}, // Include Like model for likesCount
    ]

    const includeMapping = {
        tags: Tag
    }

    for (const key in includeMapping) {
        if (fields.hasOwnProperty(key)) {
            include.push({model: includeMapping[key]})
        }
    }

    return include
}

export const resolvers = {
    Query: {
        async aquascapes(root, args: AquascapesArgs, context: ModuleContext, info: GraphQLResolveInfo) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)
            return await provider.getAquascapes(args.pagination, args.filter, includeField(info))
        },
        async featuredAquascape(root, args, context: ModuleContext, info: GraphQLResolveInfo) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)
            return await provider.getFeaturedAquascape(includeField(info))
        }
    },
    Aquascape: {
        async user(aquascape: Aquascape, args, context: ModuleContext) {
            const provider: UsersProviderInterface = context.injector.get(tokens.USER_PROVIDER)
            return await provider.findUserById(aquascape.userId)
        },
        async likesCount(aquascape: Aquascape) {
            return aquascape.likes.length
        },
        async viewsCount(aquascape: Aquascape) {
            return aquascape.visitors.length
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