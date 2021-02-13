import {gql} from 'graphql-modules'

export default gql`
    type Hardscape {
        id: Int!
        predefined: Boolean!
        name: String!
        description: String
        image: String
    }

    extend type Query {
        hardscape: [Hardscape!]!
    }

    extend type Mutation {
        addHardscape(hardscapeId: Int, name: String, aquascapeId: Int!): Hardscape!
        removeHardscape(hardscapeId: Int!, aquascapeId: Int!): Hardscape
    }
`
