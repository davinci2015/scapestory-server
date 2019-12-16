import gql from 'graphql-tag'

export const REMOVE_HARDSCAPE = gql`
    mutation removeHardscape($hardscapeId: Int!, $aquascapeId: Int!) {
        removeHardscape(hardscapeId: $hardscapeId, aquascapeId: $aquascapeId) {
            id
            name
        }
    }
`

export const ADD_HARDSCAPE = gql`
    mutation addHardscape($hardscapeId: Int, $name: String, $aquascapeId: Int!) {
        addHardscape(hardscapeId: $hardscapeId, name: $name, aquascapeId: $aquascapeId) {
            id
            name
        }
    }
`
