import {ModuleContext} from '@graphql-modules/core'

import {tokens} from 'di/tokens'

import {AuthenticationContext} from 'graphql/context'
import {VisitorProviderInterface} from 'graphql/modules/Visitor/VisitorProvider'

export const resolvers = {
    Mutation: {
        async visitAquascape(root, args: {aquascapeId: number}, context: ModuleContext & AuthenticationContext) {
            const provider: VisitorProviderInterface = context.injector.get(tokens.VISITOR_PROVIDER)
            return await provider.visitAquascape(args.aquascapeId, context.currentUserId)
        }
    }
}

export const resolversComposition = {}