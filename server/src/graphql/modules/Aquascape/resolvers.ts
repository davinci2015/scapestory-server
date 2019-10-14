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
import {Like} from 'db/models/Like'
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

import {AquascapeProviderInterface} from './AquascapeProvider'
import {GraphQLHelper} from 'utils/GraphQLHelper'

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

const defaultInclude: Includeable[] = [
    {model: Visitor, attributes: ['id']}, // Include Visitor model for viewsCount
    {model: Like, attributes: ['id']}, // Include Like model for likesCount
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

export const resolvers = {
    Query: {
        async aquascapes(root, args: AquascapesArgs, context: ModuleContext, info: GraphQLResolveInfo) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)
            const fields = [...defaultInclude, ...GraphQLHelper.getIncludeableFields(info, modelMapping)]
            return await provider.getAquascapes(args.pagination, args.filter, fields)
        },
        async featuredAquascape(root, args, context: ModuleContext, info: GraphQLResolveInfo) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)
            const fields = [...defaultInclude, ...GraphQLHelper.getIncludeableFields(info, modelMapping)]
            return await provider.getFeaturedAquascape(fields)
        },
        async aquascape(root, args: {id: number}, context: ModuleContext, info: GraphQLResolveInfo) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)
            const fields = [...defaultInclude, ...GraphQLHelper.getIncludeableFields(info, modelMapping)]
            return await provider.getAquascapeById(args.id, fields)
        },
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