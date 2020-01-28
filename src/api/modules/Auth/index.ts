import {GraphQLModule} from '@graphql-modules/core'
import {tokens} from 'di/tokens'
import {AuthProvider} from 'api/modules/Auth/providers/AuthProvider'
import {resolvers, resolversComposition} from 'api/modules/Auth/resolvers'
import {UserRepository} from 'db/repositories/User'
import {SocialLoginRepository} from 'db/repositories/SocialLogin'
import * as typeDefs from 'api/modules/Auth/schema.graphql'
import {attachSession, composeContext} from 'api/context'
import {UserModule} from 'api/modules/User'

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
    context: composeContext([attachSession]),
    imports: [UserModule]
})
