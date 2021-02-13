import {createModule} from 'graphql-modules'

import {UsersProvider} from 'api/modules/User/UsersProvider'
import {resolvers} from 'api/modules/User/resolvers'
import {UserRepository} from 'db/repositories/User'

import typeDefs from './schema'
import {EmailConfirmationRepository} from 'db/repositories/EmailConfirmation'
import {authenticate} from 'api/guards'

export const UserModule = createModule({
    id: 'UserModule',
    providers: [UsersProvider, UserRepository, EmailConfirmationRepository],
    typeDefs,
    resolvers,
    middlewares: {
        Query: {
            me: [authenticate],
        },
        Mutation: {
            uploadUserImage: [authenticate],
            updateUserDetails: [authenticate],
        },
    },
})
