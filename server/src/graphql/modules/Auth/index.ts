import {GraphQLModule} from '@graphql-modules/core'
import {tokens} from 'di/tokens'
import {attachSession, composeContext} from 'graphql/context'
import {AuthProvider} from 'graphql/modules/Auth/providers/AuthProvider'
import {resolvers} from 'graphql/modules/Auth/resolvers'
import {UserRepository} from 'db/repositories/UserRepository'
import * as typeDefs from 'graphql/modules/Auth/schema.graphql'

export const AuthModule = new GraphQLModule({
    providers: [
        {provide: tokens.AUTH_PROVIDER, useClass: AuthProvider},
        {provide: tokens.USER_REPOSITORY, useClass: UserRepository}
    ],
    typeDefs,
    resolvers,
    // @ts-ignore
    context: composeContext([
        attachSession
    ])
})