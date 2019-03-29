import {ModuleContext} from '@graphql-modules/core'
import {UsersProviderInterface} from 'graphql/modules/User/providers/UsersProvider'
import {isAuthenticated} from 'graphql/guards/authentication'
import {AuthenticationContext} from 'graphql/context'
import {tokens} from 'di/tokens'

type UserArgsType = {
    id: number
}

export const userResolvers = {
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
            return await provider.allUsers()
        }
    }
}

export const userResolversComposition = {
    'Query.me': [isAuthenticated]
}