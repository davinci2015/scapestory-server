import {GraphQLModule} from '@graphql-modules/core'
import * as userDef from './typeDefs/user.graphql'
import resolver from './resolvers'
import {UsersProvider} from './providers/UsersProvider'

const UserModule = new GraphQLModule({
    providers: [UsersProvider],
    typeDefs: userDef,
    resolvers: resolver,
})

export {UserModule}