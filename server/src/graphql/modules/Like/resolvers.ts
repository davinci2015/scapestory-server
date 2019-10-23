import {ModuleContext} from '@graphql-modules/core'

import {tokens} from 'di/tokens'
import {authenticate} from 'graphql/guards'
import {LikeProviderInterface} from 'graphql/modules/Like/LikeProvider'
import {LikeEntityType} from 'db/repositories/Like'
import {AuthenticationContext} from 'graphql/context'

export type LikeArgs = {
    entityId: number
    entity: LikeEntityType
}

export const resolvers = {
    Mutation: {
        async like(root, args: LikeArgs, context: ModuleContext & AuthenticationContext) {
            const provider: LikeProviderInterface = context.injector.get(tokens.LIKE_PROVIDER)
            return await provider.like(args.entity, args.entityId, context.currentUserId)
        },
        async dislike(root, args: LikeArgs, context: ModuleContext & AuthenticationContext) {
            const provider: LikeProviderInterface = context.injector.get(tokens.LIKE_PROVIDER)
            return await provider.like(args.entity, args.entityId, context.currentUserId)
        }
    }
}

export const resolversComposition = {
    'Mutation.like': [authenticate]
}