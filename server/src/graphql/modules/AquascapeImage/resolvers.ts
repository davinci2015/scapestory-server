import {authenticate, authorizeAquascapeUpdate} from 'graphql/guards'
import {tokens} from 'di/tokens'

import {AquascapeImageProviderInterface} from './AquascapeImageProvider'
import {FileUpload} from 'graphql-upload'

export const resolvers = {
    Mutation: {
        async addAquascapeImage(root, args: { aquascapeId: number, file: Promise<FileUpload>}, context) {
            const provider: AquascapeImageProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)
            return await provider.addAquascapeImage(args.aquascapeId, args.file)
        },

        async deleteAquascapeImage(root, args: {aquascapeId: number, imageId: number}, context) {
            const provider: AquascapeImageProviderInterface = context.injector.get(tokens.AQUASCAPE_PROVIDER)
            return await provider.deleteAquascapeImage(args.aquascapeId, args.imageId)
        }
    },
}

export const resolversComposition = {
    'Mutation.addAquascapeImage': [authenticate, authorizeAquascapeUpdate],
    'Mutation.deleteAquascapeImage': [authenticate, authorizeAquascapeUpdate],
}
