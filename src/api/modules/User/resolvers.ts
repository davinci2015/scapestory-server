import {UserInputError} from 'apollo-server'

import {UsersProviderInterface, UsersProvider} from 'api/modules/User/UsersProvider'
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
import {Notification, Follow} from 'db/models'

export const resolvers = {
    Query: {
        async me(root, args, context) {
            const provider: UsersProviderInterface = context.injector.get(UsersProvider)
            return await provider.findUserById(context.currentUserId)
        },
        async user(root, args: QueryUserArgs, {injector}) {
            const provider: UsersProviderInterface = injector.get(UsersProvider)
            return await provider.findUserById(args.id)
        },
        async userBySlug(root, args: QueryUserBySlugArgs, {injector}) {
            const provider: UsersProviderInterface = injector.get(UsersProvider)
            return await provider.findUserBySlug(args.slug)
        },
        async users(root, args, {injector}) {
            const provider: UsersProviderInterface = injector.get(UsersProvider)
            return await provider.getAllUsers()
        },
    },
    Notification: {
        async creator(notification: Notification, args, {injector}) {
            const provider: UsersProviderInterface = injector.get(UsersProvider)
            return await provider.findUserById(notification.creatorId)
        },
    },
    Like: {
        async user(like: Like, args, {injector}) {
            const provider: UsersProviderInterface = injector.get(UsersProvider)
            return await provider.findUserById(like.userId)
        },
    },
    Follow: {
        async follower(follow: Follow, args, {injector}) {
            const provider: UsersProviderInterface = injector.get(UsersProvider)
            return await provider.findUserById(follow.followerUserId)
        },
        async followed(follow: Follow, args, {injector}) {
            const provider: UsersProviderInterface = injector.get(UsersProvider)
            return await provider.findUserById(follow.followedUserId)
        },
    },
    Mutation: {
        async uploadUserImage(root, args: MutationUploadUserImageArgs, context) {
            const provider: UsersProviderInterface = context.injector.get(UsersProvider)

            if (args.imageVariant === ImageVariant.Profile) {
                return await provider.uploadProfileImage(context.currentUserId, args.file)
            } else if (args.imageVariant === ImageVariant.Cover) {
                return await provider.uploadCoverImage(context.currentUserId, args.file)
            } else {
                throw new UserInputError('Wrong image variant provided')
            }
        },
        async updateUserDetails(root, args: MutationUpdateUserDetailsArgs, context) {
            const provider: UsersProviderInterface = context.injector.get(UsersProvider)
            const [, users] = await provider.updateUserDetails(context.currentUserId, args.details)

            return users
        },
        async confirmEmail(root, args: MutationConfirmEmailArgs, context) {
            const provider: UsersProviderInterface = context.injector.get(UsersProvider)
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
