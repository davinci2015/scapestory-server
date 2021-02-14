import {AuthProviderInterface, AuthProvider} from 'api/modules/Auth/providers/AuthProvider'
import {
    MutationResendConfirmationMailArgs,
    QueryUserProfileSlugExistsArgs,
    MutationLoginArgs,
    MutationRegisterArgs,
    MutationFbRegisterArgs,
    MutationGoogleRegisterArgs,
} from 'interfaces/graphql/types'

export const resolvers = {
    Query: {
        async userProfileSlugExists(root, args: QueryUserProfileSlugExistsArgs, context) {
            const provider: AuthProviderInterface = context.injector.get(AuthProvider)
            return await provider.userProfileSlugExists(args.slug)
        },
    },
    Mutation: {
        async login(root, args: MutationLoginArgs, context) {
            const provider: AuthProviderInterface = context.injector.get(AuthProvider)
            return await provider.login(args.email, args.password)
        },
        async register(root, args: MutationRegisterArgs, context) {
            const provider: AuthProviderInterface = context.injector.get(AuthProvider)
            return await provider.register(args.email, args.password, args.name)
        },
        async fbRegister(root, args: MutationFbRegisterArgs, {injector, req, res}) {
            const provider: AuthProviderInterface = injector.get(AuthProvider)
            return await provider.facebookRegister(args.token, req, res)
        },
        async googleRegister(root, args: MutationGoogleRegisterArgs, {injector, req, res}) {
            const provider: AuthProviderInterface = injector.get(AuthProvider)
            return await provider.googleRegister(args.token, req, res)
        },
        async resendConfirmationMail(root, args: MutationResendConfirmationMailArgs, context) {
            const provider: AuthProviderInterface = context.injector.get(AuthProvider)
            await provider.resendConfirmationMail(args.email)
        },
    },
}
