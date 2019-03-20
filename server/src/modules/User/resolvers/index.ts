import {ModuleContext} from '@graphql-modules/core'
import {UsersProvider} from '../providers/UsersProvider'

export default {
    Query: {
        users: (root, args, {injector}: ModuleContext) => injector.get(UsersProvider).allUsers(),
        me: (root, {id}, {injector}: ModuleContext) => injector.get(UsersProvider).getUser(id)
    },
    User: {
        id: user => user._id,
        username: user => user.username,
    },
}