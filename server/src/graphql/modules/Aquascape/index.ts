import {GraphQLModule} from '@graphql-modules/core'

import {AquascapeRepository} from 'db/repositories/Aquascape'
import {composeContext, attachCurrentUserId} from 'graphql/context'
import {VisitorRepository} from 'db/repositories/Visitor'
import {tokens} from 'di/tokens'

import {AquascapeProvider} from './AquascapeProvider'
import {resolvers, resolversComposition} from './resolvers'
import * as typeDefs from './schema.graphql'

// @ts-ignore
export const AquascapeModule = new GraphQLModule({
    providers: [
        {provide: tokens.AQUASCAPE_PROVIDER, useClass: AquascapeProvider},
        {provide: tokens.AQUASCAPE_REPOSITORY, useClass: AquascapeRepository},
        {provide: tokens.VISITOR_REPOSITORY, useClass: VisitorRepository}
    ],
    typeDefs,
    resolvers,
    resolversComposition,
    context: composeContext([
        attachCurrentUserId
    ])
})