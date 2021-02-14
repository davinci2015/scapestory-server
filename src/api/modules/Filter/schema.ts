import {gql} from 'graphql-modules'

export default gql`
    type Filter implements Equipment {
        id: Int!
        predefined: Boolean!
        model: String!
        description: String
        image: String
    }

    extend type Query {
        filters: [Filter!]!
    }
`
