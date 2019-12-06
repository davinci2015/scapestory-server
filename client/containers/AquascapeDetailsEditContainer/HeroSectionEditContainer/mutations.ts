import gql from 'graphql-tag'

export const UPDATE_AQUASCAPE_TITLE = gql`
    mutation UpdateAquascapeTitle($aquascapeId: Int!, $title: String!) {
        updateAquascapeTitle(aquascapeId: $aquascapeId, title: $title)
    }
`

export const UPDATE_AQUASCAPE_MAIN_IMAGE = gql`
    mutation updateAquascapeMainImage($aquascapeId: Int!, $file: Upload!) {
        updateAquascapeMainImage(aquascapeId: $aquascapeId, file: $file) {
            publicId
            secureUrl
        }
    }
`
