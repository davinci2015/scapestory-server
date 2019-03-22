import {GraphQLModule} from '@graphql-modules/core'
import {tokens} from 'graphql/di/tokens'
import {AuthProvider} from 'graphql/modules/Auth/providers/AuthProvider'
import {authResolvers} from 'graphql/modules/Auth/resolvers'
import * as authDefs from 'graphql/modules/Auth/schema.graphql'

export const AuthModule = new GraphQLModule({
    providers: [{
        provide: tokens.AUTH_PROVIDER,
        useClass: AuthProvider
    }],
    typeDefs: authDefs,
    resolvers: authResolvers
})