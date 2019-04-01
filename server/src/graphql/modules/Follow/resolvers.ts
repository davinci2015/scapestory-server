import {ModuleContext} from '@graphql-modules/core'
import {FollowProviderInterface} from 'graphql/modules/Follow/providers/FollowProvider'
import {authenticate} from 'graphql/guards/authentication'
import {AuthenticationContext} from 'graphql/context'
import {tokens} from 'di/tokens'

type FollowUserArgsType = {
    id: number
}

export const followResolvers = {
    Mutation: {
        async followUser(root, args: FollowUserArgsType, context: ModuleContext & AuthenticationContext) {
            const provider: FollowProviderInterface = context.injector.get(tokens.FOLLOW_PROVIDER)
            return await provider.followUser(args.id, context.currentUser.id)
        },
        async unfollowUser(root, args: FollowUserArgsType, context: ModuleContext & AuthenticationContext) {
            const provider: FollowProviderInterface = context.injector.get(tokens.FOLLOW_PROVIDER)
            return await provider.unfollowUser(args.id, context.currentUser.id)
        },
    },
}

export const followResolversComposition = {
    'Mutation.followUser': [authenticate],
    'Mutation.unfollowUser': [authenticate],
}