import {GraphQLModule} from '@graphql-modules/core'

import {AquascapeModule} from 'api/modules/Aquascape'
import {FollowModule} from 'api/modules/Follow'
import {UserModule} from 'api/modules/User'
import {AuthModule} from 'api/modules/Auth'
import {LightModule} from 'api/modules/Light'
import {CommentModule} from 'api/modules/Comment'
import {LikeModule} from 'api/modules/Like'
import {PlantModule} from 'api/modules/Plant'
import {VisitorModule} from 'api/modules/Visitor'
import {HardscapeModule} from 'api/modules/Hardscape'
import {LivestockModule} from 'api/modules/Livestock'
import {SubstrateModule} from 'api/modules/Substrate'
import {AdditiveModule} from 'api/modules/Additive'
import {FilterModule} from 'api/modules/Filter'
import {AquascapeImageModule} from 'api/modules/AquascapeImage'

export const AppModule = new GraphQLModule({
    imports: [
        AuthModule,
        CommentModule,
        FollowModule,
        LightModule,
        AquascapeModule,
        LikeModule,
        PlantModule,
        HardscapeModule,
        UserModule,
        VisitorModule,
        LivestockModule,
        SubstrateModule,
        AdditiveModule,
        FilterModule,
        AquascapeImageModule,
    ]
})
