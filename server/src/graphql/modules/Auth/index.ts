import {GraphQLModule} from '@graphql-modules/core'
import {tokens} from 'di/tokens'
import {AuthProvider} from 'graphql/modules/Auth/providers/AuthProvider'
import {resolvers, resolversComposition} from 'graphql/modules/Auth/resolvers'
import {UserRepository} from 'db/repositories/User'
import {SocialLoginRepository} from 'db/repositories/SocialLogin'
import * as typeDefs from 'graphql/modules/Auth/schema.graphql'

// @ts-ignore
export const AuthModule = new GraphQLModule({
    providers: [
        {provide: tokens.AUTH_PROVIDER, useClass: AuthProvider},
        {provide: tokens.USER_REPOSITORY, useClass: UserRepository},
        {
            provide: tokens.SOCIAL_LOGIN_REPOSITORY,
            useClass: SocialLoginRepository,
        },
    ],
    typeDefs,
    resolvers,
    resolversComposition,
})
