import {createModule} from 'graphql-modules'

import {AuthProvider} from 'api/modules/Auth/AuthProvider'
import {resolvers} from 'api/modules/Auth/resolvers'
import {UserRepository} from 'db/repositories/User'
import {SocialLoginRepository} from 'db/repositories/SocialLogin'
import typeDefs from './schema'
import {validate} from 'api/guards'
import {loginValidationSchema} from 'api/modules/Auth/validation'
import {EmailConfirmationRepository} from 'db/repositories/EmailConfirmation'

export const AuthModule = createModule({
    id: 'AuthModule',
    providers: [AuthProvider, UserRepository, SocialLoginRepository, EmailConfirmationRepository],
    typeDefs,
    resolvers,
    middlewares: {
        Mutation: {
            login: [validate(loginValidationSchema)],
            register: [validate(loginValidationSchema)],
        },
    },
})
