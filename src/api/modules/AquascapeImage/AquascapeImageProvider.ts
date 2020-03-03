import {Injectable, Inject} from '@graphql-modules/di'
import {FileUpload} from 'graphql-upload'
import Bluebird from 'bluebird'

import {AquascapeImage} from 'db/models/AquascapeImage'
import {tokens} from 'di/tokens'
import {uploadStreamFile, deleteFile, imageUploadOptions} from 'services/cloudinary'
import {AquascapeImageRepository} from 'db/repositories/AquascapeImage'
import logger from 'logger'

export interface AquascapeImageProviderInterface {
    getImageById: (id: number) => Bluebird<AquascapeImage | null>
    addAquascapeImage: (aquascapeId: number, file: Promise<FileUpload>) => Promise<AquascapeImage>
    deleteAquascapeImage: (aquascapeId: number, imageId: number) => Promise<number>
}

@Injectable()
export class AquascapeImageProvider implements AquascapeImageProviderInterface {
    constructor(
        @Inject(tokens.AQUASCAPE_IMAGE_REPOSITORY)
        private aquascapeImageRepository: AquascapeImageRepository
    ) {}

    getImageById(id: number) {
        return this.aquascapeImageRepository.findOne({where: {id}})
    }

    async addAquascapeImage(aquascapeId: number, file: Promise<FileUpload>) {
        const {createReadStream} = await file
        const result = await uploadStreamFile(createReadStream, imageUploadOptions.aquascapeImage)

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
        deleteFile(image.publicId).catch(error => logger.error(error))

        // Remove image from db
        return this.aquascapeImageRepository.removeImage(aquascapeId, imageId)
    }
}
