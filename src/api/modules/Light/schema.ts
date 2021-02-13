import {gql} from 'graphql-modules'

export default gql`
    type Light implements Equipment {
        id: Int!
        predefined: Boolean!
        model: String!
        width: Float
        height: Float
        depth: Float
        power: Float
        lumenMin: Int
        lumenMax: Int
        kelvinMin: Int
        kelvinMax: Int
        dimmable: Boolean
        description: String
        image: String
    }

    extend type Query {
        lights: [Light!]!
    }

    extend type Mutation {
        addLight(brand: String!, model: String!, aquascapeId: Int!): Light!
        removeLight(lightId: Int!, aquascapeId: Int!): Light
    }
`
