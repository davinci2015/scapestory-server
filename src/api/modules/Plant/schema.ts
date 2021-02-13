import {gql} from 'graphql-modules'

export default gql`
    enum PlantGrowthSpeed {
        SLOW
        MEDIUM
        HIGH
    }

    enum PlantDifficulty {
        EASY
        MEDIUM
        ADVANCED
    }

    enum PlantLuminosity {
        LOW
        MEDIUM
        HIGH
    }

    enum PlantPosition {
        FRONT
        MIDDLE
        BACK
        FRONT_MIDDLE
        MIDDLE_BACK
    }

    type Plant {
        id: Int!
        name: String!
        description: String
        image: String
        origin: String
        minHeight: Int
        maxHeight: Int
        position: PlantPosition
        luminosity: PlantLuminosity
        growthSpeed: PlantGrowthSpeed
        difficulty: PlantDifficulty
        infoFulfilled: Boolean!
    }

    extend type Query {
        plants: [Plant!]!
        plantById(id: Int!): Plant
    }

    extend type Mutation {
        addPlant(plantId: Int, name: String, aquascapeId: Int!): Plant!
        removePlant(plantId: Int!, aquascapeId: Int!): Plant
    }
`
