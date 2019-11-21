import {GraphQLModule} from '@graphql-modules/core'
import {FollowRepository} from 'db/repositories/Follow'
import {UserRepository} from 'db/repositories/User'
import {FollowProvider} from 'graphql/modules/Follow/FollowProvider'
import {
    followResolvers,
    followResolversComposition,
} from 'graphql/modules/Follow/resolvers'
import {composeContext, attachCurrentUserId} from 'graphql/context'
import {tokens} from 'di/tokens'
import * as followDefs from 'graphql/modules/Follow/schema.graphql'

// @ts-ignore
export const FollowModule = new GraphQLModule({
    providers: [
        {provide: tokens.FOLLOW_PROVIDER, useClass: FollowProvider},
        {provide: tokens.FOLLOW_REPOSITORY, useClass: FollowRepository},

        {provide: tokens.USER_REPOSITORY, useClass: UserRepository},
    ],
    typeDefs: followDefs,
    resolvers: followResolvers,
    resolversComposition: followResolversComposition,
    context: composeContext([attachCurrentUserId]),
})
