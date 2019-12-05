import gql from 'graphql-tag'

export const UPDATE_AQUASCAPE_TITLE = gql`
    mutation UpdateAquascapeTitle($aquascapeId: Int!, $title: String!) {
        updateAquascapeTitle(aquascapeId: $aquascapeId, title: $title)
    }
`
