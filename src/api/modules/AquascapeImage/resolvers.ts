import {AquascapeImageProviderInterface, AquascapeImageProvider} from './AquascapeImageProvider'
import {FileUpload} from 'graphql-upload'

export const resolvers = {
    Mutation: {
        async addAquascapeImage(
            root,
            args: {aquascapeId: number; file: Promise<FileUpload>},
            context
        ) {
            const provider: AquascapeImageProviderInterface = context.injector.get(
                AquascapeImageProvider
            )
            return await provider.addAquascapeImage(args.aquascapeId, args.file)
        },

        async deleteAquascapeImage(root, args: {aquascapeId: number; imageId: number}, context) {
            const provider: AquascapeImageProviderInterface = context.injector.get(
                AquascapeImageProvider
            )
            return await provider.deleteAquascapeImage(args.aquascapeId, args.imageId)
        },
    },
}
