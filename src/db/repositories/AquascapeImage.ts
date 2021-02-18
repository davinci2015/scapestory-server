import {Injectable} from 'graphql-modules'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {AquascapeImage} from 'db/models/AquascapeImage'

export interface AquascapeImageRepositoryInterface extends BaseRepositoryInterface<AquascapeImage> {
    addImage(aquascapeId: number, publicId: string, url: string): Promise<AquascapeImage>

    removeImage(aquascapeId: number, imageId: number): Promise<number>
}

@Injectable()
export class AquascapeImageRepository
    extends BaseRepository<AquascapeImage>
    implements AquascapeImageRepositoryInterface {
    constructor() {
        super(AquascapeImage)
    }

    addImage(aquascapeId: number, publicId: string, url: string) {
        return this.create({aquascapeId, publicId, url})
    }

    removeImage(aquascapeId: number, imageId: number) {
        return this.destroy({where: {aquascapeId, id: imageId}})
    }
}
