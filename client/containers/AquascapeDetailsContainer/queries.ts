import gql from 'graphql-tag'
import {fragments} from 'graphql/queries'

export const AQUASCAPE_DETAILS = gql`
    query AquascapeDetails($id: Int!) {
        aquascapes(pagination: {limit: 4}, random: true) {
            rows {
                ...AquascapeFields
            }
        }

        aquascape(id: $id) {
            id
            title
            mainImage
            viewsCount
            likesCount
            isLikedByMe

            plants {
                id
                name
            }

            livestock {
                id
                name
            }

            hardscape {
                id
                name
            }

            lights {
                id
                brand
                model
            }

            filters {
                id
                brand
                model
            }

            co2 {
                id
                type
                bps
            }

            substrates {
                id
                brand
                name
            }

            additives {
                id
                brand
                name
            }

            tags {
                name
            }

            images {
                id
                title
                url
            }

            user {
                id
                name
                profileImage
                slug
                isFollowedByMe
                aquascapes(pagination: {limit: 4}, random: true) {
                    rows {
                        ...AquascapeFields
                    }
                }
            }

            comments {
                ...CommentFields
            }
        }
    }

    ${fragments.aquascape}
    ${fragments.comments}
`
