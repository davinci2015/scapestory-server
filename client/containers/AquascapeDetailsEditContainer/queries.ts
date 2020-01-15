import gql from 'graphql-tag'

export const AQUASCAPE_DETAILS_EDIT = gql`
    query AquascapeDetailsEdit($id: Int!) {
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
            }
        }
    }
`
