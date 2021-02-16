import {GraphQLResolveInfo} from 'graphql'

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
import {FileUpload} from 'graphql-upload'
import {Comment, User, Like} from 'db/models'
import {AquascapeProvider} from 'api/modules/Aquascape/AquascapeProvider'
import {
    QueryAquascapesArgs,
    QueryTrendingAquascapesArgs,
    QueryAquascapeArgs,
    MutationUpdateAquascapeTitleArgs,
} from 'interfaces/graphql/types'

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
            const provider: AquascapeProviderInterface = context.injector.get(AquascapeProvider)

            return await provider.getAquascapes(
                args.pagination,
                args.userId,
                args.random,
                getAquascapeJoinFields(info)
            )
        },
        async trendingAquascapes(root, args: QueryTrendingAquascapesArgs, context, info) {
            const provider: AquascapeProviderInterface = context.injector.get(AquascapeProvider)

            return await provider.getTrendingAquascapes(
                args.pagination,
                getAquascapeJoinFields(info)
            )
        },
        async featuredAquascape(root, args, context, info) {
            const provider: AquascapeProviderInterface = context.injector.get(AquascapeProvider)

            return await provider.getFeaturedAquascape(getAquascapeJoinFields(info))
        },
        async aquascape(root, args: QueryAquascapeArgs, context, info) {
            const provider: AquascapeProviderInterface = context.injector.get(AquascapeProvider)

            return await provider.getAquascapeById(args.id, getAquascapeJoinFields(info))
        },
    },
    User: {
        async aquascapes(user: User, args, context, info) {
            const provider: AquascapeProviderInterface = context.injector.get(AquascapeProvider)

            return await provider.getAquascapes(
                args.pagination,
                user.id,
                args.random,
                getAquascapeJoinFields(info)
            )
        },
    },
    Comment: {
        async aquascape(comment: Comment, args, context) {
            const provider: AquascapeProviderInterface = context.injector.get(AquascapeProvider)

            return await provider.getAquascapeById(comment.aquascapeId)
        },
    },
    Like: {
        async aquascape(like: Like, args, context) {
            const provider: AquascapeProviderInterface = context.injector.get(AquascapeProvider)

            return await provider.getAquascapeById(like.aquascapeId)
        },
    },
    Mutation: {
        async createAquascape(root, args, context) {
            const provider: AquascapeProviderInterface = context.injector.get(AquascapeProvider)

            return await provider.createAquascape(context.currentUserId)
        },

        async updateAquascapeTitle(root, args: MutationUpdateAquascapeTitleArgs, context) {
            const provider: AquascapeProviderInterface = context.injector.get(AquascapeProvider)
            const maxTitleLength = 40
            const title = args.title.slice(0, maxTitleLength)

            await provider.updateAquascapeTitle(args.aquascapeId, title)

            return title
        },

        async updateAquascapeMainImage(
            root,
            args: {aquascapeId: number; file: Promise<FileUpload>},
            context
        ) {
            const provider: AquascapeProviderInterface = context.injector.get(AquascapeProvider)
            const result = await provider.updateAquascapeMainImage(args.aquascapeId, args.file)

            return {
                mainImagePublicId: result.public_id,
                mainImageUrl: result.secure_url,
            }
        },
        async removeAquascape(root, args, context) {
            const provider: AquascapeProviderInterface = context.injector.get(AquascapeProvider)
            return await provider.removeAquascape(args.aquascapeId)
        },
    },
}
