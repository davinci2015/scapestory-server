import gql from 'graphql-tag'
import {fragments, AquascapeData} from 'graphql/queries'
import {
    Plant,
    Livestock,
    Hardscape,
    Light,
    Filter,
    Substrate,
    Additive,
    Co2,
    User,
    AquascapeImage,
    Like,
} from 'generated/graphql'

export interface AquascapeDetails {
    id: number
    title: string
    mainImage: string
    viewsCount: number
    likesCount: number
    isLikedByMe: boolean
    plants: Pick<Plant, 'id' | 'name'>[]
    livestock: Pick<Livestock, 'id' | 'name'>[]
    hardscape: Pick<Hardscape, 'id' | 'name'>[]
    lights: Pick<Light, 'id' | 'brand' | 'model'>[]
    filters: Pick<Filter, 'id' | 'brand' | 'model'>[]
    co2?: Pick<Co2, 'id' | 'type' | 'bps'>
    substrates: Pick<Substrate, 'id' | 'brand' | 'name'>[]
    additives: Pick<Additive, 'id' | 'brand' | 'name'>[]
    tags: {name: string}[]
    images: Pick<AquascapeImage, 'id' | 'url' | 'title'>[]
    user: Pick<
        User,
        'id' | 'name' | 'profileImage' | 'username' | 'isFollowedByMe'
    > & {
        aquascapes: AquascapeData[]
    }
    comments: AquascapeComment[]
}

export interface AquascapeComment {
    id: number
    content: string
    createdAt: string
    parentCommentId?: number
    likes: Pick<Like, 'id' | 'userId'>[]
    user: Pick<User, 'id' | 'name' | 'profileImage' | 'username'>
}

export interface AquascapeDetailsQuery {
    aquascapes: AquascapeData[]
    aquascape: AquascapeDetails
}

export const AQUASCAPE_DETAILS = gql`
    query Aquascape($id: Int!) {
        aquascapes(pagination: {limit: 4}, random: true) {
            ...AquascapeFields
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
                username
                isFollowedByMe
                aquascapes(pagination: {limit: 4}, random: true) {
                    ...AquascapeFields
                }
            }

            comments {
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
        }
    }

    ${fragments.aquascape}
`
