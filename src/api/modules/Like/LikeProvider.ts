import {Injectable, Inject, ProviderScope} from '@graphql-modules/di'
import Bluebird from 'bluebird'

import {tokens} from 'di/tokens'
import {LikeRepositoryInterface} from 'db/repositories/Like'
import {Like} from 'db/models/Like'
import {LikeEntityType} from 'interfaces/graphql/types'

export interface LikeProviderInterface {
    like(entity: LikeEntityType, entityId: number, userId: number): Bluebird<Like>
    dislike(entity: LikeEntityType, entityId: number, userId: number): Bluebird<Like>
    countLikes(entity: LikeEntityType, entityId: number): Promise<number>
    isLikedBy(userId: number, entity: LikeEntityType, entityId: number): Promise<boolean>
}

@Injectable({scope: ProviderScope.Session})
export class LikeProvider implements LikeProviderInterface {
    constructor(
        @Inject(tokens.LIKE_REPOSITORY)
        private likeRepository: LikeRepositoryInterface
    ) {}

    like(entity: LikeEntityType, entityId: number, userId: number) {
        return this.likeRepository.like(entity, entityId, userId)
    }

    dislike(entity: LikeEntityType, entityId: number, userId: number) {
        return this.likeRepository.dislike(entity, entityId, userId)
    }

    countLikes(entity: LikeEntityType, entityId) {
        return this.likeRepository.countLikes(entity, entityId)
    }

    isLikedBy(userId: number, entity: LikeEntityType, entityId: number) {
        return this.likeRepository.isLikedBy(userId, entity, entityId)
    }
}
