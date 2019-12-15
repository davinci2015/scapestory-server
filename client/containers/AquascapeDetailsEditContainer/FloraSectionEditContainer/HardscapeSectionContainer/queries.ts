import gql from 'graphql-tag'

export const HARDSCAPE = gql`
    query hardscape {
        hardscape {
            id
            name
        }
    }
`
