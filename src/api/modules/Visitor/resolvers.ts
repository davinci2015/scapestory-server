import {VisitorProviderInterface} from 'api/modules/Visitor/VisitorProvider'
import headers from 'constants/headers'
import {Aquascape} from 'db/models/Aquascape'
import {VisitorProvider} from './VisitorProvider'

export const resolvers = {
    Aquascape: {
        async viewsCount(aquascape: Aquascape, args, context) {
            const provider: VisitorProviderInterface = context.injector.get(VisitorProvider)
            return await provider.countViews(aquascape.id)
        },
    },
    Mutation: {
        async visitAquascape(root, args: {aquascapeId: number}, context) {
            const provider: VisitorProviderInterface = context.injector.get(VisitorProvider)
            let visitorId = context.req.headers[headers.VISITOR_TOKEN]

            // Cookie can be string 'undefined' or an array
            if (visitorId === 'undefined' || Array.isArray(visitorId)) {
                visitorId = undefined
            }

            const [visitor, created] = await provider.visitAquascape(args.aquascapeId, visitorId)

            return {visitor, created}
        },
    },
}
