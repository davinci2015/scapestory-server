import gql from 'graphql-tag'

export const ADD_EQUIPMENT = gql`
    mutation AddEquipment($equipment: EquipmentArgs!, $aquascapeId: Int!) {
        addEquipment(equipment: $equipment, aquascapeId: $aquascapeId) {
            id
            model
            brand {
                id
                name
            }
        }
    }
`

export const REMOVE_EQUIPMENT = gql`
    mutation RemoveEquipment($equipment: EquipmentArgs!, $aquascapeId: Int!) {
        removeEquipment(equipment: $equipment, aquascapeId: $aquascapeId) {
            id
            model
            brand {
                id
                name
            }
        }
    }
`
