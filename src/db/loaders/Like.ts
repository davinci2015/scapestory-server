import {Inject, Injectable, Scope} from 'graphql-modules'
import * as DataLoader from 'dataloader'

import {LikeEntityType} from 'interfaces/graphql/types'
import {LikeRepository, LikeRepositoryInterface} from 'db/repositories/Like'

export interface LikeDataLoaderInterface {
    countLikes(entity: LikeEntityType, entityId: number): Promise<number>
}

const entityToFieldMapper = {
    [LikeEntityType.Aquascape]: 'aquascapeId',
    [LikeEntityType.Image]: 'aquascapeImageId',
    [LikeEntityType.Comment]: 'commentId',
}

@Injectable({scope: Scope.Operation})
export class LikeDataLoader {
    aquascapeLikesLoader: DataLoader<number, number>

    constructor(@Inject(LikeRepository) private likeRepository: LikeRepositoryInterface) {
        this.aquascapeLikesLoader = new DataLoader(this.batchCountAquascapeLikes)
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

    private batchCountAquascapeLikes = async (ids: number[]) => {
        const likes = await this.likeRepository.findAll({
            where: {[entityToFieldMapper[LikeEntityType.Aquascape]]: ids},
        })

        return ids.map(id => likes.filter(like => like.aquascapeId === id).length)
    }
}
