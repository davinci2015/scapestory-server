import {ModuleContext} from '@graphql-modules/core'
import {UsersProviderInterface} from 'graphql/modules/User/UsersProvider'
import {tokens} from 'graphql/di/tokens'

export const userResolvers = {
    Query: {
        me: (root, {id}, {injector}: ModuleContext) => {
            const provider: UsersProviderInterface = injector.get(tokens.USERS_PROVIDER)
            return provider.getUser(id)
        },
        users: (root, args, {injector}: ModuleContext) => {
            const provider: UsersProviderInterface = injector.get(tokens.USERS_PROVIDER)
            return provider.allUsers()
        }
    },
    User: {
        id: user => user._id,
        username: user => user.username
    }
}