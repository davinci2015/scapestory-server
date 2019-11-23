import gql from 'graphql-tag'

export const fragments = {
    aquascape: gql`
        fragment AquascapeFields on Aquascape {
            id
            createdAt
            title
            mainImage
            viewsCount
            likesCount
            tags {
                name
            }

            user {
                id
                name
                profileImage
                username
            }
        }
    `,
    comments: gql`
        fragment CommentFields on Comment {
            id
            content
            createdAt
            parentCommentId
            likes {
                id
                userId
            }
            user {
                id
                name
                username
                profileImage
            }
        }
    `,
}

export const USER_PROFILE = gql`
    query USER_PROFILE {
        me {
            id
            email
            username
            name
            country
            profileImage
        }
    }
`

export const AQUASCAPES = gql`
    query Aquascapes($pagination: Pagination!, $userId: Int) {
        aquascapes(pagination: $pagination, userId: $userId) {
            count
            rows {
                ...AquascapeFields
            }
        }
    }
    ${fragments.aquascape}
`

export const FEATURED_AQUASCAPE = gql`
    query FeaturedAquascapes {
        featured: featuredAquascape {
            ...AquascapeFields
        }
    }
    ${fragments.aquascape}
`

export const TRENDING_AQUASCAPES = gql`
    query TrendingAquascapes($pagination: Pagination!) {
        trending: trendingAquascapes(pagination: $pagination) {
            ...AquascapeFields
        }
    }
    ${fragments.aquascape}
`
