import {GraphQLModule} from '@graphql-modules/core'
import {FollowRepository} from 'db/repositories/Follow'
import {UserRepository} from 'db/repositories/User'
import {FollowProvider} from 'api/modules/Follow/FollowProvider'
import {resolvers, resolversComposition} from 'api/modules/Follow/resolvers'
import {tokens} from 'di/tokens'
import * as typeDefs from 'api/modules/Follow/schema.graphql'
import {attachCurrentUserId, composeContext} from 'api/context'

export const FollowModule = new GraphQLModule({
    providers: [
        {provide: tokens.FOLLOW_PROVIDER, useClass: FollowProvider},
        {provide: tokens.FOLLOW_REPOSITORY, useClass: FollowRepository},
        {provide: tokens.USER_REPOSITORY, useClass: UserRepository},
    ],
    typeDefs,
    resolvers,
    resolversComposition,
    context: composeContext([attachCurrentUserId]),
})
