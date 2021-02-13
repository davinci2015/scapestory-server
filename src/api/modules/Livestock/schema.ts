import {gql} from 'graphql-modules'

export default gql`
    type Livestock {
        id: Int!
        name: String!
        description: String
        image: String
    }

    extend type Query {
        livestock: [Livestock!]!
    }

    extend type Mutation {
        addLivestock(livestockId: Int, name: String, aquascapeId: Int!): Livestock!
        removeLivestock(livestockId: Int!, aquascapeId: Int!): Livestock
    }
`
