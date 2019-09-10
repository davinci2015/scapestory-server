import {GraphQLResolveInfo} from 'graphql'
import {ModuleContext} from '@graphql-modules/core'
import * as graphqlFields from 'graphql-fields'

import {AquascapeFilter} from 'db/repositories/Aquascape'
import {authenticate} from 'graphql/guards'
import {tokens} from 'di/tokens'
import {Pagination} from 'interfaces'

import {Aquascape} from 'db/models/Aquascape'
import {UsersProviderInterface} from 'graphql/modules/User/UsersProvider'
import {LikeProviderInterface} from 'graphql/modules/Like/LikeProvider'
import {VisitorProviderInterface} from 'graphql/modules/Visitor/VisitorProvider'

import {AquascapeProviderInterface} from './AquascapeProvider'
import {Tag} from 'db/models/Tag'
import {Includeable} from 'sequelize/types'

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
    const include: Includeable[] = []
    const includeMapping = {
        tags: Tag
    }

    for (const key in includeMapping) {
        if (fields.hasOwnProperty(key)) {
            include.push({
                model: includeMapping[key],
                through: { attributes: [] }
            })
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
        },
    },
    Aquascape: {
        async user(aquascape: Aquascape, args, context: ModuleContext) {
            const provider: UsersProviderInterface = context.injector.get(tokens.USER_PROVIDER)
            return await provider.findUserById(aquascape.userId)
        },
        async likesCount(aquascape: Aquascape, args, context: ModuleContext) {
            const provider: LikeProviderInterface = context.injector.get(tokens.LIKE_PROVIDER)
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