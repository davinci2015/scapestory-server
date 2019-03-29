import {GraphQLModule} from '@graphql-modules/core'
import {UsersProvider} from 'graphql/modules/User/providers/UsersProvider'
import {userResolvers, userResolversComposition} from 'graphql/modules/User/resolvers'
import {UserRepository} from 'db/repositories/UserRepository'
import {tokens} from 'di/tokens'
import {contextBuilder} from 'graphql/context'
import * as userDefs from 'graphql/modules/User/schema.graphql'

export const UserModule = new GraphQLModule({
    providers: [
        {provide: tokens.USERS_PROVIDER, useClass: UsersProvider},
        {provide: tokens.USER_REPOSITORY, useClass: UserRepository},
    ],
    typeDefs: userDefs,
    resolvers: userResolvers,
    resolversComposition: userResolversComposition,
    context: contextBuilder.authentication,
})