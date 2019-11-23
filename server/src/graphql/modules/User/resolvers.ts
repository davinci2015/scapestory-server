import {ModuleContext} from '@graphql-modules/core'

import {UsersProviderInterface} from 'graphql/modules/User/UsersProvider'
import {AuthenticationContext} from 'graphql/context'
import {authenticate} from 'graphql/guards'
import {tokens} from 'di/tokens'
import {QueryUserArgs, QueryUserBySlugArgs} from 'graphql/generated/types'

export const resolvers = {
    Query: {
        async me(root, args, context: ModuleContext & AuthenticationContext) {
            const provider: UsersProviderInterface = context.injector.get(tokens.USER_PROVIDER)
            return await provider.findUserById(context.currentUserId)
        },
        async user(root, args: QueryUserArgs, {injector}: ModuleContext) {
            const provider: UsersProviderInterface = injector.get(tokens.USER_PROVIDER)
            return await provider.findUserById(args.id)
        },
        async userBySlug(root, args: QueryUserBySlugArgs, {injector}: ModuleContext) {
            const provider: UsersProviderInterface = injector.get(tokens.USER_PROVIDER)
            return await provider.findUserBySlug(args.slug)
        },
        async users(root, args, {injector}: ModuleContext) {
            const provider: UsersProviderInterface = injector.get(tokens.USER_PROVIDER)
            return await provider.getAllUsers()
        },
    },
}

export const resolversComposition = {
    'Query.me': [authenticate],
}
