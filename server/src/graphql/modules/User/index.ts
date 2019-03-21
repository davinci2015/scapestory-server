import {GraphQLModule} from '@graphql-modules/core'
import {UsersProvider} from './UsersProvider'
import {userDef, userResolvers} from './User'

const UserModule = new GraphQLModule({
    providers: [UsersProvider],
    typeDefs: userDef,
    resolvers: userResolvers
})

export {UserModule}