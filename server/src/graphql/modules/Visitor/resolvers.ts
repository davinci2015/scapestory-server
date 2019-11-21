import {ModuleContext} from '@graphql-modules/core'

import {tokens} from 'di/tokens'
import {VisitorProviderInterface} from 'graphql/modules/Visitor/VisitorProvider'
import {SessionContext} from 'graphql/context'
import headers from 'constants/headers'

export const resolvers = {
    Mutation: {
        async visitAquascape(root, args: {aquascapeId: number}, context: ModuleContext & SessionContext) {
            const provider: VisitorProviderInterface = context.injector.get(tokens.VISITOR_PROVIDER)
            let visitorId = context.req.headers[headers.VISITOR_TOKEN]

            // Cookie can be string 'undefined' or an array
            if (visitorId === 'undefined' || Array.isArray(visitorId)) {
                visitorId = undefined
            }

            const [visitor, created] = await provider.visitAquascape(args.aquascapeId, visitorId)
            return {visitor, created}
        }
    }
}

export const resolversComposition = {}