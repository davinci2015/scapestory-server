import gql from 'graphql-tag'

export const REMOVE_LIVESTOCK = gql`
    mutation removeLivestock($livestockId: Int!, $aquascapeId: Int!) {
        removeLivestock(livestockId: $livestockId, aquascapeId: $aquascapeId) {
            id
            name
        }
    }
`

export const ADD_LIVESTOCK = gql`
    mutation addLivestock($livestockId: Int, $name: String, $aquascapeId: Int!) {
        addLivestock(livestockId: $livestockId, name: $name, aquascapeId: $aquascapeId) {
            id
            name
        }
    }
`
