import {GraphQLModule} from '@graphql-modules/core'
import {FollowRepository} from 'db/repositories/Follow'
import {UserRepository} from 'db/repositories/User'
import {FollowProvider} from 'api/modules/Follow/FollowProvider'
import {
    followResolvers,
    followResolversComposition,
} from 'api/modules/Follow/resolvers'
import {tokens} from 'di/tokens'
import * as followDefs from 'api/modules/Follow/schema.graphql'
import {attachCurrentUserId, composeContext} from 'api/context'

export const FollowModule = new GraphQLModule({
    providers: [
        {provide: tokens.FOLLOW_PROVIDER, useClass: FollowProvider},
        {provide: tokens.FOLLOW_REPOSITORY, useClass: FollowRepository},

        {provide: tokens.USER_REPOSITORY, useClass: UserRepository},
    ],
    typeDefs: followDefs,
    resolvers: followResolvers,
    resolversComposition: followResolversComposition,
    context: composeContext([attachCurrentUserId])
})
