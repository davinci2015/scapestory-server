import {ModuleContext} from '@graphql-modules/core'
import {tokens} from 'di/tokens'
import {AuthProviderInterface} from 'graphql/modules/Auth/providers/AuthProvider'

type LoginArgsType = {
    email: string,
    password: string
}

type RegisterArgsType = {
    email: string,
    username: string,
    password: string
}

type UsernameExistsArgsType = {
    email: string,
    username: string,
    password: string
}

export const authResolvers = {
    Query: {
        async usernameExists(root, args: UsernameExistsArgsType, {injector}: ModuleContext) {
            const provider: AuthProviderInterface = injector.get(tokens.AUTH_PROVIDER)
            return await provider.usernameExists(args.username)
        },
    },
    Mutation: {
        async login(root, args: LoginArgsType, {injector}: ModuleContext) {
            const provider: AuthProviderInterface = injector.get(tokens.AUTH_PROVIDER)
            return await provider.login(args.email, args.password)
        },
        async register(root, args: RegisterArgsType, {injector}: ModuleContext) {
            const provider: AuthProviderInterface = injector.get(tokens.AUTH_PROVIDER)
            return await provider.register(args.email, args.username, args.password)
        },
    },
}