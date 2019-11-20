import {GraphQLResolveInfo} from 'graphql'
import {ModuleContext} from '@graphql-modules/core'
import {Includeable} from 'sequelize/types'

import {AquascapeFilter} from 'db/repositories/Aquascape'
import {authenticate} from 'graphql/guards'
import {UsersProviderInterface} from 'graphql/modules/User/UsersProvider'
import {tokens} from 'di/tokens'
import {Pagination} from 'interfaces'

import {Aquascape} from 'db/models/Aquascape'
import {Tag} from 'db/models/Tag'
import {Visitor} from 'db/models/Visitor'
import {Plant} from 'db/models/Plant'
import {Hardscape} from 'db/models/Hardscape'
import {Livestock} from 'db/models/Livestock'
import {Filter} from 'db/models/Filter'
import {Light} from 'db/models/Light'
import {CO2} from 'db/models/CO2'
import {Substrate} from 'db/models/Substrate'
import {Additive} from 'db/models/Additive'
import {Tank} from 'db/models/Tank'
import {AquascapeImage} from 'db/models/AquascapeImage'
import {User} from 'db/models/User'

import {AquascapeProviderInterface} from './AquascapeProvider'
import {GraphQLHelper} from 'utils/GraphQLHelper'
import {AuthenticationContext} from 'graphql/context'

export type CreateAquascapeArgs = {
    title: string
}

export type AquascapesArgs = {
    filter?: AquascapeFilter
    userId?: number
    pagination: Pagination
}

export type VisitAquascapeArgs = {
    aquascapeId: number
}

const defaultInclude: Includeable[] = [
    {model: Visitor, attributes: ['id']}, // Include Visitor model for viewsCount
]

const modelMapping = {
    tags: Tag,
    plants: Plant,
    hardscape: Hardscape,
    livestock: Livestock,
    filters: Filter,
    lights: Light,
    co2: CO2,
    substrates: Substrate,
    additives: Additive,
    tank: Tank,
    images: AquascapeImage
}

export const getAquascapeJoinFields = (info: GraphQLResolveInfo) => ([
    ...defaultInclude,
    ...GraphQLHelper.getIncludeableFields(info, modelMapping)
])

export const resolvers = {
    Query: {
        async aquascapes(
            root,
            args: {pagination: Pagination, userId?: number, random?: boolean},
            context: ModuleContext,
            info: GraphQLResolveInfo
        ) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)
            return await provider.getAquascapes(args.pagination, args.userId, args.random, getAquascapeJoinFields(info))
        },
        async trendingAquascapes(
            root,
            args: {pagination: Pagination},
            context: ModuleContext,
            info: GraphQLResolveInfo
        ) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)
            return await provider.getTrendingAquascapes(args.pagination, getAquascapeJoinFields(info))
        },
        async featuredAquascape(root, args, context: ModuleContext, info: GraphQLResolveInfo) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)
            return await provider.getFeaturedAquascape(getAquascapeJoinFields(info))
        },
        async aquascape(root, args: {id: number}, context: ModuleContext, info: GraphQLResolveInfo) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)
            return await provider.getAquascapeById(args.id, getAquascapeJoinFields(info))
        },
    },
    Aquascape: {
        async user(aquascape: Aquascape, args, context: ModuleContext) {
            const provider: UsersProviderInterface = context.injector.get(tokens.USER_PROVIDER)
            return await provider.findUserById(aquascape.userId)
        },
        viewsCount(aquascape: Aquascape) {
            return aquascape.visitors.length
        }
    },
    User: {
        async aquascapes(
            user: User,
            args: {pagination: Pagination, random: boolean},
            context: ModuleContext,
            info: GraphQLResolveInfo
        ) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)
            return await provider.getAquascapes(args.pagination, user.id, args.random, getAquascapeJoinFields(info))
        }
    },
    Mutation: {
        async createAquascape(root, args: CreateAquascapeArgs, context: ModuleContext & AuthenticationContext) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)
            return await provider.createAquascape(context.currentUserId, args)
        }
    }
}

export const resolversComposition = {
    'Mutation.createAquascape': [authenticate]
}