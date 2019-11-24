import {GraphQLModule} from '@graphql-modules/core'

import {composeContext, attachCurrentUserId, attachSession} from 'graphql/context'
import {AquascapeModule} from 'graphql/modules/Aquascape'
import {FollowModule} from 'graphql/modules/Follow'
import {UserModule} from 'graphql/modules/User'
import {AuthModule} from 'graphql/modules/Auth'
import {LightModule} from 'graphql/modules/Light'
import {CommentModule} from 'graphql/modules/Comment'
import {LikeModule} from 'graphql/modules/Like'
import {PlantModule} from 'graphql/modules/Plant'
import {VisitorModule} from 'graphql/modules/Visitor'
import {HardscapeModule} from 'graphql/modules/Hardscape'
import {LivestockModule} from 'graphql/modules/Livestock'
import {SubstrateModule} from 'graphql/modules/Substrate'
import {AdditiveModule} from 'graphql/modules/Additive'

// @ts-ignore
export const AppModule = new GraphQLModule({
    imports: [
        UserModule,
        AuthModule,
        FollowModule,
        AquascapeModule,
        LightModule,
        CommentModule,
        LikeModule,
        PlantModule,
        HardscapeModule,
        VisitorModule,
        LivestockModule,
        SubstrateModule,
        AdditiveModule,
    ],
    context: composeContext([attachCurrentUserId, attachSession]),
})
