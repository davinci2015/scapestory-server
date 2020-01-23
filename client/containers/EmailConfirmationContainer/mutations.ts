import gql from 'graphql-tag'

export const CONFIRM_EMAIL = gql`
    mutation confirmEmail($token: String) {
        confirmEmail(token: $token) {
            token
        }
    }
`
