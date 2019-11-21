import {Injectable} from '@graphql-modules/di'
import {UserInputError} from 'apollo-server'
import * as Bluebird from 'bluebird'
import * as DataLoader from 'dataloader'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Like} from 'db/models/Like'

export enum LikeEntityType {
    AQUASCAPE = 'AQUASCAPE',
    IMAGE = 'IMAGE',
    COMMENT = 'COMMENT',
}

export interface LikeRepositoryInterface extends BaseRepositoryInterface<Like> {
    like(
        entity: LikeEntityType,
        entityId: number,
        userId: number
    ): Bluebird<Like>
    dislike(
        entity: LikeEntityType,
        entityId: number,
        userId: number
    ): Bluebird<Like>
    countLikes(entity: LikeEntityType, entityId: number): Promise<number>
    isLikedBy(
        userId: number,
        entity: LikeEntityType,
        entityId: number
    ): Promise<boolean>
}

const entityToFieldMapper = {
    [LikeEntityType.AQUASCAPE]: 'aquascapeId',
    [LikeEntityType.IMAGE]: 'aquascapeImageId',
    [LikeEntityType.COMMENT]: 'commentId',
}

@Injectable()
export class LikeRepository extends BaseRepository<Like> {
    aquascapeLikesLoader: DataLoader<number, number>

    constructor() {
        super(Like)
        this.aquascapeLikesLoader = new DataLoader(
            this.batchCountAquascapeLikes
        )
    }

    async like(entity: LikeEntityType, entityId: number, userId: number) {
        const field = entityToFieldMapper[entity]
        const like = await this.findOne({where: {userId, [field]: entityId}})

        if (like) {
            return Promise.resolve(like)
        }

        return this.create({userId, [field]: entityId})
    }

    async dislike(entity: LikeEntityType, entityId: number, userId: number) {
        const field = entityToFieldMapper[entity]
        const like = await this.findOne({where: {userId, [field]: entityId}})

        if (!like) {
            throw new UserInputError('Like not found')
        }

        await this.destroy({where: {userId, [field]: entityId}})

        return like
    }

    async isLikedBy(userId: number, entity: LikeEntityType, entityId: number) {
        const field = entityToFieldMapper[entity]
        const like = await this.findOne({
            where: {
                [field]: entityId,
                userId,
            },
        })

        return Boolean(like)
    }

    countLikes(entity: LikeEntityType, entityId: number) {
        const field = entityToFieldMapper[entity]

        switch (field) {
            case entityToFieldMapper[LikeEntityType.AQUASCAPE]:
                return this.aquascapeLikesLoader.load(entityId)
            default:
                return 0
        }
    }

    private batchCountAquascapeLikes = async (ids: number[]) => {
        const likes = await this.findAll({
            where: {[entityToFieldMapper[LikeEntityType.AQUASCAPE]]: ids},
        })

        return ids.map(id =>
            likes.reduce(
                (acc, currentLike) =>
                    currentLike.aquascapeId === id ? acc + 1 : acc,
                0
            )
        )
    }
}
