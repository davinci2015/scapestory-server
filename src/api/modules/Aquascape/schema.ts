import {gql} from 'graphql-modules'

export default gql`
    type CO2 {
        id: Int!
        type: String
        bps: Int
    }

    type Tag {
        id: Int!
        predefined: Boolean!
        name: String!
    }

    type Tank {
        id: Int!
        volume: Float
        width: Float
        height: Float
        depth: Float
        glassThickness: Float
    }

    extend type User {
        aquascapes(pagination: Pagination!, random: Boolean): AquascapesResult!
    }

    extend type Comment {
        aquascape: Aquascape
    }

    extend type Like {
        aquascape: Aquascape
    }

    type Aquascape {
        id: Int!
        createdAt: String!
        updatedAt: String!
        title: String
        featured: Boolean!
        trending: Boolean!
        description: String
        userId: Int!
        co2: CO2
        tank: Tank
        mainImageUrl: String
        mainImagePublicId: String
        images: [AquascapeImage!]!
        tags: [Tag!]!
        plants: [Plant!]!
        hardscape: [Hardscape!]!
        livestock: [Livestock!]!
        filters: [Filter!]!
        lights: [Light!]!
        substrates: [Substrate!]!
        additives: [Additive!]!
    }

    input AquascapesFilter {
        trending: Boolean
    }

    type AquascapesResult {
        rows: [Aquascape!]!
        count: Int!
    }

    extend type Query {
        aquascapes(pagination: Pagination!, userId: Int, random: Boolean): AquascapesResult!
        trendingAquascapes(pagination: Pagination!): [Aquascape!]!
        featuredAquascape: Aquascape
        aquascape(id: Int!): Aquascape
    }

    type MainImageUploadResult {
        mainImagePublicId: String!
        mainImageUrl: String!
    }

    extend type Mutation {
        createAquascape: Aquascape!
        updateAquascapeTitle(aquascapeId: Int!, title: String!): String
        updateAquascapeMainImage(aquascapeId: Int!, file: Upload!): MainImageUploadResult!
        removeAquascape(aquascapeId: Int!): Int!
    }
`
