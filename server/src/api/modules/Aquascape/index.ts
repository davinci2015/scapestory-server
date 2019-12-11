import {GraphQLModule} from '@graphql-modules/core'

import {AquascapeRepository} from 'db/repositories/Aquascape'
import {LikeRepository} from 'db/repositories/Like'
import {TagRepository} from 'db/repositories/Tag'
import {UserRepository} from 'db/repositories/User'

import {UsersProvider} from 'api/modules/User/UsersProvider'
import {LikeProvider} from 'api/modules/Like/LikeProvider'
import {tokens} from 'di/tokens'

import {AquascapeProvider} from './AquascapeProvider'
import {resolvers, resolversComposition} from './resolvers'
import * as typeDefs from './schema.graphql'
import {attachCurrentUserId, composeContext} from 'api/context'

// @ts-ignore
export const AquascapeModule = new GraphQLModule({
    providers: [
        {provide: tokens.AQUASCAPE_PROVIDER, useClass: AquascapeProvider},
        {provide: tokens.AQUASCAPE_REPOSITORY, useClass: AquascapeRepository},

        {provide: tokens.USER_PROVIDER, useClass: UsersProvider},
        {provide: tokens.USER_REPOSITORY, useClass: UserRepository},

        {provide: tokens.LIKE_PROVIDER, useClass: LikeProvider},
        {provide: tokens.LIKE_REPOSITORY, useClass: LikeRepository},

        {provide: tokens.TAG_REPOSITORY, useClass: TagRepository},
    ],
    typeDefs,
    resolvers,
    resolversComposition,
    context: composeContext([attachCurrentUserId])
})