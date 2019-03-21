import {ModuleContext} from '@graphql-modules/core'
import {UsersProvider} from './UsersProvider'
import gql from 'graphql-tag'

export const userDef = gql`
    type Query {
        me: User
        users: [User]
    }

    type User {
        id: String
        username: String
    }
`

export const userResolvers = {
    Query: {
        me: (root, {id}, {injector}: ModuleContext) => injector.get(UsersProvider).getUser(id),
        users: (root, args, {injector}: ModuleContext) => injector.get(UsersProvider).allUsers()
    },
    User: {
        id: user => user._id,
        username: user => user.username,
    },
}