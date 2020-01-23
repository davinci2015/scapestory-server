import gql from 'graphql-tag'

export const SIGN_UP_MUTATION = gql`
    mutation SignUp($email: String!, $password: String!, $name: String!) {
        register(email: $email, password: $password, name: $name) {
            id
        }
    }
`
