import gql from 'graphql-tag'
import {GraphQLModule, ModuleContext} from '@graphql-modules/core'
import {tokens} from 'graphql/di/tokens'
import {UsersProvider, UsersProviderInterface} from 'graphql/modules/User/UsersProvider'

const userDefs = gql`
    type Query {
        me(id: String!): User
        users: [User]
    }

    type User {
        id: String
        username: String
    }
`

const userResolvers = {
    Query: {
        me: (root, {id}, {injector}: ModuleContext) => {
            const provider: UsersProviderInterface = injector.get(tokens.USERS_PROVIDER)
            return provider.getUser(id)
        },
        users: (root, args, {injector}: ModuleContext) => {
            const provider: UsersProviderInterface = injector.get(tokens.USERS_PROVIDER)
            return provider.allUsers()
        }
    },
    User: {
        id: user => user._id,
        username: user => user.username
    }
}

export const UserModule = new GraphQLModule({
    providers: [{
        provide: tokens.USERS_PROVIDER,
        useClass: UsersProvider
    }],
    typeDefs: userDefs,
    resolvers: userResolvers
})