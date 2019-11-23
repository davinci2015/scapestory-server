import {DataProxy} from 'apollo-cache'
import {FetchResult} from 'apollo-link'
import gql from 'graphql-tag'

export enum ProfileActions {
    FOLLOW,
    UNFOLLOW,
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
            query = gql`query { userBySlug(slug: "${payload.slug}") { id isFollowedByMe }}`
            data = cache.readQuery<any>({query})

            return cache.writeQuery({
                query,
                data: {
                    userBySlug: {
                        ...data.userBySlug,
                        isFollowedByMe: true,
                    },
                },
            })

        case ProfileActions.UNFOLLOW:
            query = gql`query { userBySlug(slug: "${payload.slug}") { id isFollowedByMe }}`
            data = cache.readQuery<any>({query})

            return cache.writeQuery({
                query,
                data: {
                    userBySlug: {
                        ...data.userBySlug,
                        isFollowedByMe: false,
                    },
                },
            })

        default:
            return null
    }
}
