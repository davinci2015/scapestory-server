import gql from 'graphql-tag'

export const USER_BY_SLUG = gql`
    query UserBySlug($slug: String!) {
        userBySlug(slug: $slug) {
            id
            email
            slug
            name
            country
            profileImage
            youtubeLink
            instagramLink
            followersCount
            followingCount
            isFollowedByMe
        }
    }
`
