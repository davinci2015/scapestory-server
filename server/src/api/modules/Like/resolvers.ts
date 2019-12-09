import {ModuleContext} from '@graphql-modules/core'

import {tokens} from 'di/tokens'
import {authenticate} from 'api/guards'
import {LikeProviderInterface} from 'api/modules/Like/LikeProvider'
import {LikeEntityType} from 'db/repositories/Like'
import {AuthenticationContext} from 'api/context'
import {Aquascape} from 'db/models/Aquascape'

export type LikeArgs = {
    entityId: number
    entity: LikeEntityType
}

export const resolvers = {
    Aquascape: {
        async likesCount(aquascape: Aquascape, args, context: ModuleContext) {
            const provider: LikeProviderInterface = context.injector.get(tokens.LIKE_PROVIDER)
            return await provider.countLikes(
                LikeEntityType.AQUASCAPE,
                aquascape.id
            )
        },
        async isLikedByMe(
            aquascape: Aquascape,
            args,
            context: ModuleContext & AuthenticationContext
        ) {
            if (!context.currentUserId) {
                return false
            }

            const provider: LikeProviderInterface = context.injector.get(tokens.LIKE_PROVIDER)
            return await provider.isLikedBy(
                context.currentUserId,
                LikeEntityType.AQUASCAPE,
                aquascape.id
            )
        },
    },
    Mutation: {
        async like(root, args: LikeArgs, context: ModuleContext & AuthenticationContext) {
            const provider: LikeProviderInterface = context.injector.get(tokens.LIKE_PROVIDER)
            return await provider.like(
                args.entity,
                args.entityId,
                context.currentUserId
            )
        },
        async dislike(root, args: LikeArgs, context: ModuleContext & AuthenticationContext) {
            const provider: LikeProviderInterface = context.injector.get(tokens.LIKE_PROVIDER)
            return await provider.dislike(
                args.entity,
                args.entityId,
                context.currentUserId
            )
        },
    },
}

export const resolversComposition = {
    'Mutation.like': [authenticate],
}
