import {gql} from 'graphql-modules'

export default gql`
    interface Equipment {
        id: Int!
        predefined: Boolean!
        model: String!
        description: String
        image: String
    }

    enum EquipmentType {
        FILTER
        SUBSTRATE
        LIGHT
        ADDITIVES
    }

    input EquipmentArgs {
        equipmentType: EquipmentType!
        equipmentId: Int
        name: String
    }

    extend type Mutation {
        addEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment!
        removeEquipment(equipment: EquipmentArgs!, aquascapeId: Int!): Equipment
    }
`
