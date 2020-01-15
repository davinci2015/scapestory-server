import gql from 'graphql-tag'

export const FILTERS = gql`
    query Filters {
        filters {
            id
            model
            brand {
                id
                name
            }
        }
    }
`
