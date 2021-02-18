import {AuthenticationError, UserInputError} from 'apollo-server'

import {AquascapeRepositoryInterface, AquascapeRepository} from 'db/repositories/Aquascape'

// Args.aquascapeId should be available
export const authorizeAquascapeUpdate = async ({root, args, context, info}, next) => {
    if (!args.aquascapeId) {
        throw new UserInputError('No aquascape id specified')
    }

    const aquascapeRepository: AquascapeRepositoryInterface = context.injector.get(
        AquascapeRepository
    )
    const aquascape = await aquascapeRepository.getAquascapeById(args.aquascapeId)

    if (aquascape && aquascape.userId === context.currentUserId) {
        return next(root, args, context, info)
    } else {
        throw new AuthenticationError('Unauthorized to update the aquascape')
    }
}
