import {ModuleContext} from '@graphql-modules/core'

import {FollowProviderInterface} from 'api/modules/Follow/FollowProvider'
import {authenticate} from 'api/guards'
import {tokens} from 'di/tokens'
import {User} from 'db/models/User'
import {AuthenticationContext} from 'api/context'
import {MutationFollowUserArgs, MutationUnfollowUserArgs} from 'interfaces/graphql/types'

export const resolvers = {
    User: {
        async isFollowedByMe(user: User, args, context: ModuleContext & AuthenticationContext) {
            if (!context.currentUserId || context.currentUserId === user.id) {
                return false
            }

            const provider: FollowProviderInterface = context.injector.get(tokens.FOLLOW_PROVIDER)
            return await provider.isFollowedBy(context.currentUserId, user.id)
        },
        async followersCount(user: User, args, context) {
            const provider: FollowProviderInterface = context.injector.get(tokens.FOLLOW_PROVIDER)
            const {followers} = await provider.getFollows(user.id)
            return followers.length
        },
        async followingCount(user: User, args, context) {
            const provider: FollowProviderInterface = context.injector.get(tokens.FOLLOW_PROVIDER)
            const {following} = await provider.getFollows(user.id)
            return following.length
        },
    },
    Mutation: {
        async followUser(
            root,
            args: MutationFollowUserArgs,
            context: ModuleContext & AuthenticationContext
        ) {
            const provider: FollowProviderInterface = context.injector.get(tokens.FOLLOW_PROVIDER)
            return await provider.followUser(args.userId, context.currentUserId)
        },
        async unfollowUser(
            root,
            args: MutationUnfollowUserArgs,
            context: ModuleContext & AuthenticationContext
        ) {
            const provider: FollowProviderInterface = context.injector.get(tokens.FOLLOW_PROVIDER)
            return await provider.unfollowUser(args.userId, context.currentUserId)
        },
    },
}

export const resolversComposition = {
    'Mutation.followUser': [authenticate],
    'Mutation.unfollowUser': [authenticate],
}
