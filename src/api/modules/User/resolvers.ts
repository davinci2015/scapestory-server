import {ModuleContext} from '@graphql-modules/core'
import {UserInputError} from 'apollo-server'

import {UsersProviderInterface} from 'api/modules/User/UsersProvider'
import {AuthenticationContext} from 'api/context'
import {authenticate} from 'api/guards'
import {tokens} from 'di/tokens'
import {
    MutationUploadUserImageArgs,
    ImageVariant,
    MutationUpdateUserDetailsArgs,
    MutationConfirmEmailArgs,
    QueryUserArgs,
    QueryUserBySlugArgs,
    Like,
} from 'interfaces/graphql/types'
import {AuthHelper} from 'utils/AuthHelper'
import {Notification} from 'db/models'

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
    Notification: {
        async creator(notification: Notification, args, {injector}: ModuleContext) {
            const provider: UsersProviderInterface = injector.get(tokens.USER_PROVIDER)
            return await provider.findUserById(notification.creatorId)
        },
    },
    Like: {
        async user(like: Like, args, {injector}: ModuleContext) {
            const provider: UsersProviderInterface = injector.get(tokens.USER_PROVIDER)
            return await provider.findUserById(like.userId)
        },
    },
    Mutation: {
        async uploadUserImage(
            root,
            args: MutationUploadUserImageArgs,
            context: ModuleContext & AuthenticationContext
        ) {
            const provider: UsersProviderInterface = context.injector.get(tokens.USER_PROVIDER)

            if (args.imageVariant === ImageVariant.Profile) {
                return await provider.uploadProfileImage(context.currentUserId, args.file)
            } else if (args.imageVariant === ImageVariant.Cover) {
                return await provider.uploadCoverImage(context.currentUserId, args.file)
            } else {
                throw new UserInputError('Wrong image variant provided')
            }
        },
        async updateUserDetails(
            root,
            args: MutationUpdateUserDetailsArgs,
            context: ModuleContext & AuthenticationContext
        ) {
            const provider: UsersProviderInterface = context.injector.get(tokens.USER_PROVIDER)
            const [, users] = await provider.updateUserDetails(context.currentUserId, args.details)

            return users
        },
        async confirmEmail(root, args: MutationConfirmEmailArgs, context: ModuleContext) {
            const provider: UsersProviderInterface = context.injector.get(tokens.USER_PROVIDER)
            const [confirmed, email] = await provider.confirmEmail(args.token)

            if (confirmed && email) {
                const user = await provider.findUserByEmail(email)

                if (user) {
                    return {token: AuthHelper.createAuthToken(user.id), user}
                }
            }
        },
    },
}

export const resolversComposition = {
    'Query.me': [authenticate],
    'Mutation.uploadUserImage': [authenticate],
    'Mutation.updateUserDetails': [authenticate],
}
