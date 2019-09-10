import {GraphQLModule} from '@graphql-modules/core'
import {UsersProvider} from 'graphql/modules/User/UsersProvider'
import {resolvers, resolversComposition} from 'graphql/modules/User/resolvers'
import {UserRepository} from 'db/repositories/User'
import {composeContext, attachCurrentUserId} from 'graphql/context'
import {tokens} from 'di/tokens'
import * as typeDefs from 'graphql/modules/User/schema.graphql'

// @ts-ignore
export const UserModule = new GraphQLModule({
    providers: [
        {provide: tokens.USER_PROVIDER, useClass: UsersProvider},
        {provide: tokens.USER_REPOSITORY, useClass: UserRepository},
    ],
    typeDefs,
    resolvers,
    resolversComposition,
    context: composeContext([
        attachCurrentUserId
    ])
})