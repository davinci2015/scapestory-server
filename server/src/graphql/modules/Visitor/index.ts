import {GraphQLModule} from '@graphql-modules/core'

import {resolvers, resolversComposition} from 'graphql/modules/User/resolvers'
import {VisitorProvider} from 'graphql/modules/Visitor/VisitorProvider'
import {VisitorRepository} from 'db/repositories/Visitor'

import {composeContext, attachCurrentUserId} from 'graphql/context'
import * as typeDefs from 'graphql/modules/User/schema.graphql'
import {tokens} from 'di/tokens'

// @ts-ignore
export const VisitorModule = new GraphQLModule({
    providers: [
        {provide: tokens.VISITOR_PROVIDER, useClass: VisitorProvider},
        {provide: tokens.VISITOR_REPOSITORY, useClass: VisitorRepository}
    ],
    typeDefs,
    resolvers,
    resolversComposition,
    context: composeContext([
        attachCurrentUserId
    ])
})