import gql from 'graphql-tag'

export const REMOVE_PLANT = gql`
    mutation removePlant($plantId: Int!, $aquascapeId: Int!) {
        removePlant(plantId: $plantId, aquascapeId: $aquascapeId) {
            id
            name
        }
    }
`

export const ADD_PLANT = gql`
    mutation addPlant($plantId: Int, $name: String, $aquascapeId: Int!) {
        addPlant(plantId: $plantId, name: $name, aquascapeId: $aquascapeId) {
            id
            name
        }
    }
`
