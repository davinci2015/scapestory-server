import {ModuleContext} from '@graphql-modules/core'
import {SessionContext} from 'api/context'

import {tokens} from 'di/tokens'
import {validate} from 'api/guards'
import {AuthProviderInterface} from 'api/modules/Auth/providers/AuthProvider'
import {loginValidationSchema, registerValidationSchema} from 'api/modules/Auth/validation'
import {
    MutationRegisterArgs,
    MutationLoginArgs,
    MutationFbRegisterArgs,
    MutationGoogleRegisterArgs,
    QueryUserProfileSlugExistsArgs,
} from 'api/generated/types'

export const resolvers = {
    Query: {
        async userProfileSlugExists(
            root,
            args: QueryUserProfileSlugExistsArgs,
            {injector}: ModuleContext
        ) {
            const provider: AuthProviderInterface = injector.get(tokens.AUTH_PROVIDER)
            return await provider.userProfileSlugExists(args.slug)
        },
    },
    Mutation: {
        async login(root, args: MutationLoginArgs, context: ModuleContext) {
            const provider: AuthProviderInterface = context.injector.get(tokens.AUTH_PROVIDER)
            return await provider.login(args.email, args.password)
        },
        async register(root, args: MutationRegisterArgs, {injector}: ModuleContext) {
            const provider: AuthProviderInterface = injector.get(tokens.AUTH_PROVIDER)
            return await provider.register(args.email, args.password, args.name)
        },
        async fbRegister(
            root,
            args: MutationFbRegisterArgs,
            {injector, req, res}: ModuleContext & SessionContext
        ) {
            const provider: AuthProviderInterface = injector.get(tokens.AUTH_PROVIDER)
            return await provider.facebookRegister(args.token, req, res)
        },
        async googleRegister(
            root,
            args: MutationGoogleRegisterArgs,
            {injector, req, res}: ModuleContext & SessionContext
        ) {
            const provider: AuthProviderInterface = injector.get(tokens.AUTH_PROVIDER)
            return await provider.googleRegister(args.token, req, res)
        },
    },
}

export const resolversComposition = {
    'Mutation.login': [validate(loginValidationSchema)],
    'Mutation.register': [validate(registerValidationSchema)],
}
