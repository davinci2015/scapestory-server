import gql from 'graphql-tag'

export const DELETE_AQUASCAPE_IMAGE = gql`
    mutation DeleteAquascapeImage($aquascapeId: Int!, $imageId: Int!) {
        deleteAquascapeImage(aquascapeId: $aquascapeId, imageId: $imageId)
    }
`

export const ADD_AQUASCAPE_IMAGE = gql`
    mutation AddAquascapeImage($aquascapeId: Int!, $file: Upload!) {
        addAquascapeImage(aquascapeId: $aquascapeId, file: $file) {
            id
            url
            title
            createdAt
        }
    }
`
