import gql from 'graphql-tag'

export const SIGN_UP_MUTATION = gql`
    mutation SignUp($email: String!, $password: String!) {
        register(email: $email, password: $password) {
            id
        }
    }
`
