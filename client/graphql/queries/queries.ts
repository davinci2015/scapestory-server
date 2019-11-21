import gql from 'graphql-tag'

export interface AquascapeData {
    id: number
    title: string
    slug: string
    mainImage: string
    viewsCount: number
    likesCount: number
    tags: [
        {
            name: string
        }
    ]
    user: {
        id: number
        name?: string
        profileImage?: string
        username: string
    }
}

export interface AquascapesResult {
    aquascapes: {
        rows: AquascapeData[]
        count: number
        __typename?: string
    }
}

export interface UserProfile {
    id: number
    email: string
    username: string
    name?: string
    country?: string
    profileImage?: string
}

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
