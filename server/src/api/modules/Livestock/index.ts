import {GraphQLModule} from '@graphql-modules/core'

import {tokens} from 'di/tokens'

import * as typeDefs from './schema.graphql'
import {resolvers} from './resolvers'
import {LivestockProvider} from 'api/modules/Livestock/LivestockProvider'
import {LivestockRepository} from 'db/repositories/Livestock'
import {AquascapeLivestockRepository} from 'db/repositories/AquascapeLivestock'

export const LivestockModule = new GraphQLModule({
    providers: [
        {provide: tokens.LIVESTOCK_PROVIDER, useClass: LivestockProvider},
        {provide: tokens.LIVESTOCK_REPOSITORY, useClass: LivestockRepository},
        {provide: tokens.AQUASCAPE_LIVESTOCK_REPOSITORY, useClass: AquascapeLivestockRepository},
    ],
    typeDefs,
    resolvers
})
