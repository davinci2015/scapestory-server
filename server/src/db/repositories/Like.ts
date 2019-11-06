import {Injectable} from '@graphql-modules/di'
import * as Bluebird from 'bluebird'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Like} from 'db/models/Like'

export enum LikeEntityType {
    AQUASCAPE = 'AQUASCAPE',
    IMAGE = 'IMAGE',
    COMMENT = 'COMMENT'
}

export interface LikeRepositoryInterface extends BaseRepositoryInterface<Like> {
    like(entity: LikeEntityType, entityId: number, userId: number): Bluebird<Like>
    dislike(entity: LikeEntityType, entityId: number, userId: number): Bluebird<Like>
}

const entityToFieldMapper = {
    [LikeEntityType.AQUASCAPE]: 'aquascapeId',
    [LikeEntityType.IMAGE]: 'aquascapeImageId',
    [LikeEntityType.COMMENT]: 'commentId'
}

@Injectable()
export class LikeRepository extends BaseRepository<Like> {
    constructor() {
        super(Like)
    }

    async like(entity: LikeEntityType, entityId: number, userId: number) {
        const field = entityToFieldMapper[entity]
        const like = await this.findOne({where: {userId, [field]: entityId}})

        if (like) {
            return Promise.resolve(like)
        }

        return this.create({
            userId,
            [field]: entityId
        })
    }

    dislike(entity: LikeEntityType, entityId: number, userId: number) {
        const field = entityToFieldMapper[entity]
        return this.destroy({where: {userId, [field]: entityId}})
    }
}