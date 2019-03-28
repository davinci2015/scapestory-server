import {ModuleContext} from '@graphql-modules/core'
import {UsersProviderInterface} from 'graphql/modules/User/providers/UsersProvider'
import {authenticated} from 'graphql/middlewares/AuthenticationGuard'
import {tokens} from 'di/tokens'

type UserArgsType = {
    id: number
}

export const userResolvers = {
    Query: {
        async me(root, args, {injector}: ModuleContext) {
            const provider: UsersProviderInterface = injector.get(tokens.USERS_PROVIDER)
            return await provider.getUser(1)
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
    'Query.me': [authenticated]
}