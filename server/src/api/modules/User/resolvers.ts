import {ModuleContext} from '@graphql-modules/core'

import {UsersProviderInterface} from 'api/modules/User/UsersProvider'
import {AuthenticationContext} from 'api/context'
import {authenticate} from 'api/guards'
import {tokens} from 'di/tokens'
import {QueryUserArgs, QueryUserBySlugArgs} from 'api/generated/types'
import {UserInputError} from 'apollo-server'
import {
    MutationUploadUserImageArgs,
    ImageVariant,
    MutationUpdateUserDetailsArgs,
} from 'graphql/generated/types'

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
            const [_, user] = await provider.updateUserDetails(context.currentUserId, args.details)

            if (!user) {
                throw new UserInputError('Updating user details error')
            }

            return user
        },
    },
}

export const resolversComposition = {
    'Query.me': [authenticate],
    'Mutation.uploadUserImage': [authenticate],
    'Mutation.updateUserDetails': [authenticate],
}
