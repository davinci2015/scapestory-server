import {ModuleContext} from '@graphql-modules/core'

import {UsersProviderInterface} from 'graphql/modules/User/providers/UsersProvider'
import {AuthenticationContext} from 'graphql/context'
import {authenticate} from 'graphql/guards'
import {tokens} from 'di/tokens'

type UserArgsType = {
    id: number
}

export const resolvers = {
    Query: {
        me(root, args, context: ModuleContext & AuthenticationContext) {
            return context.currentUser
        },
        async user(root, args: UserArgsType, {injector}: ModuleContext) {
            const provider: UsersProviderInterface = injector.get(tokens.USERS_PROVIDER)
            return await provider.getUser(args.id)
        },
        async users(root, args, {injector}: ModuleContext) {
            const provider: UsersProviderInterface = injector.get(tokens.USERS_PROVIDER)
            return await provider.getAllUsers()
        }
    }
}

export const resolversComposition = {
    'Query.me': [authenticate]
}