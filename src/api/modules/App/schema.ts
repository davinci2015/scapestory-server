import {gql} from 'graphql-modules'

export default gql`
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }

    scalar Upload

    input Pagination {
        limit: Int
        cursor: String
        offset: Int
    }
`
