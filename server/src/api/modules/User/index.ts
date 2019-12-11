import {GraphQLModule} from '@graphql-modules/core'

import {UsersProvider} from 'api/modules/User/UsersProvider'
import {resolvers, resolversComposition} from 'api/modules/User/resolvers'
import {UserRepository} from 'db/repositories/User'

import * as typeDefs from './schema.graphql'
import {tokens} from 'di/tokens'
import {composeContext, attachCurrentUserId} from 'api/context'

export const UserModule = new GraphQLModule({
    providers: [
        {provide: tokens.USER_PROVIDER, useClass: UsersProvider},
        {provide: tokens.USER_REPOSITORY, useClass: UserRepository},
    ],
    typeDefs,
    resolvers,
    resolversComposition,
    context: composeContext([attachCurrentUserId])
})
