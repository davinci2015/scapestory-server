import {GraphQLModule} from '@graphql-modules/core'

import {composeContext, attachCurrentUserId} from 'graphql/context'
import {AquascapeRepository} from 'db/repositories/Aquascape'
import {VisitorRepository} from 'db/repositories/Visitor'
import {LikeRepository} from 'db/repositories/Like'
import {UsersProvider} from 'graphql/modules/User/UsersProvider'
import {LikeProvider} from 'graphql/modules/Like/LikeProvider'
import {VisitorProvider} from 'graphql/modules/Visitor/VisitorProvider'
import {tokens} from 'di/tokens'

import {AquascapeProvider} from './AquascapeProvider'
import {resolvers, resolversComposition} from './resolvers'
import * as typeDefs from './schema.graphql'

// @ts-ignore
export const AquascapeModule = new GraphQLModule({
    providers: [
        {provide: tokens.AQUASCAPE_PROVIDER, useClass: AquascapeProvider},
        {provide: tokens.AQUASCAPE_REPOSITORY, useClass: AquascapeRepository},
        {provide: tokens.USERS_PROVIDER, useClass: UsersProvider},
        {provide: tokens.LIKE_PROVIDER, useClass: LikeProvider},
        {provide: tokens.LIKE_REPOSITORY, useClass: LikeRepository},
        {provide: tokens.VISITOR_PROVIDER, useClass: VisitorProvider},
        {provide: tokens.VISITOR_REPOSITORY, useClass: VisitorRepository},
    ],
    typeDefs,
    resolvers,
    resolversComposition,
    context: composeContext([
        attachCurrentUserId
    ])
})