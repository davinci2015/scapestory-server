import gql from 'graphql-tag'

export interface RegisterResult {
    register: {
        token: string
    }
}

export interface RegisterVariables {
    email: string
    password: string
}

export const SIGN_UP_MUTATION = gql`
    mutation SignUp($email: String!, $password: String!) {
        register(email: $email, password: $password) {
            token
        }
    }
`
