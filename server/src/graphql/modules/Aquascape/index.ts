import {GraphQLModule} from '@graphql-modules/core'
import {AquascapeRepository} from 'db/repositories/AquascapeRepository'
import {composeContext, context} from 'graphql/context'
import {AquascapeProvider} from 'graphql/modules/Aquascape/providers/AquascapeProvider'
import {resolvers, resolversComposition} from 'graphql/modules/Aquascape/resolvers'
import {tokens} from 'di/tokens'
import * as typeDefs from 'graphql/modules/Aquascape/schema.graphql'

export const AquascapeModule = new GraphQLModule({
    providers: [
        {provide: tokens.AQUASCAPE_PROVIDER, useClass: AquascapeProvider},
        {provide: tokens.AQUASCAPE_REPOSITORY, useClass: AquascapeRepository}
    ],
    typeDefs,
    resolvers,
    resolversComposition,
    // @ts-ignore
    context: composeContext([
        context.attachCurrentUser
    ])
})