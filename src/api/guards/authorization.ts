import {ModuleContext} from '@graphql-modules/core'
import {AuthenticationError, UserInputError} from 'apollo-server'

import {AquascapeRepositoryInterface} from 'db/repositories/Aquascape'
import {tokens} from 'di/tokens'

// Args.aquascapeId should be available
export const authorizeAquascapeUpdate = (next: (root, args, context, info) => void) =>
    async (root, args, context: ModuleContext, info) => {
        if (!args.aquascapeId) {
            throw new UserInputError('No aquascape id specified')
        }

        const aquascapeRepository: AquascapeRepositoryInterface = context.injector.get(tokens.AQUASCAPE_REPOSITORY)
        const aquascape = await aquascapeRepository.getAquascapeById(args.aquascapeId)

        if (aquascape && aquascape.userId === context.currentUserId) {
            return next(root, args, context, info)
        } else {
            throw new AuthenticationError('Unauthorized to update the aquascape')
        }
    }

