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
import {Notification, Follow, Aquascape, Comment} from 'db/models'
import {UserDataLoader, UserDataLoaderInterface} from 'db/loaders/User'

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
        async creator(notification: Notification, args, context) {
            const loader: UserDataLoaderInterface = context.injector.get(UserDataLoader)
            return await loader.findUserById(notification.creatorId)
        },
    },
    Like: {
        async user(like: Like, args, context) {
            const loader: UserDataLoaderInterface = context.injector.get(UserDataLoader)
            return await loader.findUserById(like.userId)
        },
    },
    Follow: {
        async follower(follow: Follow, args, context) {
            const loader: UserDataLoaderInterface = context.injector.get(UserDataLoader)
            return await loader.findUserById(follow.followerUserId)
        },
        async followed(follow: Follow, args, context) {
            const loader: UserDataLoaderInterface = context.injector.get(UserDataLoader)
            return await loader.findUserById(follow.followedUserId)
        },
    },
    Aquascape: {
        async user(aquascape: Aquascape, args, context) {
            const loader: UserDataLoaderInterface = context.injector.get(UserDataLoader)
            return await loader.findUserById(aquascape.userId)
        },
    },
    Comment: {
        async user(comment: Comment, args, context) {
            const loader: UserDataLoaderInterface = context.injector.get(UserDataLoader)
            return await loader.findUserById(comment.userId)
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
