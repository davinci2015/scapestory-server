import gql from 'graphql-tag'

export interface LoginResult {
    login: {
        token: string
    }
}

export interface LoginVariables {
    email: string
    password: string
}

export const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`
