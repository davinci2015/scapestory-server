import {Injectable} from 'graphql-modules'
import {UserInputError} from 'apollo-server'
import Bluebird from 'bluebird'
import * as DataLoader from 'dataloader'

import {BaseRepository, BaseRepositoryInterface} from 'db/repositories/Base'
import {Like} from 'db/models/Like'
import {LikeEntityType} from 'interfaces/graphql/types'

export interface LikeRepositoryInterface extends BaseRepositoryInterface<Like> {
    like(entity: LikeEntityType, entityId: number, userId: number): Bluebird<Like>
    removeLikes(data: {entity: LikeEntityType; entityId: number}[]): Promise<number>
    dislike(entity: LikeEntityType, entityId: number, userId: number): Bluebird<Like>
    countLikes(entity: LikeEntityType, entityId: number): Promise<number>
    isLikedBy(userId: number, entity: LikeEntityType, entityId: number): Promise<boolean>
    getLikes(
        entity: LikeEntityType,
        entityId: number,
        limit?: number
    ): Promise<{rows: Like[]; count: number}>
}

const entityToFieldMapper = {
    [LikeEntityType.Aquascape]: 'aquascapeId',
    [LikeEntityType.Image]: 'aquascapeImageId',
    [LikeEntityType.Comment]: 'commentId',
}

@Injectable()
export class LikeRepository extends BaseRepository<Like> {
    aquascapeLikesLoader: DataLoader<number, number>

    constructor() {
        super(Like)
        this.aquascapeLikesLoader = new DataLoader(this.batchCountAquascapeLikes)
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
            case entityToFieldMapper[LikeEntityType.Aquascape]:
                return this.aquascapeLikesLoader.load(entityId)
            default:
                return 0
        }
    }

    removeLikes(data: {entity: LikeEntityType; entityId: number}[]) {
        let field
        return this.destroy({
            where: data.reduce((acc, elem) => {
                field = entityToFieldMapper[elem.entity]
                acc[field] = acc[field] || []
                acc[field].push(elem.entityId)
                return acc
            }, {}),
        })
    }

    getLikes(entity: LikeEntityType, entityId: number, limit?: number) {
        const field = entityToFieldMapper[entity]
        return this.findAndCountAll({where: {[field]: entityId}, limit})
    }

    private batchCountAquascapeLikes = async (ids: number[]) => {
        const likes = await this.findAll({
            where: {[entityToFieldMapper[LikeEntityType.Aquascape]]: ids},
        })

        return ids.map(id => likes.filter(like => like.aquascapeId === id).length)
    }
}
