import {Injectable, Inject} from '@graphql-modules/di'
import {AquascapeImage} from 'db/models/AquascapeImage'
import {tokens} from 'di/tokens'

import {FileUpload} from 'graphql-upload'
import {uploadStreamFile, deleteFile} from 'services/cloudinary'
import {AquascapeImageRepository} from 'db/repositories/AquascapeImage'

export interface AquascapeImageProviderInterface {
    addAquascapeImage: (aquascapeId: number, file: Promise<FileUpload>) => Promise<AquascapeImage>
    deleteAquascapeImage: (aquascapeId: number, imageId: number) => Promise<number>
}

@Injectable()
export class AquascapeImageProvider implements AquascapeImageProviderInterface {
    constructor(
        @Inject(tokens.AQUASCAPE_IMAGE_REPOSITORY)
        private aquascapeImageRepository: AquascapeImageRepository
    ) {}

    async addAquascapeImage(aquascapeId: number, file: Promise<FileUpload>) {
        const {createReadStream, filename} = await file
        const result = await uploadStreamFile(createReadStream, filename)

        return await this.aquascapeImageRepository.addImage(
            aquascapeId,
            result.public_id,
            result.secure_url
        )
    }

    async deleteAquascapeImage(aquascapeId: number, imageId: number) {
        const image = await this.aquascapeImageRepository.findOne({
            where: {aquascapeId, id: imageId},
        })

        // Image not found
        if (!image) {
            return 0
        }

        // Remove image from cloudinary
        deleteFile(image.publicId)

        // Remove image from db
        return this.aquascapeImageRepository.removeImage(aquascapeId, imageId)
    }
}
