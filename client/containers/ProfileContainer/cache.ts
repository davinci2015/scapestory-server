import {DataProxy} from 'apollo-cache'
import {FetchResult} from 'apollo-link'
import gql from 'graphql-tag'

export enum ProfileActions {
    FOLLOW,
    UNFOLLOW,
    UPLOAD_COVER_IMAGE,
    UPLOAD_PROFILE_IMAGE,
}

interface Payload {
    slug: string
    [key: string]: any
}

export const updateProfileCache = (action: ProfileActions, payload: Payload) => (
    cache: DataProxy,
    mutationResult: FetchResult<any>
) => {
    const mutationData = mutationResult.data
    let query
    let data

    if (!mutationData) return

    switch (action) {
        case ProfileActions.FOLLOW:
            query = gql`query { userBySlug(slug: "${payload.slug}") { id isFollowedByMe followersCount}}`
            data = cache.readQuery<any>({query})

            return cache.writeQuery({
                query,
                data: {
                    userBySlug: {
                        ...data.userBySlug,
                        isFollowedByMe: true,
                        followersCount: data.userBySlug.followersCount + 1,
                    },
                },
            })

        case ProfileActions.UNFOLLOW:
            query = gql`query { userBySlug(slug: "${payload.slug}") { id isFollowedByMe followersCount }}`
            data = cache.readQuery<any>({query})

            return cache.writeQuery({
                query,
                data: {
                    userBySlug: {
                        ...data.userBySlug,
                        isFollowedByMe: false,
                        followersCount: data.userBySlug.followersCount - 1,
                    },
                },
            })

        case ProfileActions.UPLOAD_COVER_IMAGE:
            query = gql`query { userBySlug(slug: "${payload.slug}") { id coverImage coverImagePublicId }}`
            data = cache.readQuery<any>({query})

            if (!mutationData.uploadUserImage.imageUrl) return

            return cache.writeQuery({
                query,
                data: {
                    userBySlug: {
                        ...data.userBySlug,
                        coverImage: mutationData.uploadUserImage.imageUrl,
                        coverImagePublicId: mutationData.uploadUserImage.imagePublicId,
                    },
                },
            })

        case ProfileActions.UPLOAD_PROFILE_IMAGE:
            query = gql`query { userBySlug(slug: "${payload.slug}") { id profileImage profileImagePublicId }}`
            data = cache.readQuery<any>({query})

            if (!mutationData.uploadUserImage.imageUrl) return

            return cache.writeQuery({
                query,
                data: {
                    userBySlug: {
                        ...data.userBySlug,
                        profileImage: mutationData.uploadUserImage.imageUrl,
                        profileImagePublicId: mutationData.uploadUserImage.imagePublicId,
                    },
                },
            })

        default:
            return null
    }
}
