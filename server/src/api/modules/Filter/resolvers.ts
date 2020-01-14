import {ModuleContext} from '@graphql-modules/core'

import {tokens} from 'di/tokens'
import {FilterProviderInterface} from './FilterProvider'
import {UserInputError} from 'apollo-server'
import {Filter} from 'db/models'
import {authenticate, authorizeAquascapeUpdate} from 'api/guards'

export const resolvers = {
    Query: {
        async filters(root, args, context: ModuleContext) {
            const provider: FilterProviderInterface = context.injector.get(tokens.FILTER_PROVIDER)
            return await provider.getFilters()
        },
    },
    Mutation: {
        async addFilter(root, args, context) {
            let filter: Filter | null = null
            const provider: FilterProviderInterface = context.injector.get(tokens.FILTER_PROVIDER)

            if (args.filter.filterId) {
                filter = await provider.findFilterById(args.filterId)
            } else if (args.filter.name) {
                filter = await provider.addFilter(args.name)
            }

            if (!filter) {
                throw new UserInputError(
                    'You need to provide a filter ID or a filter name that will be created'
                )
            }

            await provider.addFilterForAquascape(filter.id, args.aquascapeId)

            return filter
        },
        async removeFilter(root, args, context) {
            const provider: FilterProviderInterface = context.injector.get(tokens.FILTER_PROVIDER)
            const filter = await provider.findFilterById(args.filterId)

            if (!filter) {
                throw new UserInputError('Filter not found')
            }

            await provider.removeFilterForAquascape(filter.id, args.aquascapeId)

            if (!filter.predefined) {
                await provider.removeFilter(filter.id)
            }

            return filter
        },
    },
}

export const resolversComposition = {
    'Mutation.addFilter': [authenticate, authorizeAquascapeUpdate],
    'Mutation.removeFilter': [authenticate, authorizeAquascapeUpdate],
}
