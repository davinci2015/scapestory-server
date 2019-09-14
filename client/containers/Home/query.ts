import gql from 'graphql-tag'

export interface Pagination {
    limit: number
    offset: number
}

export interface AquascapesFilter {
    trending: boolean
}

const fragments = {
    aquascape: gql`
        fragment AquascapeFields on Aquascape {
            id 
            title
            mainImage
            viewsCount
            likesCount
            tags {  
                name
            }

            user {
                name
                profileImage
                username
            }
        }
    `
}

export const QUERY_RECENT_AQUASCAPES = gql`
    query RecentAquascapes($pagination: Pagination!) {
        aquascapes(pagination: $pagination) {
            ...AquascapeFields
        }
    }
    ${fragments.aquascape}
`

export const QUERY_TRENDING_AND_FEATURED_AQUASCAPES = gql`
    query Aquascapes($pagination: Pagination!) {
        trending: aquascapes(pagination: $pagination, filter: { trending: true }) {
            ...AquascapeFields
        }
        featured: featuredAquascape {
            ...AquascapeFields
        }
    }
    ${fragments.aquascape}
`