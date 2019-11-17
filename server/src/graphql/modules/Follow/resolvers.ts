import {ModuleContext} from '@graphql-modules/core'

import {FollowProviderInterface} from 'graphql/modules/Follow/providers/FollowProvider'
import {authenticate} from 'graphql/guards'
import {tokens} from 'di/tokens'
import {User} from 'db/models/User';
import {AuthenticationContext} from 'graphql/context'

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
    User: {
        async isFollowedByMe(user: User, args, context: ModuleContext & AuthenticationContext) {
            if (!context.currentUserId || context.currentUserId === user.id) {
                return false
            }

            const provider: FollowProviderInterface = context.injector.get(tokens.FOLLOW_PROVIDER)
            return await provider.isFollowedBy(context.currentUserId, user.id)
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