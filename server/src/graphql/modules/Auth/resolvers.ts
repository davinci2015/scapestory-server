import {ModuleContext} from '@graphql-modules/core'
import {tokens} from 'graphql/di/tokens'
import {AuthProviderInterface} from 'graphql/modules/Auth/providers/AuthProvider'

type LoginArgsType = {
    email: string,
    password: string
}

export const authResolvers = {
    Mutation: {
        async login(root, args: LoginArgsType, {injector}: ModuleContext) {
            const provider: AuthProviderInterface = injector.get(tokens.AUTH_PROVIDER)
            return await provider.login(args.email, args.password)
        }
    }
}