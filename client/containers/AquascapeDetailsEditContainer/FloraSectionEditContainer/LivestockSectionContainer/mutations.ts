import gql from 'graphql-tag'

export const REMOVE_LIVESTOCK = gql`
    mutation removePlant($plantId: Int!, $aquascapeId: Int!) {
        removePlant(plantId: $plantId, aquascapeId: $aquascapeId) {
            id
            name
        }
    }
`

export const ADD_LIVESTOCK = gql`
    mutation addPlant($plantId: Int, $name: String, $aquascapeId: Int!) {
        addPlant(plantId: $plantId, name: $name, aquascapeId: $aquascapeId) {
            id
            name
        }
    }
`
