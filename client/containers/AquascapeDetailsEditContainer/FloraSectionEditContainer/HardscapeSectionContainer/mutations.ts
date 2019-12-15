import gql from 'graphql-tag'

export const REMOVE_HARDSCAPE = gql`
    mutation removeHardscape($plantId: Int!, $aquascapeId: Int!) {
        removeHardscape(plantId: $plantId, aquascapeId: $aquascapeId) {
            id
            name
        }
    }
`

export const ADD_HARDSCAPE = gql`
    mutation removeHardscape($plantId: Int, $name: String, $aquascapeId: Int!) {
        removeHardscape(plantId: $plantId, name: $name, aquascapeId: $aquascapeId) {
            id
            name
        }
    }
`
