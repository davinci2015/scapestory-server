import {Injectable, Inject} from '@graphql-modules/di'
import {Includeable} from 'sequelize/types'
import Bluebird from 'bluebird'
import {FileUpload} from 'graphql-upload'

import {AquascapeRepositoryInterface} from 'db/repositories/Aquascape'
import {Aquascape} from 'db/models/Aquascape'
import {AquascapeImage} from 'db/models/AquascapeImage'
import {tokens} from 'di/tokens'

import {
    uploadStreamFile,
    CloudinaryUploadResult,
    deleteFile,
    imageUploadOptions,
} from 'services/cloudinary'
import logger from 'logger'
import {Pagination} from 'interfaces/graphql/types'

export interface AquascapeProviderInterface {
    getAquascapes: (
        pagination: Pagination,
        userId?: number | null,
        random?: boolean | null,
        include?: Includeable[]
    ) => Promise<{rows: Aquascape[]; count: number}>

    getFeaturedAquascape: (include?: Includeable[]) => Bluebird<Aquascape | null>

    getTrendingAquascapes: (
        pagination: Pagination,
        include?: Includeable[]
    ) => Bluebird<Aquascape[]>

    getAquascapeById: (id: number, include?: Includeable[]) => Bluebird<Aquascape | null>

    createAquascape: (userId: number) => Promise<Aquascape>

    getAquascapeImages: (aquascapeId: number) => Bluebird<AquascapeImage[]>

    updateAquascapeTitle: (aquascapeId: number, title: string) => Bluebird<[number, Aquascape[]]>

    removeAquascape: (aquascapeId: number) => Promise<number>

    updateAquascapeMainImage: (
        aquascapeId: number,
        file: Promise<FileUpload>
    ) => Promise<CloudinaryUploadResult>
}

@Injectable()
export class AquascapeProvider implements AquascapeProviderInterface {
    constructor(
        @Inject(tokens.AQUASCAPE_REPOSITORY)
        private aquascapeRepository: AquascapeRepositoryInterface
    ) {}

    getAquascapes(
        pagination: Pagination,
        userId?: number,
        random?: boolean,
        include?: Includeable[]
    ) {
        return this.aquascapeRepository.getAquascapes(pagination, userId, random, include)
    }

    getFeaturedAquascape(include?: Includeable[]) {
        return this.aquascapeRepository.getFeaturedAquascape(include)
    }

    getTrendingAquascapes(pagination: Pagination, include?: Includeable[]) {
        return this.aquascapeRepository.getTrendingAquascapes(pagination, include)
    }

    getAquascapeById(id: number, include?: Includeable[]) {
        return this.aquascapeRepository.getAquascapeById(id, include)
    }

    createAquascape(userId: number) {
        return this.aquascapeRepository.create({userId})
    }

    getAquascapeImages(aquascapeId: number) {
        return this.aquascapeRepository.getAquascapeImages(aquascapeId)
    }

    updateAquascapeTitle(aquascapeId: number, title: string) {
        return this.aquascapeRepository.updateAquascapeTitle(aquascapeId, title)
    }

    removeAquascape(aquascapeId: number) {
        return this.aquascapeRepository.destroy({
            where: {id: aquascapeId},
        })
    }

    async updateAquascapeMainImage(aquascapeId: number, file: Promise<FileUpload>) {
        const aquascape = await this.aquascapeRepository.getAquascapeById(aquascapeId)
        const {createReadStream} = await file

        // Upload new image
        const result = await uploadStreamFile(
            createReadStream,
            imageUploadOptions.aquascapeMainImage
        )

        // Remove old image
        if (aquascape?.mainImagePublicId) {
            deleteFile(aquascape.mainImagePublicId).catch(error => logger.error(error))
        }

        // Update main image in db
        await this.aquascapeRepository.updateAquascapeMainImage(
            aquascapeId,
            result.public_id,
            result.secure_url
        )

        return result
    }
}
