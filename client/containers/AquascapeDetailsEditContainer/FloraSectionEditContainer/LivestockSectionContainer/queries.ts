import gql from 'graphql-tag'

export const LIVESTOCK = gql`
    query livestock {
        livestock {
            id
            name
        }
    }
`
