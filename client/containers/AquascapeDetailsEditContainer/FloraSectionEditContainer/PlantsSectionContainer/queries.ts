import gql from 'graphql-tag'

export const PLANTS = gql`
    query plants {
        plants {
            id
            name
        }
    }
`
