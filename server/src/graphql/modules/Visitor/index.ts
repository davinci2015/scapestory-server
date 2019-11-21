import {GraphQLModule} from '@graphql-modules/core'

import {VisitorRepository} from 'db/repositories/Visitor'

import {composeContext, attachSession} from 'graphql/context'
import {tokens} from 'di/tokens'

import {resolvers, resolversComposition} from './resolvers'
import {VisitorProvider} from './VisitorProvider'
import * as typeDefs from './schema.graphql'

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
        attachSession
    ])
})