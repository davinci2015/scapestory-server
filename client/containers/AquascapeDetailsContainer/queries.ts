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
            mainImageUrl
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
                model
                brand {
                    id
                    name
                }
            }

            filters {
                id
                model
                brand {
                    id
                    name
                }
            }

            co2 {
                id
                type
                bps
            }

            substrates {
                id
                model
                brand {
                    id
                    name
                }
            }

            additives {
                id
                model
                brand {
                    id
                    name
                }
            }

            tags {
                name
            }

            images {
                id
                title
                url
                createdAt
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
