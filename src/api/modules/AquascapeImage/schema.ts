import {gql} from 'graphql-modules'

export default gql`
    type AquascapeImage {
        id: Int!
        title: String
        description: String
        url: String!
        publicId: String!
        createdAt: String!
        updatedAt: String!
    }

    extend type Mutation {
        addAquascapeImage(aquascapeId: Int!, file: Upload!): AquascapeImage!
        deleteAquascapeImage(aquascapeId: Int!, imageId: Int!): Int
    }
`
