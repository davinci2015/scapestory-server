import {GraphQLResolveInfo} from 'graphql'

import {authenticate, authorizeAquascapeUpdate} from 'api/guards'
import {UsersProviderInterface} from 'api/modules/User/UsersProvider'
import {tokens} from 'di/tokens'

import {Tag} from 'db/models/Tag'
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
import {
    QueryAquascapesArgs,
    QueryTrendingAquascapesArgs,
    QueryAquascapeArgs,
    MutationUpdateAquascapeTitleArgs,
} from 'api/generated/types'
import {FileUpload} from 'graphql-upload'

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
    images: AquascapeImage,
}

const getAquascapeJoinFields = (info: GraphQLResolveInfo) =>
    GraphQLHelper.getIncludeableFields(info, modelMapping)

export const resolvers = {
    Query: {
        async aquascapes(root, args: QueryAquascapesArgs, context, info) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)

            return await provider.getAquascapes(
                args.pagination,
                args.userId,
                args.random,
                getAquascapeJoinFields(info)
            )
        },
        async trendingAquascapes(root, args: QueryTrendingAquascapesArgs, context, info) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)

            return await provider.getTrendingAquascapes(args.pagination, getAquascapeJoinFields(info))
        },
        async featuredAquascape(root, args, context, info) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)

            return await provider.getFeaturedAquascape(getAquascapeJoinFields(info))
        },
        async aquascape(root, args: QueryAquascapeArgs, context, info) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)

            return await provider.getAquascapeById(args.id, getAquascapeJoinFields(info))
        },
    },
    Aquascape: {
        async user(aquascape, args, context) {
            const provider: UsersProviderInterface = context.injector.get(tokens.USER_PROVIDER)

            return await provider.findUserById(aquascape.userId)
        },
    },
    User: {
        async aquascapes(user, args, context, info) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)

            return await provider.getAquascapes(
                args.pagination,
                user.id,
                args.random,
                getAquascapeJoinFields(info)
            )
        },
    },
    Mutation: {
        async createAquascape(root, args, context) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)

            return await provider.createAquascape(context.currentUserId)
        },

        async updateAquascapeTitle(root, args: MutationUpdateAquascapeTitleArgs, context) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)
            const maxTitleLength = 40
            const title = args.title.slice(0, maxTitleLength)

            await provider.updateAquascapeTitle(args.aquascapeId, title)

            return title
        },

        async updateAquascapeMainImage(root, args: { aquascapeId: number, file: Promise<FileUpload>}, context) {
            const provider: AquascapeProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)
            const result = await provider.updateAquascapeMainImage(args.aquascapeId, args.file)

            return {
                mainImagePublicId: result.public_id,
                mainImageUrl: result.secure_url
            }
        }
    },
}

export const resolversComposition = {
    'Mutation.createAquascape': [authenticate],
    'Mutation.updateAquascapeTitle': [authenticate, authorizeAquascapeUpdate],
    'Mutation.updateAquascapeMainImage': [authenticate, authorizeAquascapeUpdate],
}
