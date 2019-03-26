import {GraphQLModule} from '@graphql-modules/core'
import {tokens} from 'di/tokens'
import {AuthProvider} from 'graphql/modules/Auth/providers/AuthProvider'
import {authResolvers} from 'graphql/modules/Auth/resolvers'
import {UserRepository} from 'db/repositories/UserRepository'
import * as authDefs from 'graphql/modules/Auth/schema.graphql'

export const AuthModule = new GraphQLModule({
    providers: [
        {provide: tokens.AUTH_PROVIDER, useClass: AuthProvider},
        {provide: tokens.USER_REPOSITORY, useClass: UserRepository}
    ],
    typeDefs: authDefs,
    resolvers: authResolvers
})