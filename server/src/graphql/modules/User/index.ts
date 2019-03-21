import {GraphQLModule} from '@graphql-modules/core'
import {UsersProvider} from 'graphql/modules/User/UsersProvider'
import {userResolvers} from 'graphql/modules/User/resolvers'
import {tokens} from 'graphql/di/tokens'
import * as userDefs from 'graphql/modules/User/schema.graphql'

export const UserModule = new GraphQLModule({
    providers: [{
        provide: tokens.USERS_PROVIDER,
        useClass: UsersProvider
    }],
    typeDefs: userDefs,
    resolvers: userResolvers
})