import {gql} from 'graphql-modules'

export default gql`
    extend type Query {
        userProfileSlugExists(slug: String!): Boolean
    }

    extend type Mutation {
        login(email: String!, password: String!): AuthPayload
        register(email: String!, password: String!, name: String!): User
        fbRegister(token: String!): AuthPayload
        googleRegister(token: String!): AuthPayload
        resendConfirmationMail(email: String!): Int
    }
`
