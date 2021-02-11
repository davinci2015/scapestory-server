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
import {UserModule} from 'api/modules/User'
import {FilterModule} from 'api/modules/Filter'
import {LightModule} from 'api/modules/Light'
import {PlantModule} from 'api/modules/Plant'
import {HardscapeModule} from 'api/modules/Hardscape'
import {LivestockModule} from 'api/modules/Livestock'
import {SubstrateModule} from 'api/modules/Substrate'
import {AdditiveModule} from 'api/modules/Additive'
import {LikeModule} from 'api/modules/Like'
import {AquascapeImageModule} from 'api/modules/AquascapeImage'
import {AuthModule} from '../Auth/index'

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
    imports: [
        AuthModule,
        UserModule,
        FilterModule,
        LightModule,
        PlantModule,
        HardscapeModule,
        LivestockModule,
        SubstrateModule,
        AdditiveModule,
        FilterModule,
        LikeModule,
        AquascapeImageModule,
    ],
})
