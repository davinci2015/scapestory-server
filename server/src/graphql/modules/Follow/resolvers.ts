import {ModuleContext} from '@graphql-modules/core'
import {FollowProviderInterface} from 'graphql/modules/Follow/providers/FollowProvider'
import {authenticate} from 'graphql/guards/authentication'
import {tokens} from 'di/tokens'

type FollowUserArgsType = {
    userId: number
}

type GetFollowsArgsType = {
    userId: number
}

export const followResolvers = {
    Query: {
        async follows(root, args: GetFollowsArgsType, context: ModuleContext) {
            const provider: FollowProviderInterface = context.injector.get(tokens.FOLLOW_PROVIDER)
            return await provider.getFollows(args.userId)
        }
    },
    Mutation: {
        async followUser(root, args: FollowUserArgsType, context: ModuleContext) {
            const provider: FollowProviderInterface = context.injector.get(tokens.FOLLOW_PROVIDER)
            return await provider.followUser(args.userId, context.currentUser.id)
        },
        async unfollowUser(root, args: FollowUserArgsType, context: ModuleContext) {
            const provider: FollowProviderInterface = context.injector.get(tokens.FOLLOW_PROVIDER)
            return await provider.unfollowUser(args.userId, context.currentUser.id)
        }
    }
}

export const followResolversComposition = {
    'Mutation.followUser': [authenticate],
    'Mutation.unfollowUser': [authenticate]
}