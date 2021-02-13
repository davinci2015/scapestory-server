import {UserInputError} from 'apollo-server'

import {HardscapeProviderInterface, HardscapeProvider} from './HardscapeProvider'
import {Hardscape} from 'db/models'

export const resolvers = {
    Query: {
        async hardscape(root, args, context) {
            const provider: HardscapeProviderInterface = context.injector.get(HardscapeProvider)
            return await provider.getHardscape()
        },
    },
    Mutation: {
        async addHardscape(root, args, context) {
            let hardscape: Hardscape | null = null
            const provider: HardscapeProviderInterface = context.injector.get(HardscapeProvider)

            if (args.hardscapeId) {
                hardscape = await provider.findHardscapeById(args.hardscapeId)
            } else if (args.name) {
                hardscape = await provider.addHardscape(args.name)
            }

            if (!hardscape) {
                throw new UserInputError(
                    'You need to provide a hardscape ID or a hardscape name that will be created'
                )
            }

            await provider.addHardscapeForAquascape(hardscape.id, args.aquascapeId)

            return hardscape
        },
        async removeHardscape(root, args, context) {
            const provider: HardscapeProviderInterface = context.injector.get(HardscapeProvider)
            const hardscape = await provider.findHardscapeById(args.hardscapeId)

            if (!hardscape) {
                throw new UserInputError('Hardscape not found')
            }

            await provider.removeHardscapeForAquascape(hardscape.id, args.aquascapeId)

            if (!hardscape.predefined) {
                await provider.removeHardscape(hardscape.id)
            }

            return hardscape
        },
    },
}
